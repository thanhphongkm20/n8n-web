import { Box, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { COLORS } from '../../components/common/Colors';
import MPaper from '../../components/common/MPaper';
import RouteBreadcrumbs from '../../components/common/RouteBreadcrumbs';
import StackCol from "../../components/common/StackCol";
import StackRow from '../../components/common/StackRow';
import FormTextField from '../../components/form/FormTextField';
import { ROUTES } from '../../configs/routes';
import { LoadingPage } from '../bases/LoadingPage';

import userApi from '../../api/user.api';
import LANGUAGE from "../../utils/language.util";
import { userUpdateSchema } from '../../validation/user.validation';

const UserUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.byId(id);
        setUserData(res);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      display_name: userData?.display_name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
    validationSchema: userUpdateSchema,
    onSubmit: async (values) => {
      setIsSaving(true);
      try {
        await userApi.update(id, values);
        toast.success("UPDATE SUCCESS");
        setTimeout(() => navigate(ROUTES.USER.LIST), 800);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsSaving(false);
      }
    }
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") event.preventDefault();
  };

  if (isLoading) return <LoadingPage />;

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit}
      onKeyDown={handleKeyPress}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80vh',
        width: '100%',
        py: 5
      }}
    >
      <StackCol
        sx={{
          width: { xs: '95%', sm: '80%', md: '60%', lg: '50%' },
          maxWidth: "1200px",
          gap: 3,
        }}
      >
        {/* Breadcrumbs */}
        <RouteBreadcrumbs />

        <MPaper
          sx={{
            width: '100%',
            borderRadius: 2,
            p: { xs: 3, md: 6 },
            boxShadow: 3
          }}
        >
          <StackCol gap={3}>
            <FormTextField
              id="display_name"
              form={form}
              title={LANGUAGE.USER.DISPLAY_NAME}
              sx={{ mb: 3 }}
            />
            <FormTextField
              id="phone"
              form={form}
              title={LANGUAGE.USER.PHONE}
              sx={{ mb: 3 }}
            />
            <FormTextField
              id="email"
              form={form}
              title={LANGUAGE.USER.EMAIL}
              sx={{ mb: 3 }}
            />

            <StackRow justifyContent="center" sx={{ mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: { xs: '100%', md: 200 },
                  backgroundColor: COLORS.SECONDARY
                }}
                disabled={isSaving}
              >
                {isSaving ? "SAVING..." : LANGUAGE.BUTTON.UPDATE}
              </Button>
            </StackRow>
          </StackCol>
        </MPaper>
      </StackCol>
    </Box>
  );
};

export default UserUpdatePage;
