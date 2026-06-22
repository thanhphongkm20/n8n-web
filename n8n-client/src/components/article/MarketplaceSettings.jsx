import { Box, Stack, Typography, Switch, Autocomplete, TextField } from "@mui/material";
import FormSelect from "../form/FormSelect";
import { BADGE_OPTIONS } from "../../configs/constants";
import articleApi from "../../api/article.api";
import { useEffect, useState } from "react";

const MarketplaceSettings = ({ formik }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await articleApi.getCategories();
        const categories = (res?.categories || []).map((c) => String(c));
        if (mounted) setOptions(Array.from(new Set(categories)));
      } catch {
        // ignore
      }
    })();
    return () => (mounted = false);
  }, []);

  const handleCreateCategory = async (name) => {
    try {
      const res = await articleApi.createCategory(name);
      const created = res?.category?.name || name;
      setOptions((prev) => Array.from(new Set([...(prev || []), created])));
      return created;
    } catch {
      return name;
    }
  };

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
        <Autocomplete
          freeSolo
          options={options}
          value={formik.values.category || ""}
          onChange={async (e, newValue) => {
            if (!newValue) {
              formik.setFieldValue("category", "");
              return;
            }

            // If the value is new (not in options), create it on backend
            const isExisting = options.includes(newValue);
            const finalValue = isExisting ? newValue : await handleCreateCategory(newValue);
            formik.setFieldValue("category", finalValue);
          }}
          onInputChange={(e, newInput) => {
            // update form value as user types
            formik.setFieldValue("category", newInput);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="CATEGORY"
              placeholder="Type or select category"
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
              onBlur={async () => {
                const current = formik.values.category || "";
                if (current && !options.includes(current)) {
                  const created = await handleCreateCategory(current);
                  formik.setFieldValue("category", created);
                }
              }}
            />
          )}
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