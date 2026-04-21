import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { themeConfigs } from "./configs/theme";
import router from "./routers";

import "./App.css";

const App = () => (
  <ThemeProvider theme={themeConfigs}>
    {/* Toast Notifications */}
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
    />
    {/* MUI CSS Reset */}
    <CssBaseline />
    {/* Application Router */}
    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
