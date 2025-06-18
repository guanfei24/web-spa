"use client";

import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

interface MenuItemType {
  id: number;
  title: string;
  route?: string;
  parent_id?: number;
  children?: MenuItemType[];
}

export default function RecursiveMenu({ menu }: { menu: MenuItemType }) {
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

  return (
    <Button href={menu.route || "#"} component={Link} sx={menuTextStyle}>
      {menu.title}
    </Button>
  );
  //)
}
