
import { Routes, Route } from 'react-router-dom';
import UserManagement from '../pages/admin/user/UserManagement';
import RoleManagement from '../pages/admin/user/RoleManagement';
import PermissionManagement from '../pages/admin/user/PermissionManagement';

const Admin = () => {
  return (
    <Routes>
      <Route path="/user-management/user" element={<UserManagement />} />
      <Route path="/user-management/role" element={<RoleManagement/>} />
      <Route path="/user-management/permission" element={<PermissionManagement/>} />
    </Routes>
  );
};

export default Admin;
