// user.routes.tsx
import { RouteObject } from "react-router-dom";
import CartPage from "../pages/user/CartPage";
import CheckoutPage from "../pages/user/CheckoutPage";

export const userRoutes: RouteObject[] = [
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
];
