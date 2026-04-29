import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../configs/routes.js";

// Layouts
import AppLayout from '../layout/AppLayout.jsx';
import MainLayout from '../layout/MainLayout.jsx';
import AuthLayout from '../layout/AuthLayout.jsx';
import AdminLayout from '../layout/AdminLayout.jsx';

// Pages
import HomePage from "../pages/HomePage.jsx";
import NotFoundPage from '../pages/bases/NotFoundPage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import UserListPage from "../pages/user/UserListPage.jsx";
import { APP_STATE, ROLES } from "../configs/constants.js";
import Page from "../components/common/Page.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import UserUpdatePage from "../pages/user/UserUpdatePage.jsx";
import ArticleListPage from "../pages/article/ArticleListPage.jsx";
import ArticleCreatePage from "../pages/article/ArticleCreatePage.jsx";
import ArticleUpdatePage from "../pages/article/ArticleUpdatePage.jsx";

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
          { path: ROUTES.REGISTER, element: <RegisterPage /> },
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
              {
                path: ROUTES.USER.DETAIL,
                element: <Page
                  state={APP_STATE.USER}
                  element={<UserUpdatePage />}
                  roles={[ROLES.ADMIN, ROLES.MANAGER]}
                />,
                handle: {
                  breadcrumb: {
                    label: "USER DETAIL",
                  },
                },
              },
            ],
          },
          {
            path: ROUTES.ARTICLE.LIST,
            handle: {
              breadcrumb: {
                label: "ARTICLE LIST",
                path: ROUTES.ARTICLE.LIST,
              },
            },
            children: [
              {
                index: true,
                element: <Page
                  state={APP_STATE.ARTICLE}
                  element={<ArticleListPage />}
                  roles={[ROLES.ADMIN]}
                />,
              },
              {
                path: ROUTES.ARTICLE.CREATE,
                element: <Page
                  state={APP_STATE.ARTICLE}
                  element={<ArticleCreatePage />}
                  roles={[ROLES.ADMIN]}
                />,
                handle: {
                  breadcrumb: {
                    label: "ARTICLE CREATE",
                  },
                },
              },
              {
                path: ROUTES.ARTICLE.UPDATE,
                element: <Page
                  state={APP_STATE.ARTICLE}
                  element={<ArticleUpdatePage />}
                  roles={[ROLES.ADMIN]}
                />,
                handle: {
                  breadcrumb: {
                    label: "ARTICLE UPDATE",
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;