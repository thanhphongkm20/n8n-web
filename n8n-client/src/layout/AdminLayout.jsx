import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import TopbarAdmin from "../components/navigation/TopbarAdmin";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <TopbarAdmin />

      <Toolbar sx={{ height: "80px" }} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;