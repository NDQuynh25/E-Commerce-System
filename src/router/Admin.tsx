
import { Routes, Route } from 'react-router-dom';
import UserManagement from '../pages/admin/user/UserManagement';
import RoleManagement from '../pages/admin/user/RoleManagement';
import PermissionManagement from '../pages/admin/user/PermissionManagement';
import ProductForm from '../components/admin/product/ProductForm';
import CategoryManagement from '../pages/admin/product/CategoryMangement';
import CategoryForm from '../components/admin/product/CategoryForm';


const Admin = () => {
  return (
    <Routes>
      <Route path="/user-management/users" element={<UserManagement />} />
      <Route path="/user-management/roles" element={<RoleManagement/>} />
      <Route path="/user-management/permissions" element={<PermissionManagement/>} />
      <Route path="/product-management/new-product" element={<ProductForm />} />
      <Route path="/categories" element={<CategoryManagement />} />
      <Route path="/categories/create" element={<CategoryForm />} />
      <Route path='/categories/:id' element={<CategoryForm />} />

    </Routes>
  );
};

export default Admin;
