import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MPaper from "../../components/common/MPaper";
import StackCol from "../../components/common/StackCol";
import StackRow from "../../components/common/StackRow";
import FormTextField from "../../components/form/FormTextField";
import TypographyLink from "../../components/common/TypographyLink";
import Logo from "../../components/common/Logo";
import Animate from "../../components/common/Animate";
import { COLORS } from "../../components/common/Colors";
import { ROUTES } from "../../configs/routes";
import userApi from '../../api/user.api';
import { userCreateSchema } from '../../validation/user.validation.js';
import { ArrowLeft } from "lucide-react";
import { IconButton } from "@mui/material";
import FormCreatePassword from "../../components/form/FormCreatePassword.jsx";

const RegisterPage = ({ onSuccess }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirm: "",
    },
    validationSchema: userCreateSchema,
    onSubmit: async (values) => {
      setIsRequesting(true);
      try {
        await userApi.create(values);
        toast.success("Tạo tài khoản thành công!");
        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, 800);
        if (onSuccess) {
          onSuccess();
        }
        form.resetForm();
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsRequesting(false);
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
              onClick={() => navigate(ROUTES.LOGIN)}
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
            <Box component="form" onSubmit={form.handleSubmit}>
              <StackCol gap={0}>
                <StackCol gap={1.2} sx={{ mb: 3 }}>
                  <StackRow justifyContent="center">
                    <Logo />
                  </StackRow>
                  <Typography
                    variant="h5"
                    fontWeight={900}
                    textAlign="center"
                    sx={{ color: "#040c0b", letterSpacing: 1 }}
                  >
                    Register a new account
                  </Typography>
                </StackCol>

                <StackCol>
                  <FormTextField
                    id="full_name"
                    name="full_name"
                    placeholder="Full Name"
                    sx={{ mb: 3 }}
                    required={true}
                    form={form}
                  />
                  <FormTextField
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    sx={{ mb: 3 }}
                    required={true}
                    form={form}
                  />
                  <FormTextField
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    sx={{ mb: 3 }}
                    required={true}
                    form={form}
                  />
                  <StackCol gap={3} sx={{ mb: 3 }}>
                    <FormCreatePassword
                      id="password"
                      name="password"
                      placeholder="Password"
                      required={true}
                      form={form}
                    />
                    <FormCreatePassword
                      id="password_confirm"
                      name="password_confirm"
                      placeholder="Confirm Password"
                      required={true}
                      form={form}
                    />
                  </StackCol>
                </StackCol>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isRequesting}
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
                  {isRequesting ? "REGISTERING..." : "REGISTER"}
                </Button>
              </StackCol>
            </Box>
          </MPaper>
        </Animate>
      </Container>
    </Box>
  );
};

export default RegisterPage;