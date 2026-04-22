import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import MPaper from "../../components/common/MPaper";
import StackCol from "../../components/common/StackCol";
import StackRow from "../../components/common/StackRow";
import FormTextField from "../../components/form/FormTextField";
import FormPassword from "../../components/form/FormPassword";
import TypographyLink from "../../components/common/TypographyLink";
import Logo from "../../components/common/Logo";
import Animate from "../../components/common/Animate";
import { COLORS } from "../../components/common/Colors";
import { ROUTES } from "../../configs/routes";
import { roleUtils } from '../../utils/auth.util.js';
import userApi from '../../api/user.api';
import { userLoginSchema } from '../../validation/user.validation.js';
import { setUser } from "../../store/slices/user.slice";
import useLoadingProgress from "../../hooks/useLoadingProgress.js";
import { ArrowLeft } from "lucide-react";
import { IconButton } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const {
    progressStart,
    progressComplete,
    progressReset,
  } = useLoadingProgress();

  const { isAdminOrManager } = roleUtils;

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: async (values) => {
      if (isLoginRequest) return;

      setIsLoginRequest(true);
      progressStart();

      try {
        const response = await userApi.login(values);
        await progressComplete();

        toast.success("Đăng nhập thành công!");

        await new Promise((resolve) => setTimeout(resolve, 250));

        dispatch(
          setUser({
            user: response.user,
            token: response.access_token,
          }),
        );

        const role = response.user.role;
        if (isAdminOrManager(role)) {
          navigate(ROUTES.USER.LIST);
        } else {
          navigate(ROUTES.HOME);
        }
      } catch (error) {
        toast.error(error.message || "Đã có lỗi xảy ra");
        progressReset();
        setIsLoginRequest(false);
      }
    }
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background:
          "radial-gradient(circle at 20% 20%, #0f766e20, transparent 40%), radial-gradient(circle at 80% 80%, #0ea5e920, transparent 40%), #f8fafc",
      }}
    >
      <Container maxWidth="sm">
        <Animate>
          <MPaper
            sx={{
              borderRadius: "20px",
              px: { xs: 3, md: 5 },
              py: 6,
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.9)",
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 50px rgba(15, 118, 110, 0.15), 0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            <IconButton
              onClick={() => navigate(ROUTES.HOME)}
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                color: COLORS.SECONDARY,
                "&:hover": {
                  bgcolor: "rgba(15,118,110,0.15)",
                },
              }}
            >
              <ArrowLeft size={22} />
            </IconButton>
            {/* Dùng component form để bắt sự kiện Enter */}
            <Box component="form" onSubmit={form.handleSubmit}>
              <StackCol gap={0}>
                {/* HEADER */}
                <StackCol gap={1.2} sx={{ mb: 3 }}>
                  <StackRow justifyContent="center">
                    <Logo />
                  </StackRow>
                  <Typography
                    variant="h5"
                    fontWeight={900}
                    textAlign="center"
                    sx={{ color: "#0f766e", letterSpacing: 1 }}
                  >
                    LOGIN TO YOUR ACCOUNT
                  </Typography>
                </StackCol>

                {/* INPUT FIELDS */}
                <StackCol gap={0} sx={{ mb: 3 }}>
                  <FormTextField
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.values.email}
                    onChange={form.handleChange}
                    error={form.touched.email && Boolean(form.errors.email)}
                    helperText={form.touched.email && form.errors.email}
                    sx={{ mb: 3 }}
                  />

                  <Box sx={{ width: '100%' }}>
                    <FormPassword
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={form.values.password}
                      onChange={form.handleChange}
                      error={form.touched.password && Boolean(form.errors.password)}
                      helperText={form.touched.password && form.errors.password}
                      form={form}
                    />

                    <StackRow justifyContent="flex-end" sx={{ mt: 2 }}>
                      <TypographyLink
                        onClick={() => navigate(ROUTES.PASSWORD_FORGOT)}
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography
                          fontWeight="bold"
                          color={COLORS.SECONDARY}
                          sx={{ fontSize: { xs: 13, md: 14 } }}
                        >
                          Forgot password?
                        </Typography>
                      </TypographyLink>
                    </StackRow>
                  </Box>
                </StackCol>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isLoginRequest}
                  sx={{
                    height: 48,
                    bgcolor: "#0f766e",
                    "&:hover": {
                      bgcolor: "#115e59",
                      transform: "translateY(-1px)",
                    },
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: "10px",
                    fontSize: 14.5,
                    boxShadow: "0 10px 20px rgba(15,118,110,0.3)",
                  }}
                >
                  {isLoginRequest ? "LOGGING IN..." : "LOGIN"}
                </Button>
              </StackCol>
            </Box>

            <Typography
              fontSize={14}
              textAlign="center"
              color="text.secondary"
              sx={{ mt: 4 }}
            >
              Don't have an account?{" "}
              <TypographyLink to="/register">
                Sign up for free
              </TypographyLink>
            </Typography>
          </MPaper>
        </Animate>
      </Container>
    </Box>
  );
};

export default LoginPage;