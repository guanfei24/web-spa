// app/admin/(dashboard)/layout.tsx
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { UserProvider } from "@/context/UserContext";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;
  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultsecret"
      ) as any;
      user = { id: decoded.id, name: decoded.name };
    } catch (err) {
      console.log("❌ Invalid token:", err);
    }
  }

  async function logout() {
    "use server";
    const cookieStore = cookies();
    cookieStore.set("token", "", {
      path: "/",
      maxAge: 0,
    });
    console.log("User logged out");
  }
  console.log("User in layout:", user);
  console.log("Token in layout:", token);
  console.log("logout function:", logout);
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
