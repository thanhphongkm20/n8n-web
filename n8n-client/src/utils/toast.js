import { toast } from "react-toastify";

// success
export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

// error
export const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

// optional: warning
export const showWarning = (message) => {
  toast.warning(message);
};

// optional: info
export const showInfo = (message) => {
  toast.info(message);
};