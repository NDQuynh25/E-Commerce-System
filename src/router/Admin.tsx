
import { Routes, Route } from 'react-router-dom';
import UserManagement from '../pages/admin/user/UserManagement';
import RoleManagement from '../pages/admin/user/RoleManagement';
import PermissionManagement from '../pages/admin/user/PermissionManagement';
import AddProduct from '../components/admin/product/AddProduct';


const Admin = () => {
  return (
    <Routes>
      <Route path="/user-management/users" element={<UserManagement />} />
      <Route path="/user-management/roles" element={<RoleManagement/>} />
      <Route path="/user-management/permissions" element={<PermissionManagement/>} />
      <Route path="/product-management/new-product" element={<AddProduct />} />
    </Routes>
  );
};

export default Admin;
