import { Box, Toolbar, Skeleton, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import Topbar from "../components/navigation/Topbar";
import Footer from "../components/navigation/Footer";

import userApi from "../api/user.api";
import { setUser } from "../store/slices/user.slice";

const PageLoadingSkeleton = () => {
  return (
    <Box sx={{ minHeight: "calc(100vh - 72px)", bgcolor: "#f8fafc" }}>
      <Box
        sx={{
          height: 360,
          bgcolor: "#111827",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2.5} alignItems="center">
            <Skeleton
              variant="text"
              width={520}
              height={72}
              sx={{ bgcolor: "rgba(255,255,255,0.12)" }}
            />
            <Skeleton
              variant="text"
              width={380}
              height={34}
              sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Skeleton
                variant="rounded"
                width={170}
                height={52}
                sx={{
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.14)",
                }}
              />
              <Skeleton
                variant="rounded"
                width={170}
                height={52}
                sx={{
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.1)",
                }}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 7 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Skeleton variant="text" width={220} height={42} />
          <Skeleton
            variant="rounded"
            width={240}
            height={44}
            sx={{ borderRadius: 999 }}
          />
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                bgcolor: "#fff",
                borderRadius: 4,
                border: "1px solid #e5e7eb",
              }}
            >
              <Skeleton
                variant="rounded"
                height={170}
                sx={{ borderRadius: 3, mb: 2 }}
              />
              <Skeleton variant="text" width="85%" height={34} />
              <Skeleton variant="text" width="100%" height={22} />
              <Skeleton variant="text" width="75%" height={22} />

              <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                <Skeleton
                  variant="rounded"
                  width="50%"
                  height={38}
                  sx={{ borderRadius: 2 }}
                />
                <Skeleton
                  variant="rounded"
                  width="50%"
                  height={38}
                  sx={{ borderRadius: 2 }}
                />
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

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

        dispatch(
          setUser({
            user: res.user,
            token,
          })
        );
      } catch {
        localStorage.removeItem("access_token");
        dispatch(setUser(null));
      } finally {
        setIsVerifying(false);
      }
    };

    initAuth();
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Topbar authReady={!isVerifying} />

      <Toolbar
        sx={{
          minHeight: "72px !important",
          height: "72px",
          flexShrink: 0,
        }}
      />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {isVerifying ? <PageLoadingSkeleton /> : <Outlet />}
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;