import { toast } from "react-toastify";

export const showSuccess = (message) =>
  toast.success(message, {
    position: "bottom-left",
  });

export const showError = (message) =>
  toast.error(message, {
    position: "bottom-left",
  });

export const showWarning = (message) => {
  toast.warning(message);
}

export const showInfo = (message) => {
  toast.info(message);
};
