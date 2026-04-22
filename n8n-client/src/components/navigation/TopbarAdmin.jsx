import { AppBar, Avatar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { ChevronDown, TextAlignJustify } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import menuConfigs from "../../configs/menu";
import { ROUTES } from "../../configs/routes";
import { COLORS } from "../common/Colors";
import Logo from "../common/Logo";
import StackRow from "../common/StackRow";
import MenuTopItem from "../menu/MenuTopItem";
import MenuUser from "../menu/MenuUser";

import { setAppStateChild } from "../../store/slices/app-state.slice";
import { setUser } from "../../store/slices/user.slice";

const TopBarDashboard = ({ onOpenMobileMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleAccountSettings = () => {
    document.activeElement?.blur();
    closeMenu();
  };

  const handleLogout = () => {
    document.activeElement?.blur();
    closeMenu();
    dispatch(setUser(null));
    dispatch(setAppStateChild(null));
    navigate(ROUTES.LOGIN);
  };

  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        backgroundColor: COLORS.WHITE,
        borderBottom: COLORS.BORDER_TOP_BAR,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          height: 64,
          px: 3,
          alignItems: "center",
        }}
      >
        {/* TopBar left*/}
        <StackRow gap={2} alignItems="center">
          {/* Mobile only */}
          <IconButton
            onClick={onOpenMobileMenu}
            sx={{ display: { xs: "inline-flex", lg: "none" }, p: 0 }}
          >
            <TextAlignJustify />
          </IconButton>

          {/* Logo */}
          <Logo />
        </StackRow>

        <Box sx={{ flexGrow: 1 }} />

        {/* TopBar right */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            whiteSpace: "nowrap",
          }}
        >
          {/* Desktop menu */}
          <Stack
            direction="row"
            alignItems="stretch"
            sx={{
              height: "100%",
              display: { xs: "none", lg: "flex" },
            }}
          >
            {menuConfigs.menuAdminBar.map((item, index) => (
              <MenuTopItem key={index} item={item} />
            ))}
          </Stack>

          {/* User menu */}
          {user && (
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  cursor: "pointer",
                  color: COLORS.BLACK,
                  "&:active": { opacity: 0.6 },
                }}
                onClick={openMenu}
              >
                <Avatar
                  src={user?.avatar}
                  sx={{ width: 34, height: 34 }}
                />
                <Typography
                  fontSize={15}
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    lineHeight: 1,
                    fontWeight: 500,
                  }}
                >
                  {user?.display_name || "System Administrator"}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ChevronDown size={16} />
                </Box>
              </Stack>
              <MenuUser
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                onAccountSettings={handleAccountSettings}
                onLogout={handleLogout}
              />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBarDashboard;