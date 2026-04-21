import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../configs/routes.js";

// Layouts
import AppLayout from '../layout/AppLayout';
import MainLayout from '../layout/Mainlayout.jsx';
// import AuthLayout from './layout/AuthLayout';

// Pages
import HomePage from "../pages/HomePage.jsx";
import NotFoundPage from '../pages/bases/NotFoundPage.jsx';

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
      // {
      //   element: <AuthLayout />,
      //   children: [
      //     { path: ROUTES.LOGIN, element: <LoginPage /> },
      //   ],
      // },
    ],
  },
]);

export default router;