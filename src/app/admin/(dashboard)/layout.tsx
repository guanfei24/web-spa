import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { UserProvider } from "@/context/UserContext";
import React from "react";

// ✅ 定义 token 解码后的结构
interface JwtPayload {
  id: string;
  name: string;
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  let user: { id: string; name: string } | null = null;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultsecret"
      ) as JwtPayload;

      user = {
        id: decoded.id,
        name: decoded.name,
      };
    } catch (err) {
      console.error("❌ Invalid token:", err);
    }
  }

  async function logout() {
    "use server";
    const cookieStore = cookies();
    (await cookieStore).set("token", "", {
      path: "/",
      maxAge: 0,
    });
    console.log("User logged out");
  }

  return (
    <UserProvider user={user} logout={logout}>
      <div className="flex h-screen bg-gray-50 text-gray-800">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
