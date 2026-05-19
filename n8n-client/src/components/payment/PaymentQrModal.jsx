import {
  Box,
  Dialog,
  Divider,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Copy, X } from "lucide-react";
import InfoRow from "./InfoRow";

const PaymentQrModal = ({ open, order, checking = false, onClose }) => {
  if (!order) return null;

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ bgcolor: "#0b101b", color: "#fff", p: 3 }}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Box
            onClick={onClose}
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            <X size={18} />
          </Box>
        </Stack>

        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 4,
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "center",
            boxShadow: "0 18px 60px rgba(0,0,0,.35)",
          }}
        >
          <Box
            component="img"
            src={order.qrUrl}
            alt="Payment QR"
            sx={{
              width: 260,
              height: 260,
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 3,
            bgcolor: "#111827",
            border: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <InfoRow label="Bank" value={order.bank.bankName} />
          <InfoRow label="Account name" value={order.bank.accountName} />
          <InfoRow
            label="Account number"
            value={order.bank.accountNumber}
            copy={() => copyText(order.bank.accountNumber)}
          />
          <InfoRow
            label="Amount"
            value={`${order.amount.toLocaleString("vi-VN")} ₫`}
            highlight
          />

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,.12)" }} />

          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "0.08em",
              textAlign: "center",
            }}
          >
            TRANSFER CONTENT
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{
              mt: 1.3,
              p: 1.3,
              borderRadius: 2,
              bgcolor: "rgba(37,99,235,.16)",
              border: "1px solid rgba(96,165,250,.18)",
            }}
          >
            <Typography
              sx={{
                flex: 1,
                fontSize: 18,
                fontWeight: 950,
                letterSpacing: 1.2,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              {order.transferCode}
            </Typography>

            <Box
              onClick={() => copyText(order.transferCode)}
              sx={{
                width: 28,
                height: 28,
                flexShrink: 0,
                borderRadius: 1.5,
                cursor: "pointer",
                bgcolor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "grid",
                placeItems: "center",
                transition: ".2s",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.12)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Copy size={14} color="#cbd5e1" />
            </Box>
          </Stack>

          {checking && (
            <Box
              sx={{
                mt: 2,
                p: 1.4,
                borderRadius: 2,
                bgcolor: "rgba(16,185,129,.12)",
                border: "1px solid rgba(16,185,129,.2)",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress size={15} sx={{ color: "#6ee7b7" }} />

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#6ee7b7",
                    textAlign: "center",
                  }}
                >
                  Checking payment...
                </Typography>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default PaymentQrModal;