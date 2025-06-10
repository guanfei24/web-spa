import pool from '@/lib/db'; // 请确保路径和文件名正确

// 构建菜单树
const buildMenuTree = (flatMenuList) => {
    const menuMap = {};
    const tree = [];

    flatMenuList.forEach((menu) => {
        menu.children = [];
        menuMap[menu.id] = menu;
    });

    flatMenuList.forEach((menu) => {
        if (menu.parent_id && menu.parent_id !== 0) {
            if (menuMap[menu.parent_id]) {
                menuMap[menu.parent_id].children.push(menu);
            }
        } else {
            tree.push(menu);
        }
    });

    return tree;
};

export const resolvers = {
    Query: {
        // 用户
        users: async () => {
            try {
                const [rows] = await pool.query('SELECT * FROM users');
                console.log('[users] rows:', rows);
                return rows;
            } catch (error) {
                console.error('[users] error:', error);
                return null;
            }
        },

        // 前台菜单
        frontendMenus: async () => {
            try {
                const [rows] = await pool.query('SELECT * FROM menus WHERE type = 1 and is_active = true');
                console.log('[frontendMenus] rows:', rows);
                return buildMenuTree(rows);
            } catch (error) {
                console.error('[frontendMenus] error:', error);
                return null;
            }
        },

        // 后台菜单
        adminMenus: async () => {
            try {
                const [rows] = await pool.query('SELECT * FROM menus WHERE type = 2');
                console.log('[adminMenus] rows:', rows);
                return buildMenuTree(rows);
            } catch (error) {
                console.error('[adminMenus] error:', error);
                return null;
            }
        },

        // 所有服务
        services: async () => {
            try {
                const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order ASC');
                console.log('[services] rows:', rows);
                return rows;
            } catch (error) {
                console.error('[services] error:', error);
                return null;
            }
        },

        // 分类 + 服务树
        serviceCategories: async () => {
            try {
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

                console.log('[serviceCategories] raw rows:', rows);

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
            } catch (error) {
                console.error('[serviceCategories] error:', error);
                return null;
            }
        },

        // 所有可见评论
        reviews: async () => {
            try {
                const [rows] = await pool.query(`
          SELECT r.*, u.name AS employee_name
          FROM reviews r
          LEFT JOIN users u ON r.employee_id = u.id
          WHERE r.is_visible = TRUE
          ORDER BY r.created_at DESC
        `);
                console.log('[reviews] rows:', rows);
                return rows;
            } catch (error) {
                console.error('[reviews] error:', error);
                return null;
            }
        },
    },
};