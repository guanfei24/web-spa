"use client";

import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MenuProvider } from "@/context/MenuContext";

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <MenuProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </MenuProvider>
  );
}
