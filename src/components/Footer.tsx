"use client";

import Image from "next/image";
import Link from "next/link";
import { useMenus } from "@/context/MenuContext";
import logo from "@/assets/logo/logo.png";
import { Phone, Mail, MapPin } from "lucide-react"; // 引入图标以增强视觉效果

export default function Footer() {
  const { menus } = useMenus();
  const year = new Date().getFullYear();

  return (
    // 样式更新：应用黑金主题
    <footer
      id="footer"
      className="bg-black border-t border-gold/30 pt-16 pb-8 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {/* Logo & Slogan */}
          <div>
            <Link href="/">
              <Image
                src={logo}
                alt="Healing Harmony Spa Logo"
                width={150}
                height={80} // 调整高度以适应布局
                style={{ objectFit: "contain" }}
              />
            </Link>
            <h3 className="text-xl font-serif text-gold tracking-wider mt-4 mb-2">
              Healing Harmony Spa
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Where wellness meets luxury. Rejuvenate your body and soul.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif text-gold tracking-wide mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {menus?.map((menu) => (
                <li key={menu.id}>
                  <Link
                    href={menu.route || "#"}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-serif text-gold tracking-wide mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-gold flex-shrink-0" />
                <span>44075 Pipeline Plaza STE 220, Ashburn, VA 20147</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gold" />
                <span>(903) 928-2338</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gold" />
                <span>info@healingharmonyspa.net</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-16 pt-8 border-t border-gold/20 text-center text-gray-500 text-sm">
          <p>&copy; {year} Healing Harmony Spa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
