import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { LogOut, UserRoundCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../configs/routes";
import { COLORS } from "../common/Colors";

import LANGUAGE from "../../utils/language.util";

const MenuUser = ({
  anchorEl,
  open,
  onClose,
  onAccountSettings,
  onLogout
}) => {
  const navigate = useNavigate();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      disableAutoFocusItem
      disableEnforceFocus
      disableRestoreFocus
      slotProps={{
        paper: {
          sx: {
            mt: 2,
            ml: 1,
            bgcolor: COLORS.WHITE,
            color: COLORS.BLACK,
            minWidth: 230,
            p: 0,
            borderRadius: 2,
            boxShadow: 6,
            "& .MuiMenuItem-root": {
              py: 1,
              fontSize: 18,
              borderRadius: 2,
              "&:hover": { bgcolor: COLORS.HOVER_MENU, borderRadius: 0 },
            },
            "& .MuiListItemIcon-root": {
              color: COLORS.BLACK,
              minWidth: 45,
              "& svg": { fontSize: 25 },
            },
          },
        },
      }}
    >
      <MenuItem
        onClick={() => {
          navigate(ROUTES.ACCOUNT.SETTINGS);
          onAccountSettings?.();
          onClose?.();
        }}
      >
        <ListItemIcon>
          <UserRoundCog size={20} />
        </ListItemIcon>
        ACCOUNT SETTINGS
      </MenuItem>
      <MenuItem
        onClick={() => {
          onLogout?.();
          onClose?.();
        }}
      >
        <ListItemIcon>
          <LogOut size={20} />
        </ListItemIcon>
        LOG OUT
      </MenuItem>
    </Menu>
  );
};

export default MenuUser;
