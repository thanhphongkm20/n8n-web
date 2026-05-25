import { darken, IconButton } from "@mui/material";
import { Trash } from "lucide-react";
import { BG_COLORS, COLORS } from "../common/Colors";

const ButtonDelete = ({
  type = "button",
  onClick,
}) => {
  return (
    <IconButton
      type={type}
      onClick={onClick}
      sx={{
        bgcolor: BG_COLORS.DELETE,
        width: 40,
        height: 40,
        borderRadius: 1.5,
        color: COLORS.WHITE,
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: darken(BG_COLORS.DELETE, 0.2),
        }
      }}
    >
      <Trash size={20} />
    </IconButton>
  );
};

export default ButtonDelete;