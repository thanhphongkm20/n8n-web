import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  InputAdornment,
  Chip,
  Paper,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";

import {
  Eye,
  EyeOff,
  CircleCheckBig,
  Upload,
  User,
  Phone,
  Mail,
  LockKeyhole,
  Check,
} from "lucide-react";

import userApi from "../../api/user.api";
import FormLabelField from "../../components/form/FormLabelField";

const AccountSettings = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
  });

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const initials = form.fullname
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const showMessage = (message, severity = "success") => {
    const options = {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };

    if (severity === "error") {
      toast.error(message, options);
      return;
    }

    if (severity === "warning") {
      toast.warning(message, options);
      return;
    }

    toast.success(message, options);
  };

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        const res = await userApi.getProfile();
        if (!mounted) return;

        const user = res;

        const fullname =
          user?.full_name ||
          `${user?.first_name} ${user?.last_name}`.trim();

        setForm((prev) => ({
          ...prev,
          fullname,
          email: user?.email,
          phone: user?.phone,
        }));
      } catch (error) {
        console.error(error);
        showMessage("Unable to load user information", "error");
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async () => {
    try {
      if (form.newPassword && form.newPassword.length < 8) {
        showMessage(
          "New password must be at least 8 characters long",
          "warning"
        );
        return;
      }

      if (form.newPassword && !form.currentPassword) {
        showMessage("Please enter your current password", "warning");
        return;
      }

      setLoading(true);

      await userApi.updateProfile({
        full_name: form.fullname,
        display_name: form.fullname,
        phone: form.phone,
        email: form.email,
      });

      if (form.currentPassword && form.newPassword) {
        await userApi.changePassword({
          old_password: form.currentPassword,
          new_password: form.newPassword,
          new_password_repeat: form.newPassword,
        });
      }

      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));

      showMessage("Profile updated successfully", "success");
    } catch (error) {
      console.error(error);

      showMessage(
        error?.response?.data?.message || "Failed to update profile",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f6f8fc",
        py: { xs: 3, md: 5 },
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 720,
          mx: "auto",
          width: "100%",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            position: "relative",
            mb: 3.5,
            width: "100%",
            height: 64,
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#dbeafe",
              color: "#1d4ed8",
              fontSize: 23,
              fontWeight: 900,
            }}
          >
            {initials}
          </Avatar>
          <Button
            variant="outlined"
            startIcon={<Upload size={15} />}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              height: 40,
              px: 2.4,
              borderRadius: "11px",
              textTransform: "none",
              fontWeight: 800,
              fontSize: 13.5,
              color: "#111827",
              borderColor: "#d4dae3",
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#f8fafc",
                borderColor: "#94a3b8",
              },
            }}
          >
            Change Image
          </Button>
        </Box>
        {/* PERSONAL */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3.2 },
            mb: 2.5,
            borderRadius: "18px",
            border: "1px solid #dbe1e8",
            bgcolor: "#fff",
          }}
        >
          <Typography
            sx={{
              mb: 3,
              textAlign: "center",
              fontSize: 17,
              fontWeight: 900,
              letterSpacing: 0.4,
              color: "#111827",
            }}
          >
            PERSONAL INFORMATION
          </Typography>

          <Stack spacing={2.5}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2.2}
            >
              <Box sx={{ flex: 1 }}>
                <FormLabelField
                  id="fullname"
                  title="Full Name"
                  titleIcon={<User size={15} />}
                  value={form.fullname}
                  onChange={handleChange("fullname")}
                  placeholder="Enter full name"
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <FormLabelField
                  id="phone"
                  title="Phone Number"
                  titleIcon={<Phone size={15} />}
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="Enter phone number"
                />
              </Box>
            </Stack>

            <Box>
              <FormLabelField
                id="email"
                title="Gmail"
                titleIcon={<Mail size={15} />}
                value={form.email}
                onChange={handleChange("email")}
                placeholder="Enter email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Chip
                        icon={<CircleCheckBig size={13} />}
                        label="Verified"
                        size="small"
                        sx={{
                          height: 23,
                          borderRadius: "999px",
                          bgcolor: "#e7f6df",
                          color: "#3f7d20",
                          fontSize: 11,
                          fontWeight: 900,
                          "& .MuiChip-icon": {
                            ml: "6px",
                            color: "#3f7d20",
                          },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Stack>
        </Paper>
        {/* SECURITY */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3.2 },
            mb: 3,
            borderRadius: "18px",
            border: "1px solid #dbe1e8",
            bgcolor: "#fff",
          }}
        >
          <Typography
            sx={{
              mb: 3,
              textAlign: "center",
              fontSize: 17,
              fontWeight: 900,
              letterSpacing: 0.4,
              color: "#111827",
            }}
          >
            SECURITY
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2.2}
          >
            <Box sx={{ flex: 1 }}>
              <FormLabelField
                id="currentPassword"
                title="Current Password"
                titleIcon={<LockKeyhole size={15} />}
                placeholder="Enter current password"
                type={showCurrentPass ? "text" : "password"}
                value={form.currentPassword}
                onChange={handleChange("currentPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() =>
                          setShowCurrentPass((prev) => !prev)
                        }
                        sx={{
                          color: "#6b7280",
                        }}
                      >
                        {showCurrentPass ? (
                          <EyeOff size={18} strokeWidth={2.4} />
                        ) : (
                          <Eye size={18} strokeWidth={2.4} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <FormLabelField
                id="newPassword"
                title="New Password"
                titleIcon={<LockKeyhole size={15} />}
                placeholder="At least 8 characters"
                type={showNewPass ? "text" : "password"}
                value={form.newPassword}
                onChange={handleChange("newPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() =>
                          setShowNewPass((prev) => !prev)
                        }
                        sx={{
                          color: "#6b7280",
                        }}
                      >
                        {showNewPass ? (
                          <EyeOff size={18} strokeWidth={2.4} />
                        ) : (
                          <Eye size={18} strokeWidth={2.4} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Stack>
        </Paper>

        {/* ACTIONS */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={loading}
            sx={{
              height: 42,
              px: 3,
              minWidth: 150,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 800,
              fontSize: 14,
              whiteSpace: "nowrap",
              color: "#374151",
              borderColor: "#d5dbe4",
              bgcolor: "#fff",

              "&:hover": {
                bgcolor: "#f9fafb",
                borderColor: "#9ca3af",
              },
            }}
          >
            Cancel Changes
          </Button>

          <Button
            variant="contained"
            startIcon={<Check size={16} />}
            onClick={handleSave}
            disabled={loading}
            sx={{
              height: 42,
              px: 3,
              minWidth: 170,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 900,
              fontSize: 14,
              bgcolor: "#009F8F",
              color: "#fff",
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#00897B",
                boxShadow: "none",
              },

              "& .MuiButton-startIcon": {
                color: "#fff",
              },

              "&.Mui-disabled": {
                bgcolor: "#d1d5db",
                color: "#9ca3af",
              },
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountSettings;