
import React from 'react';
import { Navigate } from 'react-router-dom';
import {role} from '../../utils/constant';
import { useAppSelector } from '../../redux/hooks';

interface SellRouteProps {
    children: React.ReactNode;
}

const SellRoute: React.FC<SellRouteProps> = ({ children }) => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const userRole = useAppSelector(state => state.auth.user.role.name);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" />;
    }

    if (userRole !== role.VENDOR) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
};

export default SellRoute;
