"use client";

import React from "react";
import Header from "@/components/Header"; // 确保路径正确
import Footer from "@/components/Footer"; // 确保路径正确
import { MenuProvider } from "@/context/MenuContext"; // 确保路径正确

// -----------------------------------------------------------------------------
// 注意：
// 这是您网站页面的主布局文件。
// 我已经移除了 <main> 标签上任何可能引起冲突的 className。
// 这个布局的作用是为所有页面统一加上页头和页脚。
// -----------------------------------------------------------------------------

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MenuProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </MenuProvider>
  );
}
