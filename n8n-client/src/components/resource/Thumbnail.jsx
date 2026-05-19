import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Image, ImagePlus } from "lucide-react";
import { useMemo, useState } from "react";

const Thumbnail = ({ formik }) => {
  const url = formik?.values?.thumbnail_url ?? "";
  const file = formik?.values?.thumbnail_file ?? null;
  const [imgError, setImgError] = useState(false);

  const filePreview = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  const previewSrc = filePreview;
  const showPreview = previewSrc && !imgError;

  const handleChange = (e) => {
    setImgError(false);
    formik?.setFieldValue("thumbnail_url", e.target.value);
    formik?.setFieldValue("thumbnail_file", null);
  };

  const handleFileChange = (e) => {
    const selectedImage = e.target.files?.[0];
    if (!selectedImage) return;

    setImgError(false);
    formik?.setFieldValue("thumbnail_file", selectedImage);
    formik?.setFieldValue("thumbnail_url", "");
  };

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.4 }}>
        <Image size={16} color="#3f3f3f" />
        <Typography sx={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.6, color: "#3f3f3f" }}>
          THUMBNAIL
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "96px 1fr",
          },
          alignItems: "start",
          gap: 2,
          p: 2,
          borderRadius: "10px",
          border: "1px dashed #d6d2c8",
          bgcolor: "#f9f8f5",
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "12px",
            border: "1px solid #ddd",
            bgcolor: "#ece9e2",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {showPreview ? (
            <Box
              component="img"
              src={previewSrc}
              onError={() => setImgError(true)}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.3,
              }}
            >
              <Image size={14} color="#b0a99a" />
              <Typography sx={{ fontSize: 10, color: "#b0a99a", fontWeight: 500 }}>
                Preview
              </Typography>
            </Box>
          )}
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              mb: 0.8,
              color: "#3f3f3f",
              textAlign: "left",
            }}
          >
            Thumbnail URL
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="https://example.com/image.png"
            value={url}
            onChange={handleChange}
            sx={{
              mb: 0.7,
              "& .MuiOutlinedInput-root": {
                borderRadius: "7px",
                bgcolor: "#fff",
                fontSize: 14,
                height: 40,
              },
            }}
          />

          <Button
            component="label"
            variant="outlined"
            startIcon={<ImagePlus size={16} />}
            sx={{
              mt: 1,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Upload image
            <input
              hidden
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              onChange={handleFileChange}
            />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Thumbnail;