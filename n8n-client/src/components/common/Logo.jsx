import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

import { ROUTES } from "../../configs/routes";
import StackRow from "./StackRow";
import { COLORS } from "../common/Colors";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <StackRow
      gap={0.5}
      alignItems="center"
      sx={{
        cursor: "pointer",
        userSelect: "none",
        "&:hover .logo-icon": { transform: "scale(1.1)" },
        transition: "all 0.2s"
      }}
      onClick={() => navigate(ROUTES.HOME)}
    >
      <Box
        className="logo-icon"
        sx={{
          display: "flex",
          alignItems: "center",
          transition: "transform 0.2s ease-in-out",
        }}
      >
        <Box
          component="img"
          src="https://n8n.io/favicon.ico"
          alt="n8n"
          sx={{
            width: 35,
            height: 35,
            objectFit: "contain",
          }}
        />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontSize: "1.5rem",
          fontWeight: 900,
          letterSpacing: "-0.5px",
          color: COLORS.BLACK,
          display: "flex",
          alignItems: "center"
        }}
      >
        N8N
        <Box
          component="span"
          sx={{
            color: COLORS.SECONDARY,
            ml: 0.5,
            fontWeight: 500
          }}
        >
          Hub
        </Box>
      </Typography>
    </StackRow>
  );
};

export default Logo;