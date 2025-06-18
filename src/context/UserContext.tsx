"use client";

import { createContext, useContext, ReactNode } from "react";

// ✅ 导出类型供外部使用
export interface User {
  id: string;
  name: string;
}

export interface UserContextType {
  user: User | null;
  logout: () => void;
}

// ✅ 创建上下文
export const UserContext = createContext<UserContextType>({
  user: null,
  logout: () => {},
});

// ✅ 提供自定义 Hook
export const useUser = () => useContext(UserContext);

// ✅ 定义 Provider 的 Props 接口
interface UserProviderProps {
  children: ReactNode;
  user: User | null;
  logout: () => void;
}

// ✅ UserProvider 组件
export function UserProvider({ children, user, logout }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}
