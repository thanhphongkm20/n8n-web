import { Typography, Button, Box, Paper, IconButton } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import FormLabelField from "../../components/form/FormLabelField";
import { COLORS } from "../../components/common/Colors";
import { ARTICLE_STATUS_OPTIONS } from "../../configs/constants";
import FormSelect from "../../components/form/FormSelect";
import { Image as ImageIcon, X, RefreshCw } from "lucide-react";

const labelStyle = {
  fontSize: 16,
  fontWeight: 600,
  color: COLORS.BLACK,
  mb: 1.5,
  textAlign: "left",
  display: "block",
  whiteSpace: "nowrap",
};

const ArticleSidePanel = ({ formik, imageFile, onImageChange }) => {
  const fileRef = useRef();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleChooseImage = (e) => {
    e.stopPropagation();
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }
    onImageChange(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    fileRef.current.value = "";
    onImageChange(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: "1px solid #f0f0f0",
        background: "#fafafa",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h6" fontWeight={700}>
          GENERAL INFO
        </Typography>

        {/* PRICE */}
        <FormLabelField
          title="PRICE"
          placeholder="500000"
          type="number"
          form={formik}
          id="price"
          sx={{
            "& .MuiTypography-root": labelStyle,
            "& .MuiInputBase-root": { height: 50, borderRadius: 2 },
          }}
        />

        {/* SLUG */}
        <FormLabelField
          title="SLUG"
          placeholder="GENERATE SLUG"
          disabled
          form={formik}
          id="slug"
          sx={{
            "& .MuiTypography-root": labelStyle,
            "& .MuiInputBase-root": { height: 50, borderRadius: 2 },
          }}
        />

        {/* STATUS */}
        <FormSelect
          id="status"
          title="ARTICLE STATUS"
          data={ARTICLE_STATUS_OPTIONS}
          form={formik}
          placeholder="Select Status"
          backgroundColor="#fff"
          sx={{
            "& .MuiStack-root": {
              flexDirection: "column !important",
              alignItems: "flex-start !important",
              gap: "0px !important",
            },
            "& .MuiTypography-root": labelStyle,
            "& .MuiInputBase-root": {
              width: "100%",
              height: 50,
              borderRadius: 2,
            },
          }}
        />

        <Box>
          <Typography sx={labelStyle}>
            PRODUCT IMAGE
          </Typography>

          <Box
            onClick={!imageFile ? handleChooseImage : undefined}
            sx={{
              position: "relative",
              height: 200,
              border: "2px dashed",
              borderColor: imageFile ? "transparent" : "#ddd",
              borderRadius: 4,
              overflow: "hidden",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease",
              cursor: !imageFile ? "pointer" : "default",
              "&:hover": {
                borderColor: COLORS.BLUE,
                "& .overlay": { opacity: 1 }
              },
            }}
          >
            {!imageFile ? (
              <>
                <ImageIcon size={32} color="#999" />
                <Typography sx={{ mt: 1, color: "#999", fontSize: 14 }}>
                  Click to upload image
                </Typography>
              </>
            ) : (
              <>
                {/* Image Preview */}
                <Box
                  component="img"
                  src={preview}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Overlay khi Hover */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <IconButton
                    onClick={handleRemove}
                    sx={{ bgcolor: "#ff4d4f", color: "#fff", "&:hover": { bgcolor: "#ff7875" } }}
                  >
                    <X size={20} />
                  </IconButton>
                </Box>
              </>
            )}
            <input type="file" accept="image/*" hidden ref={fileRef} onChange={handleFileChange} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ArticleSidePanel;