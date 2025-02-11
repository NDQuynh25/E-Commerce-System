import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/modal.menu.product.css"; 
import { Dropdown, MenuProps} from "antd";

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/product">1st menu item</Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/product">1st menu item</Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/product">1st menu item</Link>
      ),
    },
  ];
const MenuProduct: React.FC = () => {
    
    return (
        <nav className="menu-product">
            <ul>
                <li className={location.pathname === "/" ? "active" : ""}>
                    <Link to="/"><span>Trang chủ</span></Link>
                </li>
                <li className={location.pathname === "/introduce" ? "active" : ""}>
                    <Link to="/introduce"><span>Giới thiệu</span></Link>
                </li>
                <li className={`${location.pathname === "/product" ? "active" : ""}`}>
                    <Dropdown menu={{items}}><span>Sản phẩm</span></Dropdown>
                </li>
                <li className={location.pathname === "/news" ? "active" : ""}>
                    <Link to="/news"><span>Tin tức</span></Link>
                </li>
                <li className={location.pathname === "/contact" ? "active" : ""}>
                    <Link to="/contact"><span>Liên hệ</span></Link>
                </li>
                
            </ul>
        </nav>
    );
};

export default MenuProduct;
