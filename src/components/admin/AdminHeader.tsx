// components/admin/AdminHeader.tsx
"use client";
import { LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const { user, logout } = useUser();
  const router = useRouter();
  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      logout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm">
      <h1 className="text-base font-semibold tracking-tight">
        Healing Harmony Admin
      </h1>

      <div className="flex items-center gap-4">
        {user && <span className="text-sm text-gray-700">Hi, {user.name}</span>}

        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
