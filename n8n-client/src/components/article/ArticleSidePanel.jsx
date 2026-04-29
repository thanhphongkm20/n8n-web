import { Typography, Box, Paper, IconButton } from "@mui/material";
import { useRef, useMemo, useEffect } from "react";
import FormLabelField from "../../components/form/FormLabelField";
import { COLORS } from "../../components/common/Colors";
import { ARTICLE_STATUS_OPTIONS } from "../../configs/constants";
import FormSelect from "../../components/form/FormSelect";
import { Image as ImageIcon, X } from "lucide-react";

const labelStyle = {
  fontSize: 16,
  fontWeight: 600,
  color: COLORS.BLACK,
  mb: 1.5,
  textAlign: "left",
  display: "block",
  whiteSpace: "nowrap",
};

const ArticleSidePanel = ({
  formik,
  imageFile,
  oldImageUrl,
  setOldImageUrl,
  onImageChange,
}) => {
  const fileRef = useRef();

  const preview = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return oldImageUrl || null;
  }, [imageFile, oldImageUrl]);

  useEffect(() => {
    return () => {
      if (imageFile && preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, imageFile]);

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
    setOldImageUrl?.("");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: "1px solid #f0f0f0",
        background: "#fafafa",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h6" fontWeight={700}>
          GENERAL INFO
        </Typography>
        <FormLabelField
          title="PRICE"
          type="number"
          form={formik}
          id="price"
          sx={{
            "& .MuiTypography-root": labelStyle,
            "& .MuiInputBase-root": { height: 50, borderRadius: 2 },
          }}
        />
        <FormLabelField
          title="SLUG"
          disabled
          form={formik}
          id="slug"
          sx={{
            "& .MuiTypography-root": labelStyle,
            "& .MuiInputBase-root": { height: 50, borderRadius: 2 },
          }}
        />
        <FormSelect
          id="status"
          title="ARTICLE STATUS"
          data={ARTICLE_STATUS_OPTIONS}
          form={formik}
          placeholder="Select Status"
          backgroundColor="#fff"
        />
        <Box>
          <Typography sx={labelStyle}>PRODUCT IMAGE</Typography>
          <Box
            onClick={handleChooseImage}
            sx={{
              position: "relative",
              height: 200,
              border: "2px dashed",
              borderColor: preview ? "transparent" : "#ddd",
              borderRadius: 4,
              overflow: "hidden",
              background: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: !preview ? "pointer" : "default",
              "&:hover .overlay": { opacity: 1 },
            }}
          >
            {!preview ? (
              <>
                <ImageIcon size={32} color="#999" />
                <Typography sx={{ mt: 1, color: "#999", fontSize: 14 }}>
                  Click to upload image
                </Typography>
              </>
            ) : (
              <>
                <Box
                  component="img"
                  src={preview}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "0.2s",
                  }}
                >
                  <IconButton
                    onClick={handleRemove}
                    sx={{
                      bgcolor: "#ff4d4f",
                      color: "#fff",
                    }}
                  >
                    <X size={20} />
                  </IconButton>
                </Box>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileRef}
              onChange={handleFileChange}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ArticleSidePanel;