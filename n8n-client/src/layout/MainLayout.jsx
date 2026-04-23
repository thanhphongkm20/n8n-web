import { Box, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import Topbar from "../components/navigation/Topbar";
import Footer from "../components/navigation/Footer";

import userApi from "../api/user.api";
import { setUser } from "../store/slices/user.slice";
import { LoadingPage } from "../pages/bases/LoadingPage";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        dispatch(setUser(null));
        setIsVerifying(false);
        return;
      }

      try {
        const res = await userApi.verifyToken();
        dispatch(setUser({ user: res.user, token }));
      } catch {
        localStorage.removeItem("access_token");
        dispatch(setUser(null));
      } finally {
        setIsVerifying(false);
      }
    };

    initAuth();
  }, [dispatch]);

  if (isVerifying) return <LoadingPage />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Topbar />
      <Toolbar sx={{ height: "70px" }} />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;