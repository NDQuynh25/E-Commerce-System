
import { Routes, Route } from 'react-router-dom';
import UserManagement from '../pages/admin/user/UserManagement';
import RoleManagement from '../pages/admin/user/RoleManagement';

const Admin = () => {
  return (
    <Routes>
      <Route path="/user-management/user" element={<UserManagement />} />
      <Route path="/user-management/role" element={<RoleManagement/>} />
      <Route path="/user-management/permission" element={<RoleManagement/>} />
    </Routes>
  );
};

export default Admin;
