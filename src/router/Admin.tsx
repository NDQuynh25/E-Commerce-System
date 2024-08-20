import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPage from '../pages/admin/UserManagement';

const Admin = () => {
  return (
    <Routes>
      <Route path="/users" element={<UserPage />} />
    </Routes>
  );
};

export default Admin;
