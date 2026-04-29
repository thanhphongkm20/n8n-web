import { toast } from "react-toastify";

// success
export const showSuccess = (message) =>
  toast.success(message, {
    position: "bottom-left",
  });

export const showError = (message) =>
  toast.error(message, {
    position: "bottom-left",
  });

// optional: warning
export const showWarning = (message) => {
  toast.warning(message);
}

// optional: info
export const showInfo = (message) => {
  toast.info(message);
};
