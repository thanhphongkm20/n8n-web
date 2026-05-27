import { Box, Stack, Typography, Switch } from "@mui/material";
import FormSelect from "../form/FormSelect";
import { BADGE_OPTIONS, CATEGORY_OPTIONS } from "../../configs/constants";

const MarketplaceSettings = ({ formik }) => {
  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 3,
        border: "1px solid rgba(15,23,42,0.08)",
        bgcolor: "#fff",
      }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 800, mb: 2 }}>
        MARKETPLACE SETTINGS
      </Typography>

      <Stack spacing={2.5}>
        <FormSelect
          id="category"
          title="CATEGORY"
          data={CATEGORY_OPTIONS}
          form={formik}
          backgroundColor="#fff"
        />

        <FormSelect
          id="badge"
          title="BADGE"
          data={BADGE_OPTIONS}
          form={formik}
          backgroundColor="#fff"
        />

        <Box
          sx={{
            p: 2,
            borderRadius: 2.5,
            border: "1px solid rgba(15,23,42,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>
              Featured Workflow
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#64748b",
                mt: 0.4,
                textAlign: "left",
              }}
            >
              Show this workflow on featured section
            </Typography>
          </Box>

          <Switch
            checked={Boolean(formik.values.featured)}
            onChange={(e) =>
              formik.setFieldValue("featured", e.target.checked)
            }
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default MarketplaceSettings;