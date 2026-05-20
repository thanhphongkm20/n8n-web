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
import CustomBuiltPage from "../pages/customBuilt/CustomBuiltPage.jsx";
import ResourcePage from "../pages/resource/ResourcePage.jsx";
import BlogPage from "../pages/blog/BlogPage.jsx";
import ResourceListPage from "../pages/resource/ResourceListPage.jsx";
import ResourceCreatePage from "../pages/resource/ResourceCreatePage.jsx";
import ResourceUpdatePage from "../pages/resource/ResourceUpdatePage.jsx";
import BlogListPage from "../pages/blog/BlogListPage.jsx";
import BlogCreatePage from "../pages/blog/BlogCreatePage.jsx";
import BlogUpdatePage from "../pages/blog/BlogUpdatePage.jsx";
import ArticleDetailPage from "../pages/article/ArticleDetailPage.jsx";
import BlogDetailPage from "../pages/blog/BlogDetailPage.jsx";

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
          {
            path: ROUTES.CUSTOM_BUILT,
            element: <CustomBuiltPage />,
          },
          {
            path: ROUTES.RESOURCES,
            element: <ResourcePage />,
          },
          {
            path: ROUTES.BLOG,
            element: <BlogPage />,
          },
          {
            path: ROUTES.ARTICLE.DETAIL,
            element: <ArticleDetailPage />,
          },
          {
            path: ROUTES.BLOG_ADMIN.DETAIL,
            element: <BlogDetailPage />,
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
          {
            path: ROUTES.RESOURCE.LIST,
            handle: {
              breadcrumb: {
                label: "RESOURCE LIST",
                path: ROUTES.RESOURCE.LIST,
              },
            },
            children: [
              {
                index: true,
                element: (
                  <Page
                    state={APP_STATE.RESOURCES}
                    element={<ResourceListPage />}
                    roles={[ROLES.ADMIN]}
                  />
                ),
              },
              {
                path: ROUTES.RESOURCE.CREATE,
                element: (
                  <Page
                    state={APP_STATE.RESOURCES}
                    element={<ResourceCreatePage />}
                    roles={[ROLES.ADMIN]}
                  />
                ),
                handle: {
                  breadcrumb: {
                    label: "RESOURCE CREATE",
                  },
                },
              },
              {
                path: ROUTES.RESOURCE.UPDATE,
                element: (
                  <Page
                    state={APP_STATE.RESOURCES}
                    element={<ResourceUpdatePage />}
                    roles={[ROLES.ADMIN]}
                  />
                ),
                handle: {
                  breadcrumb: {
                    label: "RESOURCE UPDATE",
                  },
                },
              },
            ],
          },
          {
            path: ROUTES.BLOG_ADMIN.LIST,
            handle: {
              breadcrumb: {
                label: "BLOG LIST",
                path: ROUTES.BLOG_ADMIN.LIST,
              },
            },
            children: [
              {
                index: true,
                element: (
                  <Page
                    state={APP_STATE.BLOG}
                    element={<BlogListPage />}
                    roles={[ROLES.ADMIN]}
                  />
                ),
              },
              {
                path: ROUTES.BLOG_ADMIN.CREATE,
                element: (
                  <Page
                    state={APP_STATE.BLOG}
                    element={<BlogCreatePage />}
                    roles={[ROLES.ADMIN]}
                  />
                ),
                handle: {
                  breadcrumb: {
                    label: "BLOG CREATE",
                  },
                },
              },
              {
                path: ROUTES.BLOG_ADMIN.UPDATE,
                element: (
                  <Page
                    state={APP_STATE.BLOG}
                    element={<BlogUpdatePage />}
                    roles={[ROLES.ADMIN]}
                  />
                ),
                handle: {
                  breadcrumb: {
                    label: "BLOG UPDATE",
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