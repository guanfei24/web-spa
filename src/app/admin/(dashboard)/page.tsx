"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  name: string;
}

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  let user: JwtPayload | null = null;

  if (token) {
    try {
      user = jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultsecret"
      ) as JwtPayload;
    } catch (err) {
      console.log("❌ Invalid token:", err);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      {user ? (
        <p className="mt-4 text-green-700">{`Welcome, User ID: ${user.id}`}</p>
      ) : (
        <p className="mt-4 text-red-600">Login Required!</p>
      )}
    </div>
  );
}
