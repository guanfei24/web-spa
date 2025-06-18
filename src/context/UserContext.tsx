"use client";

import { createContext, useContext } from "react";

interface User {
  id: number;
  name: string;
}

interface UserContextType {
  user: User | null;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

// ✅ 新增 UserProvider 组件
export function UserProvider({
  children,
  user,
  logout,
}: {
  children: React.ReactNode;
  user: User | null;
  logout: () => void;
}) {
  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}
