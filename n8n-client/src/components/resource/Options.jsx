import { Box, Divider, Paper, Switch, Typography } from "@mui/material";
import { SlidersHorizontal } from "lucide-react";

import StackRow from "../common/StackRow";
import { OPTIONS } from "../../configs/constants";

const Options = ({ formik }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #d9d9d9",
        borderRadius: "12px",
        px: 3.5,
        py: 3,
        bgcolor: "#fff",
      }}
    >
      <StackRow spacing={1} alignItems="center" sx={{ mb: 2.6 }}>
        <SlidersHorizontal size={16} color="#3f3f3f" />

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.6,
            color: "#3f3f3f",
          }}
        >
          OPTIONS
        </Typography>
      </StackRow>

      {OPTIONS.map((item, index) => (
        <Box key={item.id}>
          <StackRow justifyContent="space-between" alignItems="center">
            <Box
              sx={{
                flex: 1,
                textAlign: "left",
                pr: 2,
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                {item.title}
              </Typography>

              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {item.description}
              </Typography>
            </Box>

            <Switch
              checked={Boolean(formik.values[item.id])}
              onChange={(e) =>
                formik.setFieldValue(item.id, e.target.checked)
              }
            />
          </StackRow>
          {index < OPTIONS.length - 1 && <Divider sx={{ my: 1.4 }} />}
        </Box>
      ))}
    </Paper>
  );
};

export default Options;