import Image from "next/image";
import { useEffect, useState } from "react";
import RecursiveMenu from "@/components/RecursiveMenu";
import logo from "@/assets/logo/logo.png";

interface MenuItem {
  id: number;
  title: string;
  route?: string;
  parent_id?: number;
  children?: MenuItem[];
}

export default function Header() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

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
        setMenus(json.data.frontendMenus || []);
      } catch (err) {
        console.error("菜单加载失败:", err);
      }
    };

    fetchMenus();
  }, []);

  if (!hydrated) return null;

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
