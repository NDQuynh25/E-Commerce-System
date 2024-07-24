
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {role} from '../utils/constant';

interface SellRouteProps {
    children: React.ReactNode;
}

const SellRoute: React.FC<SellRouteProps> = ({ children }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" />;
    }

    if (userRole !== role.VENDOR) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
};

export default SellRoute;
