import Image from "next/image";
import RecursiveMenu from "@/components/RecursiveMenu";
import logo from "@/assets/logo/logo.png";
import { useMenus } from "@/context/MenuContext";

export default function Header() {
  const { menus } = useMenus();

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
      {menus?.map((menu) => (
        <RecursiveMenu key={menu.id} menu={menu} />
      ))}
    </header>
  );
}
