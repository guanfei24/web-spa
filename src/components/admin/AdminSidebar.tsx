// ✅ components/admin/AdminSidebar.tsx
"use client";
import Link from "next/link";
import { LayoutDashboard, MessageSquare, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-16 md:w-60 bg-white border-r shadow-sm flex flex-col">
      <div className="flex items-center justify-center md:justify-start px-4 py-6 text-indigo-600 font-bold text-lg">
        <span className="hidden md:block">Admin</span>
        <span className="md:hidden">🛠️</span>
      </div>
      <nav className="flex flex-col gap-1 px-2 md:px-4">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition ${
                isActive
                  ? "bg-gray-100 text-indigo-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
