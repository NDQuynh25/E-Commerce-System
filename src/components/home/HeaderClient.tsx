import React, { useState } from 'react';
import {SearchOutlined, MenuOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Button, Drawer, Menu } from 'antd';
import '../../styles/header.client.css';
import { Input } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { isMobile } from 'react-device-detect';

const { Search } = Input;


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <p style={{fontSize: "1rem"}}>Trang chủ</p>,
        key: 'home',
        icon: <img src='/homepage.png' alt='Product Icon' style={{ height: '18px', width: "auto" }} />,
    },

    {
        label: <p style={{fontSize: "1rem"}}>Nam</p>,
        key: 'male',
        icon: <img src='/man.png' alt='Product Icon' style={{ height: '18px', width: "auto" }}/>,
    },
    {
        label: <p style={{fontSize: "1rem"}}>Nữ</p>,
        key: 'female',
        icon: <img src='/woman.png' alt='Product Icon' style={{ height: '18px', width: "auto" }} />,
    },
    {
        label: <p style={{fontSize: "1rem"}}>Trẻ em</p>,
        key: 'child',
        icon: <img src='/children.png' alt='Product Icon' style={{ height: '18px', width: "auto" }} />,
    },
    {
        label: <p style={{fontSize: "1rem"}}>Phụ kiện</p>,
        key: 'accessories',
        icon: <img src='/accessory.png' alt='Product Icon' style={{ height: '18px', width: "auto" }} />,
    },
    {
        label: <p style={{fontSize: "1rem"}}>Ưu đãi</p>,
        key: 'discount',
        icon: <img src='/coupon.png' alt='Product Icon' style={{ height: '18px', width: "auto" }} />,
    },
    {
        label: <p style={{fontSize: "1rem"}}>Liên hệ</p>,
        key: 'contact',
        icon: <img src='/contact-mail.png' alt='Product Icon' style={{ height: '18px', width: "auto" }} />,
    },
   
    
];


const HeaderClient = () => {
    const [current, setCurrent] = useState('male');

   
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const [visible, setVisible] = useState(false);
    const toggleDrawer = () => {
        setVisible(!visible);
    };
    const isExtraSmallScreen = useMediaQuery({ query: '(max-width: 480px)' });
   
    const isSmallScreen = useMediaQuery({ query: '(min-width: 481px) and (max-width: 768px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px)' });
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1025px) and (max-width: 1200px)' });

    return (
        <div className='header-client'>
            <div className='header-client-container'>
                <div className='header-client-content'>
                    <div className='header-client-logo display-logo'>
                        <img src='logo.png' style={{height: "70px", borderRadius: "100%"}} />
                    </div>
                   
                    <div className='header-client-menu-search'>
                        <div className='header-client-menu display-menu'>
                            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{flexGrow: "1"}}/>
                        </div>
                        <div className='header-client-search'>
                            <Search  placeholder="Bạn muốn tìm gì..." enterButton size="large" loading={false} />
                        </div>
                        
                    </div>
                    <div className='header-client-account'>
                        <Button icon={<img src='account.png' alt='Product Icon' style={{ height: '28px', width: "auto", border: "none" }} />} size="large" style={{ marginLeft: 16 }}>
                            
                        </Button>
                        <Badge count={99} overflowCount={99}>
                            <Button icon={<img src='cart.png' alt='Product Icon' style={{ height: '28px', width: "auto", border: "none" }} />} size="large" style={{ marginLeft: 16 }}>
                                
                            </Button>
                        </Badge>
                    </div>
                    <div className='header-client-menu-mobile display-menu-mobile'>
                        <Button
                            onClick={toggleDrawer}
                            icon={<MenuOutlined />}
                            style={{ height:"38px", width: "38px",  }}
                           
                        />
                        <Drawer
                            title="Menu"
                            placement="left"
                            onClose={toggleDrawer}
                            visible={visible}
                            width={"200px"}
                        >
                            <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />
                        </Drawer>
                    </div>
                    
                    
                </div>
            </div>
        </div>
        
    );
};

export default HeaderClient;
