import { RouteObject } from "react-router-dom";
import HomePage from "../pages/user/HomePage";
import ProductPage from "../pages/user/ProductPage";
import LoginPage from "../pages/auth/LoginPage";
import LoginAdminPage from "../pages/auth/LoginAdminPage";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin/login",
    element: <LoginAdminPage />,
  },
];
