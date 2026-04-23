import { AppBar, Toolbar, Button, Box, Link, Avatar } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import { COLORS } from "../common/Colors.jsx";
import { ROUTES } from "../../configs/routes.js";
import Animate from "../common/Animate.jsx";
import Logo from "../common/Logo.jsx";
import menuConfigs from "../../configs/menu.js";
import MenuUser from "../menu/MenuUser";
import StackRow from "../common/StackRow.jsx";

const Topbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: COLORS.WHITE,
        borderBottom: `1px solid ${COLORS.BORDER_SAND_CARD}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1440px",
          mx: "auto",
          px: { xs: 3, md: 5 },
          height: "72px",
        }}
      >
        {/* LOGO */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Animate type="fade" delay={0.2}>
            <Logo />
          </Animate>
        </Box>

        {/* MENU */}
        <StackRow
          gap={5}
          sx={{
            display: { xs: "none", md: "flex" },
            mx: 7,
          }}
        >
          {menuConfigs.topBar?.map((item) => {
            const Icon = item.mainIcon;

            return (
              <Link
                key={item.path}
                href={item.path}
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 0.5,
                  color: COLORS.BLACK,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  letterSpacing: "0.3px",
                  borderRadius: "6px",
                  "&:hover": {
                    color: COLORS.SECONDARY,
                    bgcolor: "rgba(0,0,0,0.04)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {Icon && <Icon size={16} />}
                {item.mainTitle}
              </Link>
            );
          })}
        </StackRow>
        <StackRow sx={{ ml: "auto" }}>
          {user ? (
            <>
              <Box
                onClick={handleOpenMenu}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  cursor: "pointer",
                  px: 1.5,
                  py: 0.6,
                  borderRadius: "999px",
                  transition: "all 0.2s ease",

                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: COLORS.SECONDARY,
                    fontSize: 14,
                  }}
                >
                  {user.display_name?.charAt(0).toUpperCase()}
                </Avatar>

                <Box
                  sx={{
                    fontWeight: 500,
                    color: "#0f172a",
                    fontSize: "0.9rem",
                  }}
                >
                  {user.display_name}
                </Box>

                <ChevronDown
                  size={14}
                  style={{
                    color: "#94a3b8",
                    transition: "0.2s",
                    transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Box>
              <MenuUser
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                onLogout={() => {
                  localStorage.removeItem("access_token");
                  window.location.reload();
                }}
              />
            </>
          ) : (
            <Button
              variant="contained"
              sx={{
                bgcolor: COLORS.SECONDARY,
              }}
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              LOGIN
            </Button>
          )}
        </StackRow>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;