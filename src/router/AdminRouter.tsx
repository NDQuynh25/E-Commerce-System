import { RouteObject } from "react-router-dom";
import UserManagement from "../pages/admin/UserManagement";
import RoleManagement from "../pages/admin/RoleManagement";
import CategoryManagement from "../pages/admin/CategoryManagement";
import CategoryForm from "../components/admin/product/CategoryForm";
import ProductManagement from "../pages/admin/ProductManagement";
import ProductForm from "../components/admin/product/ProductForm";

export const adminRoutes: RouteObject[] = [
  {
    path: "user-management/users",
    element: <UserManagement />,
  },
  {
    path: "user-management/roles",
    element: <RoleManagement />,
  },
  {
    path: "categories",
    element: <CategoryManagement />,
  },
  {
    path: "categories/create",
    element: <CategoryForm isEdit={false} />,
  },
  {
    path: "categories/:id",
    element: <CategoryForm isEdit={true} />,
  },
  {
    path: "products",
    element: <ProductManagement />,
  },
  {
    path: "products/create",
    element: <ProductForm isEdit={false} />,
  },
  {
    path: "products/:id",
    element: <ProductForm isEdit={true} />,
  },
];
