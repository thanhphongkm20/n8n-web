import { AppBar, Toolbar, Button, Box, Link, Avatar } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import { COLORS } from "../common/Colors.jsx";
import { ROUTES } from "../../configs/routes.js";
import Logo from "../common/Logo.jsx";
import menuConfigs from "../../configs/menu.js";
import MenuUser from "../menu/MenuUser";
import StackRow from "../common/StackRow.jsx";

const Topbar = ({ authReady = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

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
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Logo />
        </Box>

        <StackRow
          gap={0}
          sx={{
            display: { xs: "none", md: "flex" },
            ml: 7,
          }}
        >
          {menuConfigs.topBar?.map((item) => {
            const Icon = item.mainIcon;
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

            return (
              <Link
                key={item.path}
                component="button"
                underline="none"
                onClick={() => navigate(item.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2.2,
                  height: "72px",
                  color: isActive ? COLORS.SECONDARY : COLORS.BLACK,
                  bgcolor: isActive,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.3px",
                  border: "none",
                  borderRadius: 0,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: COLORS.SECONDARY,
                    bgcolor: "rgba(0, 201, 167, 0.10)",
                  },
                }}
              >
                {Icon && <Icon size={16} />}
                {item.mainTitle}
              </Link>
            );
          })}
        </StackRow>
        <StackRow
          sx={{
            ml: "auto",
            minWidth: 230,
            justifyContent: "flex-end",
            flexShrink: 0,
          }}
        >
          {!authReady ? (
            <Box sx={{ width: 120, height: 36 }} />
          ) : user ? (
            <>
              <Box
                onClick={handleOpenMenu}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  cursor: "pointer",
                  px: 2,
                  height: "72px",
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
                isAdmin={user?.role === "admin"}
                onLogout={() => {
                  localStorage.removeItem("access_token");
                  window.location.reload();
                }}
              />
            </>
          ) : (
            <Button
              variant="contained"
              sx={{ bgcolor: COLORS.SECONDARY }}
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