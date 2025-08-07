import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { roles } from "../../utils/constant";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import TopBar from "../home/TopBar";
import HeaderClient from "../home/HeaderClient";
import BreadCurmb from "../home/BreadCurmb";
import Footer from "../home/Footer";
import "../../styles/layout.user-web.css";
import { Link } from "react-router-dom";

// interface LayoutUserWebProps {
//   children: React.ReactNode;
// }

const LayoutUser: React.FC = () => {
  const pathTitleMap: Record<string, string> = {
    "/cart": "Giỏ hàng",
    "/checkout": "Thanh toán",
    "/orders": "Đơn hàng",
  };

  const pathNameCurrent = useLocation().pathname;

  const title = pathTitleMap[pathNameCurrent];

  const specialPaths = ["/checkout", "/cart", "/orders"];
  const isSpecialPage = specialPaths.includes(pathNameCurrent);

  return (
    <div
      className="layout-user-web"
      style={{
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f3f3f3",
      }}
    >
      <div>
        <div className="layout-user-web__top-bar">
          <TopBar />
        </div>

        {isSpecialPage ? (
          <div className="layout-user-web__header">
            <div
              style={{
                padding: "20px",

                backgroundColor: "white",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  paddingLeft: "10%",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Link to="/">
                  <img
                    style={{
                      height: "70px",
                      objectFit: "cover",
                    }}
                    src="//bizweb.dktcdn.net/100/480/479/themes/900388/assets/logo.png?1727161994343"
                    alt="Dola Furniture"
                  ></img>
                </Link>

                <div
                  style={{
                    paddingLeft: "20px",
                    borderLeft: "2px solid rgb(238, 77, 45)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "28px",
                      fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                      color: "rgb(238, 77, 45)",

                      fontWeight: "500",
                    }}
                  >
                    {title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="layout-user-web__header">
            <HeaderClient />
          </div>
        )}

        {pathNameCurrent === "/" || "/checkout" ? null : (
          <div className="layout-user-web__breadcrumb">
            <BreadCurmb />
          </div>
        )}
      </div>
      <div className="layout-user-web__content">
        {/* {children} */}
        <Outlet />
      </div>
      <div className="layout-user-web__footer">
        <Footer />
      </div>
    </div>
  );
};

export default LayoutUser;
