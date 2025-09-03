import React from "react";
import { Drawer, Layout, Menu, MenuProps, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { icons } from "antd/es/image/PreviewGroup";

const LayoutAccount: React.FC = () => {
  const [menuItems, setMenuItems] = React.useState<MenuProps["items"]>([]);
  const [activeMenu, setActiveMenu] = React.useState("account");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const full = [
    {
      label: (
        <Link to="/user/account/information">
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Tài khoản
          </span>
        </Link>
      ),
      key: "account",
      icons: (
        <img
          style={{ width: "30px" }}
          src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4"
        ></img>
      ),
    },
    { label: "Orders", key: "orders" },
  ];

  React.useEffect(() => {
    setMenuItems(full);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          marginBottom: "50px",
          height: "100%",
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: "20px",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
        }}
      >
        <Col xl={4} sm={4}>
          <Sider
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: "20px",
            }}
          >
            <Menu
              style={{
                minHeight: "400px",
                height: "100%",
                borderRight: 0,
                backgroundColor: "#fff",
                color: "#fff",
              }}
              selectedKeys={[activeMenu]}
              mode="inline"
              items={menuItems}
              onClick={(e) => {
                setActiveMenu(e.key);
                setDrawerOpen(false); // close drawer after click
              }}
            />
          </Sider>
        </Col>
        <Col xl={1} lg={1} sm={1} />

        <Col xl={19} lg={19} sm={19}>
          <Layout
            style={{
              width: "100%",
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: "20px",
              // boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
            }}
          >
            <Outlet />
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export default LayoutAccount;
