"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import RecursiveMenu from "@/components/RecursiveMenu";
import logo from "@/assets/logo/logo.png";

export default function Header() {
  const [menus, setMenus] = useState([]);
  const [hydrated, setHydrated] = useState(false); // ✅ 修复 hydration mismatch

  useEffect(() => {
    setHydrated(true); // ✅ 只在客户端渲染后再显示内容

    const fetchMenus = async () => {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              frontendMenus {
                id
                title
                route
                parent_id
                children {
                  id
                  title
                  route
                  parent_id
                }
              }
            }`,
          }),
        });
        const json = await res.json();
        setMenus(json.data.frontendMenus);
      } catch (err) {
        console.error("菜单加载失败:", err);
      }
    };

    fetchMenus();
  }, []);

  if (!hydrated) return null; // ✅ 避免服务端与客户端初始渲染不一致

  return (
    <header className="flex items-center gap-8 px-8 py-4">
      <Image
        src={logo}
        alt="Healing Harmony Spa Logo"
        width={150}
        height={80}
        style={{ objectFit: "contain" }}
        priority
      />
      {menus.map((menu) => (
        <RecursiveMenu key={menu.id} menu={menu} />
      ))}
    </header>
  );
}
