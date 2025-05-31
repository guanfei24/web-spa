"use client";

import Image from "next/image";
import Link from "next/link";
import { useMenus } from "@/context/MenuContext";
import logo from "@/assets/logo/logo.png"; // ✅ 确保路径正确

export default function Footer() {
  const { menus } = useMenus();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 mt-12 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-row justify-between gap-8 text-left">
        {/* Logo & Slogan */}
        <div className="flex-1">
          <Link href="/">
            <Image
              src={logo}
              alt="Healing Harmony Spa Logo"
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
            />
          </Link>
          <h2 className="text-xl font-bold text-yellow-600 mb-2">
            Healing Harmony Spa
          </h2>
          <p className="text-sm">
            Where wellness meets luxury. Rejuvenate your body and soul.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">
            Quick Links
          </h4>
          <ul className="space-y-1 list-none">
            {menus?.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.route}
                  className="text-[#b8860b] hover:text-[#f5d47b] no-underline transition-colors"
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">Contact</h4>
          <p className="text-sm">
            📍 44075 Pipeline Plaza STE 220, Ashburn, VA 20147
          </p>
          <p className="text-sm">📞 (903)928-2338</p>
          <p className="text-sm">✉️ info@healingharmonyspa.net</p>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-gray-200">
        © {year} Healing Harmony Spa. All rights reserved.
      </div>
    </footer>
  );
}
