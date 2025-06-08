import { Routes, Route } from "react-router-dom";
import UserManagement from "../pages/admin/UserManagement";
import RoleManagement from "../pages/admin/RoleManagement";

import CategoryManagement from "../pages/admin/CategoryManagement";
import CategoryForm from "../components/admin/product/CategoryForm";
import ProductManagement from "../pages/admin/ProductManagement";
import ProductForm from "../components/admin/product/ProductForm";

const Admin = () => {
  return (
    <Routes>
      <Route path="/user-management/users" element={<UserManagement />} />
      <Route path="/user-management/roles" element={<RoleManagement />} />

      <Route path="/categories" element={<CategoryManagement />} />
      <Route
        path="/categories/create"
        element={<CategoryForm isEdit={false} />}
      />
      <Route path="/categories/:id" element={<CategoryForm isEdit={true} />} />

      <Route path="products" element={<ProductManagement />} />
      <Route path="products/create" element={<ProductForm isEdit={false} />} />
      <Route path="products/:id" element={<ProductForm isEdit={true} />} />

      {/* <Route path='*' element={<PermissionManagement />} /> */}
    </Routes>
  );
};

export default Admin;
