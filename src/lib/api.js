// src/api/api.js
const GRAPHQL_ENDPOINT = "/api/graphql"; // 相对路径适配所有环境

export async function callApi({ query, variables = {} }) {
    console.log("Calling API with query:", query, "and variables:", variables);

    try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${localStorage.getItem("token")}` // 如有需要可启用
            },
            body: JSON.stringify({ query, variables }),
        });

        const result = await response.json();
        console.log("API Response:", result);
        if (result.errors) {
            console.error("GraphQL Errors:", result.errors);
            throw new Error(result.errors[0].message || "GraphQL error occurred");
        }

        return result.data;
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
}