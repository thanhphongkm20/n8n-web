import {
  Box,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { RESOURCE_TABS } from "../../configs/constants";

const ResourceFilterBar = ({ filter, counts = {}, onFilterChange }) => {
  return (
    <Box
      sx={{
        py: 2.5,
        bgcolor: "rgba(13, 21, 37, 0.96)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(16px)",
      }}
    >
      <Container maxWidth="xl">
        <ToggleButtonGroup
          exclusive
          value={filter}
          onChange={(_, value) => value && onFilterChange(value)}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              md: "repeat(6, minmax(0, 1fr))",
            },
            gap: 1,
            width: "100%",

            "& .MuiToggleButtonGroup-grouped": {
              m: 0,
              border: "1px solid rgba(148,163,184,0.18) !important",
              borderRadius: "14px !important",
            },

            "& .MuiToggleButton-root": {
              height: 46,
              px: 1.5,
              width: "100%",
              justifyContent: "center",
              bgcolor: "rgba(15,23,42,0.72)",
              color: "#CBD5E1",
              textTransform: "none",
              fontWeight: 800,
              fontSize: 13,
              lineHeight: 1,
              gap: 0.9,
              whiteSpace: "nowrap",
              transition: "all .2s ease",

              "& svg": {
                flexShrink: 0,
                color: "currentColor",
              },

              "&:hover": {
                bgcolor: "rgba(30,41,59,0.95)",
                borderColor: "rgba(0,201,167,0.35) !important",
                transform: "translateY(-1px)",
              },

              "&.Mui-selected": {
                bgcolor: "#00C9A7",
                color: "#04111F",
                borderColor: "#00C9A7 !important",
                boxShadow: "0 10px 28px rgba(0,201,167,0.22)",

                "&:hover": {
                  bgcolor: "#05DDB8",
                },
              },
            },
          }}
        >
          {RESOURCE_TABS.map((tab) => {
            const Icon = tab.Icon;

            return (
              <ToggleButton key={tab.value} value={tab.value}>
                {Icon && <Icon size={16} strokeWidth={2.4} />}

                <Box
                  component="span"
                  sx={{
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {tab.label}
                </Box>

                <Box
                  component="span"
                  sx={{
                    minWidth: 22,
                    height: 22,
                    px: 0.75,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "999px",
                    bgcolor:
                      filter === tab.value
                        ? "rgba(4,17,31,0.14)"
                        : "rgba(148,163,184,0.16)",
                    color: "inherit",
                    fontSize: 11,
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {counts[tab.value]}
                </Box>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Container>
    </Box>
  );
};

export default ResourceFilterBar;