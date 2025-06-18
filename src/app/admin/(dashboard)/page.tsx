// app/admin/page.tsx
"use server"; // 或者在 `app/admin/layout.tsx` 中设置 runtime

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  let user = null;
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    } catch (err) {
      console.log("❌ Invalid token:", err);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      {user ? (
        <p className="mt-4 text-green-700">
          Welcome，User ID: {(user as any).id}
        </p>
      ) : (
        <p className="mt-4 text-red-600">Login Required!</p>
      )}
    </div>
  );
}
