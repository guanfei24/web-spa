import pool from '@/lib/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { buildMenuTree } from '@/utils/helpers';


export const resolvers = {
    Query: {
        users: async () => {
            const [rows] = await pool.query('SELECT id, name, email FROM users');
            return rows;
        },

        frontendMenus: async () => {
            const [rows] = await pool.query('SELECT * FROM menus WHERE type = 1 AND is_active = true');
            return buildMenuTree(rows);
        },

        adminMenus: async () => {
            const [rows] = await pool.query('SELECT * FROM menus WHERE type = 2');
            return buildMenuTree(rows);
        },

        services: async () => {
            const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order ASC');
            return rows;
        },

        serviceCategories: async () => {
            const [rows] = await pool.query(`
        SELECT 
          sc.id AS category_id,
          sc.name AS category_name,
          sc.sort_order AS category_sort_order,
          s.id AS service_id,
          s.title AS service_title,
          s.duration,
          s.price,
          s.slug,
          s.image_url,
          s.sort_order AS service_sort_order,
          s.is_active,
          s.description
        FROM service_categories sc
        LEFT JOIN services s 
          ON sc.id = s.category_id AND s.is_active = true
        ORDER BY sc.sort_order, s.sort_order;
      `);

            const map = new Map();
            for (const row of rows) {
                if (!map.has(row.category_id)) {
                    map.set(row.category_id, {
                        id: row.category_id,
                        name: row.category_name,
                        sort_order: row.category_sort_order,
                        services: [],
                    });
                }
                if (row.service_id) {
                    map.get(row.category_id).services.push({
                        id: row.service_id,
                        category_id: row.category_id,
                        title: row.service_title,
                        duration: row.duration,
                        price: row.price,
                        slug: row.slug,
                        image_url: row.image_url,
                        sort_order: row.service_sort_order,
                        is_active: !!row.is_active,
                        description: row.description,
                    });
                }
            }
            return [...map.values()];
        },

        reviews: async () => {
            const [rows] = await pool.query(`
        SELECT r.*, u.name AS employee_name
        FROM reviews r
        LEFT JOIN users u ON r.employee_id = u.id
        WHERE r.is_visible = TRUE
        ORDER BY r.created_at DESC
      `);
            return rows;
        },

        currentUser: async (_parent, _args, context) => {
            if (!context.user) return null;
            const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [context.user.id]);
            return rows[0] || null;
        },

        roles: async () => {
            const [rows] = await pool.query("SELECT id, name, description FROM roles");
            return rows;
        },
    },

    Mutation: {
        login: async (_parent, { email, password }, context) => {
            const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            const user = users[0];
            if (!user) throw new Error('User not found');

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Invalid password');

            const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET || 'defaultsecret', {
                expiresIn: '7d',
            });

            // Set HttpOnly cookie
            context.res.setHeader('Set-Cookie', serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            }));

            return {
                id: user.id,
                name: user.name,
                email: user.email,
            };
        },

        register: async (_parent, { input }) => {
            const { name, email, password, roleId } = input;

            const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
            if (existing.length > 0) throw new Error("Email already registered");

            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await pool.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [name, email, hashedPassword]
            );
            const userId = result.insertId;

            await pool.query(
                "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
                [userId, roleId]
            );

            return {
                id: userId, name, email,
            };
        },
    },
};