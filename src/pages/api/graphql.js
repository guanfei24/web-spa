import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/schema/typeDefs';
import { resolvers } from '@/schema/resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
    context: async (req, res) => {
        // ✅ 设置 CORS 响应头
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        return {}; // 可传 auth info
    },
});

// ✅ 包装成完整处理函数
export default async function graphqlHandler(req, res) {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.status(200).end(); // ✅ 预检请求直接返回
        return;
    }

    return handler(req, res); // 正常 GraphQL 请求处理
}