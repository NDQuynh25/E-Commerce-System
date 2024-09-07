import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPage from '../pages/admin/UserManagement';
import RoleManagement from '../pages/admin/RoleManagement';

const Admin = () => {
  return (
    <Routes>
      <Route path="/user" element={<UserPage />} />
      <Route path="/role" element={<RoleManagement/>} />
    </Routes>
  );
};

export default Admin;
