import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/schema/typeDefs";
import { resolvers } from "@/schema/resolvers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
    context: async (req, res) => {
        // 设置 CORS 头（如需）
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        // 解析 Authorization
        const authHeader = req.headers.authorization || "";
        const token = authHeader.replace("Bearer ", "");
        let user = null;

        if (token) {
            try {
                user = jwt.verify(token, JWT_SECRET);
            } catch (err) {
                console.warn("❌ 无效 JWT:", err.message);
            }
        }

        return { req, res, user }; // ✅ 加上 res
    },
});

export default async function graphqlHandler(req, res) {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.status(200).end();
        return;
    }

    return handler(req, res);
}