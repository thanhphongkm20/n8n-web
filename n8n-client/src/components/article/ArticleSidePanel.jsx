import { Image as ImageIcon, X } from "lucide-react";
import { Typography, Box, Paper, IconButton } from "@mui/material";
import { useRef, useMemo, useEffect } from "react";

import { ARTICLE_STATUS_OPTIONS, labelStyle } from "../../configs/constants";
import { COLORS } from "../../components/common/Colors";
import FormLabelField from "../../components/form/FormLabelField";
import FormSelect from "../../components/form/FormSelect";

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
    return oldImageUrl;
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
          placeholder="PRICE"
          form={formik}
          id="price"
          sx={{
            "& .MuiTypography-root": labelStyle,
            "& .MuiInputBase-root": { height: 50, borderRadius: 2 },
          }}
        />
        <FormLabelField
          title="DISCOUNT %"
          type="number"
          placeholder="20"
          form={formik}
          id="discount"
          sx={{
            "& .MuiTypography-root": labelStyle,
            "& .MuiInputBase-root": { height: 50, borderRadius: 2 },
          }}
        />
        <Box
          sx={{
            mt: 2.5,
            p: 2.4,
            borderRadius: "22px",
            background:
              "linear-gradient(135deg, #0f766e 0%, #14b8a6 48%, #38bdf8 100%)",
            boxShadow: "0 18px 42px rgba(20,184,166,0.28)",
            border: "1px solid rgba(255,255,255,0.45)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.32), transparent 28%)",
              pointerEvents: "none",
            }}
          />

          <Typography
            sx={{
              position: "relative",
              color: "rgba(255,255,255,0.78)",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            Final Price
          </Typography>

          <Typography
            sx={{
              position: "relative",
              mt: 0.6,
              color: "#fff",
              fontWeight: 950,
              fontSize: 38,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              textShadow: "0 10px 28px rgba(0,0,0,0.18)",
            }}
          >
            $
            {(
              Number(formik.values.price || 0) -
              (Number(formik.values.price || 0) *
                Number(formik.values.discount || 0)) /
              100
            ).toFixed(2)}
          </Typography>

          {Number(formik.values.discount || 0) > 0 && (
            <Box
              sx={{
                position: "relative",
                mt: 1.4,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                px: 1.6,
                py: 0.55,
                borderRadius: 999,
                bgcolor: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 0.5,
                }}
              >
                {formik.values.discount}% OFF
              </Typography>
            </Box>
          )}
        </Box>
        <FormLabelField
          title="NODE COUNT"
          type="number"
          placeholder="0"
          form={formik}
          id="node_count"
          sx={{
            "& .MuiTypography-root": labelStyle,
            "& .MuiInputBase-root": { height: 50, borderRadius: 2 },
          }}
        />
        <FormLabelField
          title="SLUG"
          disabled
          placeholder="GENERATE SLUG"
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
                  }} s
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
    </Paper >
  );
};

export default ArticleSidePanel;