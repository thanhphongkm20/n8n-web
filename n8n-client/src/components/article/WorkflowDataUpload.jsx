import { Button, Stack, Typography, Box, IconButton, Chip } from "@mui/material";
import { useRef } from "react";
import { COLORS } from "../../components/common/Colors";
import { UploadCloud, FileJson, X } from "lucide-react";

const WorkflowDataUpload = ({ value, onChange }) => {
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".json")) {
      alert("Please upload a .json file");
      return;
    }
    onChange(file);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    fileRef.current.value = "";
    onChange(null);
  };

  return (
    <Stack gap={1} sx={{ mt: 3 }}>
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: "#1a1a1a",
          mb: 0.5,
        }}
      >
        UPLOAD WORKFLOW
      </Typography>

      <Box
        onClick={!value ? handleClick : undefined}
        sx={{
          border: "2px dashed",
          borderColor: value ? COLORS.BLUE : "#ddd",
          borderRadius: 3,
          p: 4,
          background: value ? "#f0f7ff" : "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: !value ? "pointer" : "default",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: COLORS.BLUE,
            background: "#f9fbff",
          },
        }}
      >
        {!value ? (
          <>
            <UploadCloud size={32} color={COLORS.BLUE} style={{ marginBottom: 12 }} />
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 4,
                py: 1,
                fontWeight: 600,
                background: COLORS.BLUE,
                boxShadow: "none",
                "&:hover": { boxShadow: "none", background: COLORS.BLUE },
              }}
            >
              Choose .json File
            </Button>
          </>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <FileJson size={20} color={COLORS.BLUE} />
              <Typography
                sx={{
                  mx: 1.5,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#333",
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {value.name}
              </Typography>
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{
                  color: "#ff4d4f",
                  "&:hover": { background: "#fff1f0" }
                }}
              >
                <X size={18} />
              </IconButton>
            </Box>
          </Stack>
        )}

        {/* Hidden Input */}
        <input
          type="file"
          accept=".json"
          hidden
          ref={fileRef}
          onChange={handleFileChange}
        />
      </Box>
    </Stack>
  );
};

export default WorkflowDataUpload;