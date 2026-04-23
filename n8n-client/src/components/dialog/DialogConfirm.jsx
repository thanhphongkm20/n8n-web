import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { BG_COLORS, COLORS, COLORS_BTN } from "../common/Colors";
import LANGUAGE from "../../utils/language.util";

const DialogConfirm = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  loading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      disableRestoreFocus
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{ p: 3, pb: 1, fontWeight: "bold", fontSize: 20 }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ p: 3, py: 1 }}>
        <DialogContentText
          id="confirm-dialog-description"
          sx={{ fontSize: 18 }}
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{ px: 3 }}
        >
          {cancelText ?? LANGUAGE.BUTTON.CANCEL}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
          loading={loading}
          sx={{
            px: 3,
            bgcolor: COLORS_BTN.DELETE,
            color: COLORS.WHITE,
            '&:hover': {
              bgcolor: BG_COLORS.DELETE,
            },
            boxShadow: 'none',
          }}
        >
          {confirmText ?? LANGUAGE.BUTTON.CONFIRM}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
