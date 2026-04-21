import { AppBar, Toolbar, Button, Box, Link } from "@mui/material";
import Animate from "../common/Animate.jsx";
import { COLORS } from "../common/Colors.jsx";
import Logo from "../common/Logo.jsx";
import StackRow from "../common/StackRow.jsx";
import menuConfigs from "../../configs/menu.js";

const Topbar = () => {
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

        <StackRow
          sx={{
            ml: "auto",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: COLORS.SECONDARY,
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "8px",
              px: 4,
              py: 1,
              "&:hover": {
                bgcolor: COLORS.SECONDARY,
                opacity: 0.9,
              },
            }}
          >
            Request Consultation
          </Button>
        </StackRow>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;