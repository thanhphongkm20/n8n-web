import { IconButton } from "@mui/material";
import { darken } from "@mui/material/styles";
import { UserRoundPen } from "lucide-react";

import { COLORS } from "../common/Colors";

export const ButtonEdit = ({
  type = "button",
  onClick,
  icon = null,
}) => {
  return (
    <IconButton
      type={type}
      onClick={onClick}
      sx={{
        bgcolor: COLORS.SECONDARY,
        width: 40,
        height: 40,
        borderRadius: 1.5,
        "&:hover": {
          bgcolor: darken(COLORS.SECONDARY, 0.1),
        }
      }}
    >
      {icon ? icon : <UserRoundPen size={20} color={COLORS.WHITE} />}
    </IconButton>
  );
};