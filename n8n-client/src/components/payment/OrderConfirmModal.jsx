import {
  Box,
  Button,
  Dialog,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowRight, X } from "lucide-react";

const OrderConfirmModal = ({
  open,
  article,
  loading,
  onClose,
  onConfirm,
}) => {
  if (!article) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ bgcolor: "#0b101b", color: "#fff", p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <X size={20} cursor="pointer" onClick={onClose} />
        </Stack>

        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,.12)",
            bgcolor: "#111827",
          }}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={800}>{article.title}</Typography>
            </Stack>
          </Stack>
        </Box>

        <Typography
          sx={{
            mt: 3,
            mb: 1,
            color: "#fff",
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          DISCOUNT CODE
        </Typography>

        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            placeholder="Enter discount code"
            size="small"
            sx={{
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                bgcolor: "#111827",
                borderRadius: 2,
              },
            }}
          />
          <Button variant="contained" sx={{ borderRadius: 2 }}>
            Apply
          </Button>
        </Stack>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,.12)" }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center" >
          <Typography fontSize={18} fontWeight={800}>
            Total:
          </Typography>
          <Typography fontSize={34} fontWeight={950}>
            {article.price_formatted}
          </Typography>
        </Stack>

        <Button
          fullWidth
          disabled={loading}
          onClick={onConfirm}
          endIcon={<ArrowRight size={18} />}
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 2.5,
            color: "#fff",
            fontWeight: 900,
            textTransform: "none",
            background: "linear-gradient(135deg,#2563eb,#9333ea)",
          }}
        >
          {loading ? "Creating order..." : "Proceed to Payment"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default OrderConfirmModal;