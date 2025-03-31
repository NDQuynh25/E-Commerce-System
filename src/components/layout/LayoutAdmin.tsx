import React, { useState, useEffect } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    ApiOutlined,
    UserOutlined,
    BankOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AliwangwangOutlined,
    BugOutlined,
    ScheduleOutlined,

} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar, Button, Drawer, Spin } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { callLogout } from '../../api/authApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import type { MenuProps } from 'antd';
import { setLogoutAction } from '../../redux/slices/authSlice';
// import { setLogoutAction } from '@/redux/slice/accountSlide';
// import { ALL_PERMISSIONS } from '@/config/permissions';
import { Footer } from 'antd/es/layout/layout';
import { HeartTwoTone } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

import '../../styles/layout.admin.css';
import styled from 'styled-components';
import { Flex } from 'antd/lib';



interface IProps {
    children: React.ReactNode
}



const { Content, Sider } = Layout;

const LayoutAdmin = (props: IProps) => {
    const location = useLocation();

    const loading = useAppSelector(state => state.global.loading);

    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const user = useAppSelector(state => state.auth.user);

    const permissions = useAppSelector(state => state.auth.user.role.permissions);
    const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        const ACL_ENABLE = import.meta.env.VITE_ACL_ENABLE;
        if (permissions?.length || ACL_ENABLE === 'false') {

            // const viewCompany = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.method
            // )

            // const viewUser = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.USERS.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
            // )

            // const viewJob = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.JOBS.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.JOBS.GET_PAGINATE.method
            // )

            // const viewResume = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.method
            // )

            // const viewRole = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.ROLES.GET_PAGINATE.method
            // )

            // const viewPermission = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
            // )
            const viewUser = true;
            const viewRole = true;

            const full = [
                {
                    label: <Link to='/admin'>Dashboast</Link>,
                    key: '/admin',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="white" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path fill="currentColor" d="m21.477 9.085-7.413-6.1a3.26 3.26 0 0 0-4.128 0l-7.413 6.1a.75.75 0 1 0 .954 1.158l.773-.636v8.393a3.383 3.383 0 0 0 3.75 3.75h8a3.382 3.382 0 0 0 3.75-3.75v-8.393l.773.636a.75.75 0 0 0 .954-1.158m-7.727 11.165h-3.5v-3.75a1.75 1.75 0 0 1 3.5 0zm4.5-2.25c0 1.577-.673 2.25-2.25 2.25h-.75v-3.75a3.25 3.25 0 0 0-6.5 0v3.75h-.75c-1.577 0-2.25-.673-2.25-2.25v-9.626l5.139-4.226a1.755 1.755 0 0 1 2.222 0l5.139 4.226z"></path></svg>
                    
                },

                ...(viewUser || ACL_ENABLE === 'false' ? [{
                    label: "Khách hàng",
                    key: '/admin/user-management',
                    icon:   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" focusable="false" aria-hidden="true" width="20px" > <path fill="currentColor" d="M12.01 10.75a4.25 4.25 0 1 1 0-8.5 4.25 4.25 0 0 1 0 8.5m0-7a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5m3.99 18h-8c-2.42 0-3.753-1.325-3.753-3.731 0-2.662 1.506-5.769 5.75-5.769h4c4.244 0 5.75 3.107 5.75 5.769.003 2.406-1.33 3.731-3.747 3.731m-6-8a3.957 3.957 0 0 0-4.25 4.269c0 1.564.674 2.231 2.253 2.231h7.997c1.58 0 2.253-.667 2.253-2.231a3.96 3.96 0 0 0-4.253-4.269z"></path></svg>,
                  
                    children: [
                        {   
                            
                            label: <Link to='/admin/user-management/users'>Danh sách khách hàng</Link>, // Quản lý tài khoản người dùng
                            key: '/admin/user-management/users',
                        },
                        {
                            label: <Link to='/admin/user-management/roles'>Nhóm phân quyền</Link>, // Quản lý vai trò (Roles)
                            key: '/admin/user-management/roles',
                        },
                        {
                            label: <Link to='/admin/user-management/permissions'>Quyền hạn</Link>, // Quản lý quyền hạn (Permissions)
                            key: '/admin/user-management/permissions',
                        },
                    ],
                }] : []),
               
                ...(viewRole || ACL_ENABLE === 'false' ? [{
                    label: "Sản phẩm",
                    key: '/admin',
                    icon: <svg width="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path fill="currentColor" stroke="currentColor" stroke-width="0.5" d="m21.24 6.62-8.832-4.474-.003-.002a1.38 1.38 0 0 0-1.25.012l-3.789 2.01a1 1 0 0 0-.088.047l-4.54 2.41a1.37 1.37 0 0 0-.738 1.219v8.316c0 .514.283.981.738 1.22l8.413 4.465.003.002a1.38 1.38 0 0 0 1.25.011l8.836-4.477c.47-.235.761-.706.761-1.231v-8.296c0-.525-.291-.997-.76-1.231Zm-9.543-3.426a.2.2 0 0 1 .184-.002l8.267 4.189-3.217 1.602-8.083-4.277zm-.5 17.347-7.911-4.2-.004-.001a.2.2 0 0 1-.11-.182v-7.787l8.025 4.184zm.592-8.998-7.981-4.162 3.79-2.012 8.042 4.256zm9.04 4.605a.2.2 0 0 1-.113.183l-8.348 4.23v-7.998l3.844-1.914v2.007a.586.586 0 0 0 1.171 0v-2.59l3.447-1.716z"></path></svg>,
                    children: [ 
                        {
                            label: <Link to='/admin/products'>Danh sách sản phẩm
                            </Link>, 
                            key: '/admin/products',
                        },
                        {
                            label: <Link to='/admin/categories'>Danh mục sản phẩm</Link>, 
                            key: '/admin/categories',
                        },
                    ],
                }] : []),
                {
                    label: <Link to='#'>Khuyến mãi</Link>,
                    key: '/admin',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="white" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path fill="currentColor" d="m21.477 9.085-7.413-6.1a3.26 3.26 0 0 0-4.128 0l-7.413 6.1a.75.75 0 1 0 .954 1.158l.773-.636v8.393a3.383 3.383 0 0 0 3.75 3.75h8a3.382 3.382 0 0 0 3.75-3.75v-8.393l.773.636a.75.75 0 0 0 .954-1.158m-7.727 11.165h-3.5v-3.75a1.75 1.75 0 0 1 3.5 0zm4.5-2.25c0 1.577-.673 2.25-2.25 2.25h-.75v-3.75a3.25 3.25 0 0 0-6.5 0v3.75h-.75c-1.577 0-2.25-.673-2.25-2.25v-9.626l5.139-4.226a1.755 1.755 0 0 1 2.222 0l5.139 4.226z"></path></svg>
                },
           
             
                
            
            ];

            setMenuItems(full);
        }
    }, [permissions])
    useEffect(() => {
        setActiveMenu(location.pathname)
    }, [location])

    const handleLogout = async () => {
        const res = await callLogout();
        console.log('res', res);
        if (res && +res.status === 200) {
            console.log('logout success');
            await dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    // if (isMobile) {
    //     items.push({
    //         label: <label
    //             style={{ cursor: 'pointer' }}
    //             onClick={() => handleLogout()}
    //         >Đăng xuất</label>,
    //         key: 'logout',
    //         icon: <LogoutOutlined />
    //     })
    // }

    const itemsDropdown = [
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    return (
        <>
            <Layout
                style={{ maxHeight: '100vh', position: 'relative', top: 0, left: 0 }}
                className="layout-admin"
            >
                {!isMobile ?
                    <Sider className='layout-admin__sider'
                        style={{ 
                           
                            
                            minHeight: '100vh',
                            overflow: 'auto',
                            scrollbarColor: 'hsla(0, 0%, 100%, .65) #001529',
                            scrollbarWidth: 'thin',
                            scrollBehavior: 'smooth',
                            position: 'sticky', 
                            top: 0, 
                            left: 0, 
                            backgroundColor: '#001529',
                            
                        }}
                       
                        width={230}
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}>
                        {collapsed ? (
                            <div style={{marginTop: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'center'}}>
                                
                                <img style={{width: '35px'}} src="https://res.cloudinary.com/dbu3hnaiz/image/upload/v1740830322/l7ejzdcf_ybef7e.png"/>
                            </div>) : (
                            <div style={{margin: '10px 30px', display: 'flex', justifyContent: 'left', backgroundColor: '#001529'}}>
                                <img style={{width: '135px'}} src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/logo.png?1727161994343"/>
                            </div>
                        )}
                        <div className='layout-admin__menu'>
                            <Menu
                                style={{ backgroundColor: '#001529' }}
                                selectedKeys={[activeMenu]}
                                mode="inline"
                                items={menuItems}
                                onClick={(e) => setActiveMenu(e.key)}
                            />
                        </div>
                    </Sider>
                    :
                    <Drawer
                        className='layout-admin__sider layout-admin__mobile'
                        placement="left"
                        style={{ 
                            backgroundColor: '#001529', 
                            width: '230px', 
                            padding: 0,
                            minHeight: '100vh',
                            overflowY: 'auto',
                            scrollbarColor: 'hsla(0, 0%, 100%, .65) #001529 ',
                            scrollbarWidth: 'inherit',

                        }}
                        closable={false}
                        onClose={() => setCollapsed(false)}
                        visible={collapsed}
                
                    >
                        <div className='layout-admin__menu layout-admin__mobile'>
                            <Menu
                                style={{ backgroundColor: '#001529', width: '100%' }}
                                selectedKeys={[activeMenu]}
                                mode="inline"
                                items={menuItems}
                                onClick={(e) => setActiveMenu(e.key)}
                            />
                        </div>
                    </Drawer>
                    
                    
                    
                }

                <Layout>
                    {/* {!isMobile*/ true &&
                    
                        <div className='admin-header' style={{ display: "flex", justifyContent: "space-between",  height: 64, width: "100%" ,alignItems: 'center', backgroundColor: 'white', marginBottom: 0, paddingRight: "25px" }}>
                            <Button
                                type="text"
                                icon={collapsed ? React.createElement(MenuUnfoldOutlined) : React.createElement(MenuFoldOutlined)}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />

                            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                <Space style={{ cursor: "pointer" }}>
                                    Welcome {user?.fullname}
                                    <Avatar src={user?.avatar}/>
                                </Space>
                            </Dropdown>
                        </div>
                    }
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100vh - 64px)', position: 'relative' }}>
                            {loading && (
                                    <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background: "rgba(255, 255, 255, 0.5)",
                                        zIndex: 999,
                                        pointerEvents: "all", // Chặn click
                                    }}
                                    />
                            )}
                            <Spin spinning={loading} size='large' style={{position: 'absolute', top: '45%', left: '50%', zIndex: 1000}} >
                                
                            </Spin>
                            <Content style={{ padding: '0px', overflow: 'auto'}} >
                               
                                {props.children}
                                
                            </Content>
                        </div>
                    
                    {/* <Footer style={{ padding: 10, textAlign: 'center' }}>
                        React Typescript series Nest.JS &copy; HAHAHA - Made with <HeartTwoTone />
                    </Footer> */}
                </Layout>
            </Layout>

        </>
    );
};

export default LayoutAdmin;