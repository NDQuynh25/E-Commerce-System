// src/components/Admin.tsx
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Đảm bảo định nghĩa RootState trong store
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Admin = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Fragment>
        {/* {isAuthenticated && <NavBarManagement />} */}
        <div className='admin-container'>
            <div className="admin-list">
            <Router>
                <Routes>
                   
                </Routes>
            </Router>
            </div>
        </div>
    </Fragment>
  );
};

export default Admin;
