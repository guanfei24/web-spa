"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

interface MenuItemType {
  id: number;
  title: string;
  route?: string;
  parent_id?: number;
  children?: MenuItemType[];
}
interface Service {
  id: number;
  title: string;
  price: number;
  duration: number;
  slug: string;
  image_url?: string;
  description?: string;
}
export default function RecursiveMenu({ menu }: { menu: MenuItemType }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const router = useRouter();
  // const { serviceCategories } = useServices();

  // const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
  //   setAnchorEl(e.currentTarget);
  // const handleClose = () => setAnchorEl(null);

  const menuTextStyle = {
    color: "#b8860b",
    fontFamily: "Cinzel, serif",
    fontWeight: "500",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#f5d47b",
    },
  };

  // // ✅ 特殊处理 Services 菜单
  // if (menu.title === "Services") {
  //   return (
  //     <>
  //       <Button
  //         aria-controls={open ? `services-menu` : undefined}
  //         aria-haspopup="true"
  //         onClick={handleOpen}
  //         sx={menuTextStyle}
  //       >
  //         {menu.title}
  //       </Button>
  //       <Menu
  //         id="services-menu"
  //         anchorEl={anchorEl}
  //         open={open}
  //         onClose={handleClose}
  //         PaperProps={{
  //           style: {
  //             backgroundColor: "#222",
  //             color: "#bfa14d",
  //             fontFamily: "Cinzel, serif",
  //           },
  //         }}
  //       >
  //         {serviceCategories.map((cat) => (
  //           <div key={cat.id}>
  //             <MenuItem
  //               disabled
  //               sx={{ fontWeight: "bold", color: "#f0c75e", opacity: 1 }}
  //             >
  //               {cat.name}
  //             </MenuItem>
  //             {cat.services?.map((srv: Service) => (
  //               <MenuItem
  //                 key={srv.id}
  //                 onClick={() => {
  //                   handleClose();
  //                   router.push(`/services/${srv.slug}`);
  //                 }}
  //                 sx={menuTextStyle}
  //               >
  //                 {srv.title}
  //               </MenuItem>
  //             ))}
  //           </div>
  //         ))}
  //       </Menu>
  //     </>
  //   );
  // }

  //const hasChildren = menu.children && menu.children.length > 0;

  //return hasChildren ? (
  //   <>
  //     <Button
  //       aria-controls={open ? `menu-${menu.id}` : undefined}
  //       aria-haspopup="true"
  //       onClick={handleOpen}
  //       sx={menuTextStyle}
  //     >
  //       {menu.title}
  //     </Button>
  //     <Menu
  //       id={`menu-${menu.id}`}
  //       anchorEl={anchorEl}
  //       open={open}
  //       onClose={handleClose}
  //       PaperProps={{
  //         style: {
  //           backgroundColor: "#222",
  //           color: "#bfa14d",
  //           fontFamily: "Cinzel, serif",
  //         },
  //       }}
  //     >
  //       {menu.children?.map((child) => (
  //         <MenuItem
  //           key={child.id}
  //           onClick={handleClose}
  //           sx={menuTextStyle}
  //           disableRipple
  //         >
  //           {child.children && child.children.length > 0 ? (
  //             <RecursiveMenu menu={child} />
  //           ) : (
  //             <Link
  //               href={child.route || "#"}
  //               style={{ textDecoration: "none", color: "#bfa14d" }}
  //             >
  //               {child.title}
  //             </Link>
  //           )}
  //         </MenuItem>
  //       ))}
  //     </Menu>
  //   </>
  // ) : (
  return (
    <Button href={menu.route || "#"} component={Link} sx={menuTextStyle}>
      {menu.title}
    </Button>
  );
  //)
}
