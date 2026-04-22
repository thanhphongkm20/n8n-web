import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import TopbarAdmin from "../components/navigation/TopbarAdmin";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* --- HEADER --- */}
      <TopbarAdmin />

      {/* Khoảng đệm cho Fixed AppBar */}
      <Toolbar sx={{ height: "80px" }} />

      {/* --- CONTENT area --- */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;