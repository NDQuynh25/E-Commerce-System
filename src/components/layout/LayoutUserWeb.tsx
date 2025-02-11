
import React from 'react';
import { Navigate } from 'react-router-dom';
import {role} from '../../utils/constant';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import TopBar from '../home/TopBar';
import HeaderClient from '../home/HeaderClient';
import BreadCurmb from '../home/BreadCurmb';
import Footer from '../home/Footer';
import '../../styles/layout.user-web.css'

interface LayoutUserWebProps {
    children: React.ReactNode;
}

const LayoutUserWeb: React.FC<LayoutUserWebProps> = ({ children }) => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const userRole = useAppSelector(state => state.auth.user.role.roleName);

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" />;
    // }

    // if (userRole !== role.USER && userRole !== role.ADMIN) {
    //     return <Navigate to="/unauthorized" />;
    // }
    const pathNameCurrent = useLocation().pathname;

    return (
        
            <div 
                className='layout-user-web' 
                style={{
                    width: '100%', 
                    minHeight: '100vh',
                    height: '100%', 
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'column',
                    justifyContent: "space-between", 
                    backgroundColor: '#f3f3f3'
                }}
            >
                <div>
                    <div className='layout-user-web__top-bar'>
                        <TopBar />
                    </div>
                    
                    <div className='layout-user-web__header'>
                        <HeaderClient />
                    </div>
                    {pathNameCurrent === '/' ? null : (
                        <div className='layout-user-web__breadcrumb'>
                            <BreadCurmb />
                        </div>
                    )}
                </div>
                <div className='layout-user-web__content'>
                    {children}
                </div>
                <div className='layout-user-web__footer'>
                    <Footer />
                </div>
            </div>
        
    );
};

export default LayoutUserWeb;
