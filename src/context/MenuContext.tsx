"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { callApi } from "@/lib/api"; // 确保路径正确

// 类型定义
export interface MenuItem {
  id: number;
  title: string;
  route: string;
  children?: MenuItem[];
}

interface MenuContextType {
  menus: MenuItem[];
  loading: boolean;
}

// 创建上下文
const MenuContext = createContext<MenuContextType>({
  menus: [],
  loading: true,
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApi({
      query: `
        query {
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
        }
      `,
    })
      .then((data) => {
        console.log("✅ menus loaded", data.frontendMenus); // 👈 添加这个

        setMenus(data.frontendMenus);
      })
      .catch((err) => console.error("❌ 加载菜单失败:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MenuContext.Provider value={{ menus, loading }}>
      {children}
    </MenuContext.Provider>
  );
};

// 自定义 Hook
export const useMenus = () => useContext(MenuContext);
