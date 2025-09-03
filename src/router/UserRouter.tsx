// user.routes.tsx
import { RouteObject } from "react-router-dom";
import CartPage from "../pages/user/CartPage";
import CheckoutPage from "../pages/user/CheckoutPage";
import LayoutAccount from "../components/layout/LayoutAccount";
import UserInfPage from "../pages/user/UserInfPage";

const accountRoutes: RouteObject[] = [
  {
    path: "information",
    element: <UserInfPage />,
  },
  // {
  //   path: "orders",
  //   element: <OrderPage />,
  // },
];

export const userRoutes: RouteObject[] = [
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/user/account",
    element: <LayoutAccount></LayoutAccount>,
    children: accountRoutes,
  },
];
