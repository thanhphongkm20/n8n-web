import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/navigation/Topbar";
import Footer from "../components/navigation/Footer";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* --- HEADER --- */}
      <Topbar />

      {/* Khoảng đệm cho Fixed AppBar */}
      <Toolbar sx={{ height: "70px" }} />

      {/* --- CONTENT area --- */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* --- FOOTER --- */}
      <Footer />
    </Box>
  );
};

export default MainLayout;