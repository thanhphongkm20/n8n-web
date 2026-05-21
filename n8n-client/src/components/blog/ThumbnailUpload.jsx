import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { Image, ImagePlus, Link2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import FormLabelField from "../form/FormLabelField";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const ThumbnailUpload = ({ form, onChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleClear = () => {
    onChange("thumbnail")({
      target: { value: "" },
    });
  };

  const handleFile = async (file) => {
    if (!file) return;

    const base64 = await toBase64(file);

    onChange("thumbnail")({
      target: { value: base64 },
    });
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        p: 2.5,
        bgcolor: "#fff",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb: 1.5,
          alignItems: "center",
        }}
      >
        <ImagePlus size={16} color="#111827" />

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 0.5,
            color: "#111827",
          }}
        >
          THUMBNAIL
        </Typography>
      </Stack>
      <FormLabelField
        fullWidth
        size="small"
        placeholder="https://example.com/image.png"
        value={form.thumbnail}
        onChange={onChange("thumbnail")}
        InputProps={{
          startAdornment: (
            <Link2
              size={15}
              style={{
                marginRight: 8,
                color: "#9ca3af",
              }}
            />
          ),
        }}
      />

      <Divider sx={{ my: 2 }}>OR</Divider>

      <Box
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        sx={{
          border: `1.5px dashed ${
            dragOver ? "#00a389" : "rgba(0,0,0,0.12)"
          }`,
          borderRadius: "10px",
          p: 2,
          minHeight: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
          bgcolor: dragOver ? "#f0fdfa" : "#fafafa",
          transition: "all .2s ease",
          "&:hover": {
            borderColor: "#00a389",
            bgcolor: "#f8fffd",
          },
        }}
      >
        {form.thumbnail ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              aspectRatio: "16 / 9",
              bgcolor: "#f3f4f6",
            }}
          >
            <Box
              component="img"
              src={form.thumbnail}
              alt="thumbnail"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,.6)",
                color: "#fff",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,.8)",
                },
              }}
            >
              <X size={14} />
            </IconButton>
          </Box>
        ) : (
          <Stack
            spacing={1.5}
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "20px",
                bgcolor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Image size={28} color="#6b7280" />
            </Box>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 1,
                color: "#0f172a",
                mb: 1,
                textAlign: "center",
              }}
            >
              THUMBNAIL
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Upload size={15} />}
              sx={{
                mt: 1,
                textTransform: "none",
                borderRadius: "10px",
              }}
            >
              Choose file
            </Button>
          </Stack>
        )}
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </Paper>
  );
};

export default ThumbnailUpload;