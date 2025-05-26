import React from "react";

import { Link } from "react-router-dom";
import "../../styles/modal.header.client.css";
import { Badge, Button, Dropdown, Menu, MenuProps, Space } from "antd";
import MenuProduct from "./MenuProduct";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/product">1st menu item</Link>,
  },
  {
    key: "2",
    label: <Link to="/product">1st menu item</Link>,
  },
  {
    key: "3",
    label: <Link to="/product">1st menu item</Link>,
  },
];
const HeaderClient: React.FC = () => {
  return (
    <div className="header-client">
      <div className="container">
        <div className="header-client-content">
          <div className="header-client-logo">
            <Link to="/">
              <img
                src="//bizweb.dktcdn.net/100/480/479/themes/900388/assets/logo.png?1727161994343"
                alt="Dola Furniture"
              ></img>
            </Link>
          </div>
          <div className="header-client-category">
            <Dropdown menu={{ items }} placement="bottom">
              <Button
                style={{
                  fontSize: "16px",
                  color: "black",
                  border: "none",
                  backgroundColor: "#f6f4f0",
                  height: "38px",
                  borderRadius: "5px",
                }}
              >
                <span>Danh mục nổi bật</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="20"
                  height="20"
                >
                  <path
                    fill="black"
                    d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
                  ></path>
                </svg>
              </Button>
            </Dropdown>
          </div>
          <div className="header-client-menu">
            <MenuProduct />
          </div>
          <div className="header-client-control">
            <div className="header-client-search">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  fill="#"
                  d="M14.1404 13.4673L19.852 19.1789C20.3008 19.6276 19.6276 20.3008 19.1789 19.852L13.4673 14.1404C12.0381 15.4114 10.1552 16.1835 8.09176 16.1835C3.6225 16.1835 0 12.5613 0 8.09176C0 3.6225 3.62219 0 8.09176 0C12.561 0 16.1835 3.62219 16.1835 8.09176C16.1835 10.1551 15.4115 12.038 14.1404 13.4673ZM0.951972 8.09176C0.951972 12.0356 4.14824 15.2316 8.09176 15.2316C12.0356 15.2316 15.2316 12.0353 15.2316 8.09176C15.2316 4.14797 12.0353 0.951972 8.09176 0.951972C4.14797 0.951972 0.951972 4.14824 0.951972 8.09176Z"
                ></path>{" "}
              </svg>
            </div>
            <div className="header-client-cart">
              <Dropdown menu={{ items }} placement="bottom">
                <Button className="cart-btn" href="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="17.5"
                    height="20"
                  >
                    <path
                      fill="balck"
                      d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"
                    ></path>
                  </svg>
                  <span style={{ fontSize: "14px" }}>Giỏ hàng</span>
                  <Space size="middle">
                    <Badge
                      count={4}
                      showZero={false}
                      style={{
                        backgroundColor: "black",
                      }}
                    ></Badge>
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderClient;
