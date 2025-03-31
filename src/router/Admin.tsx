
import { Routes, Route } from 'react-router-dom';
import UserManagement from '../pages/admin/user/UserManagement';
import RoleManagement from '../pages/admin/user/RoleManagement';
import PermissionManagement from '../pages/admin/user/PermissionManagement';

import CategoryManagement from '../pages/admin/product/CategoryManagement';
import CategoryForm from '../components/admin/product/CategoryForm';
import ProductManagement from '../pages/admin/product/ProductManagement';
import ProductForm from '../components/admin/product/ProductForm';

const Admin = () => {
  return (
    <Routes>
      <Route path="/user-management/users" element={<UserManagement />} />
      <Route path="/user-management/roles" element={<RoleManagement/>} />
     
      <Route path="/categories" element={<CategoryManagement />} />
      <Route path="/categories/create" element={<CategoryForm isEdit={false}/>} />
      <Route path='/categories/:id' element={<CategoryForm isEdit={true} />} />

      <Route path='products' element={<ProductManagement />} />
      <Route path='products/create' element={<ProductForm /> } />
      <Route path='products/:id' element={<ProductForm />} />

      {/* <Route path='*' element={<PermissionManagement />} /> */}
    </Routes>
  );
};

export default Admin;
