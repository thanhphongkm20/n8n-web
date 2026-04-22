import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { COLORS } from "../common/Colors";

import { setAppState, setAppStateChild } from "../../store/slices/app-state.slice";

const MenuTopItem = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const hasChildren = item.children?.length > 0;

  const isPathActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(`${path}/`);

  const isActive =
    item.path === "/"
      ? location.pathname === "/"
      : isPathActive(item.path) ||
      item.children?.some((child) =>
        isPathActive(child.path)
      );

  const handleClick = () => {
    dispatch(setAppState(item.appState));

    if (!hasChildren) {
      dispatch(setAppStateChild(item.appState));
      navigate(item.path);
    }
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={
          hasChildren ? (e) => setAnchorEl(e.currentTarget) : handleClick
        }
        sx={{
          height: 64,
          px: 3,
          textTransform: "none",
          fontSize: 16,
          color: isActive ? COLORS.TABLE_TEXT : COLORS.BLACK,
          display: "flex",
          alignItems: "center",
          borderRadius: 0,
          borderBottom: isActive ? COLORS.BORDER_FOCUS : "transparent",
          bgcolor: isActive ? COLORS.CARD_BREATHE_ICON : "transparent",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: COLORS.CARD_BREATHE_ICON,
          },
        }}
      >
        {item.mainTitle}
      </Button>

      {hasChildren && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {item.children.map((child, index) => {
            const isChildActive =
              location.pathname === child.path ||
              location.pathname.startsWith(`${child.path}/`);
            return (
              <MenuItem
                key={index}
                selected={isChildActive}
                onClick={() => {
                  dispatch(setAppStateChild(child.appStateChild));
                  navigate(child.path);
                  setAnchorEl(null);
                }}
              >
                {child.title}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </>
  );
};

export default MenuTopItem;
