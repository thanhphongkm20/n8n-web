import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../configs/routes.js";

// Layouts
import AppLayout from '../layout/AppLayout';
import MainLayout from '../layout/MainLayout.jsx';
import AuthLayout from '../layout/AuthLayout';
import AdminLayout from '../layout/AdminLayout.jsx';

// Pages
import HomePage from "../pages/HomePage.jsx";
import NotFoundPage from '../pages/bases/NotFoundPage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import UserListPage from "../pages/user/UserListPage.jsx";
import { APP_STATE, ROLES } from "../configs/constants.js";
import Page from "../components/common/Page.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <HomePage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <LoginPage /> },
        ],
      },
      {
        element: <AdminLayout />,
        handle: {
          breadcrumb: {
            label: "HOME",
            path: ROUTES.HOME,
            iconKey: "home"
          }
        },
        children: [
          {
            path: ROUTES.USER.LIST,
            handle: {
              breadcrumb: {
                label: "USER LIST",
                path: ROUTES.USER.LIST,
              },
            },
            children: [
              {
                index: true,
                element: <Page
                  state={APP_STATE.USER}
                  element={<UserListPage />}
                  roles={[ROLES.ADMIN]}
                />,
              },
              // {
              //   path: ROUTES.USER.UPDATE,
              //   element: <Page
              //     state={APP_STATE.USER}
              //     element={<UserUpdatePage />}
              //     roles={[ROLES.ADMIN, ROLES.MANAGER]}
              //   />,
              //   handle: {
              //     breadcrumb: {
              //       label: "USER UPDATE",
              //     },
              //   },
              // },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;