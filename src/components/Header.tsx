"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import RecursiveMenu from "@/components/RecursiveMenu";
import logo from "@/assets/logo/logo.png";
import { useMenus } from "@/context/MenuContext";

export default function Header() {
  const { menus } = useMenus();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Healing Harmony Spa Logo"
            width={150}
            height={80}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {menus?.map((menu) => (
            <RecursiveMenu key={menu.id} menu={menu} />
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-gold"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu with animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-black border-t border-gold/30 px-6 pb-4 flex flex-col space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {menus?.map((menu) => (
              <RecursiveMenu key={menu.id} menu={menu} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
