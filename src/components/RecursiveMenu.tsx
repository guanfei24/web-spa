import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Menu, MenuItem } from "@mui/material";
import { useServices } from "@/context/ServicesContext";
import Link from "next/link";

export default function RecursiveMenu({ menu }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { serviceCategories } = useServices();

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

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

  if (menu.title === "Services") {
    return (
      <>
        <Button
          aria-controls={open ? `services-menu` : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
          sx={menuTextStyle}
        >
          {menu.title}
        </Button>
        <Menu
          id="services-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: "#222",
              color: "#bfa14d",
              fontFamily: "Cinzel, serif",
            },
          }}
        >
          {serviceCategories.map((cat) => (
            <div key={cat.id}>
              <MenuItem
                disabled
                sx={{ fontWeight: "bold", color: "#f0c75e", opacity: 1 }}
              >
                {cat.name}
              </MenuItem>
              {cat.services?.map((srv) => (
                <MenuItem
                  key={srv.id}
                  onClick={() => {
                    handleClose();
                    router.push(`/services/${srv.slug}`);
                  }}
                  sx={menuTextStyle}
                >
                  {srv.title}
                </MenuItem>
              ))}
            </div>
          ))}
        </Menu>
      </>
    );
  }

  const hasChildren = menu.children && menu.children.length > 0;

  return hasChildren ? (
    <>
      <Button
        aria-controls={open ? `menu-${menu.id}` : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        sx={menuTextStyle}
      >
        {menu.title}
      </Button>
      <Menu
        id={`menu-${menu.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#222",
            color: "#bfa14d",
            fontFamily: "Cinzel, serif",
          },
        }}
      >
        {menu.children.map((child) => (
          <MenuItem
            key={child.id}
            onClick={handleClose}
            sx={menuTextStyle}
            disableRipple
          >
            {child.children && child.children.length > 0 ? (
              <RecursiveMenu menu={child} />
            ) : (
              <Link
                href={child.route || "#"}
                style={{ textDecoration: "none", color: "#bfa14d" }}
              >
                {child.title}
              </Link>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  ) : (
    <Button href={menu.route || "#"} component={Link} sx={menuTextStyle}>
      {menu.title}
    </Button>
  );
}
