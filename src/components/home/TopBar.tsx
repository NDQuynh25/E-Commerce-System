import { Link } from "react-router-dom";
import "../../styles/modal.top-bar.css";
import React from "react";
import { Col } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { Dropdown } from "antd";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { MenuProps } from "antd/lib";
import {setLogoutAction } from "../../redux/slices/authSlice";
import {callLogout } from "../../api/authApi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(
    (state: RootState) => state.auth.account_info.id
  );
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const imageUrl = useAppSelector(
    (state: RootState) => state.auth.account_info.avatar
  );
  const fullName =
    useAppSelector((state: RootState) => state.auth.account_info.fullName) ||
    "Tài khoản";
  const navigate = useNavigate();
  const handleLogout = async (): Promise<void> => {
    const res = await callLogout();
    if (res.status === 200) {
      dispatch(setLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    } else {
      message.error("Đăng xuất thất bại");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "15px",
            color: "black",
            fontWeight: "500",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
            </g>
          </svg>
          <Link to="#">
            <span style={{ color: "black" }}>Tài khoản</span>
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(1, 0, 0, -1, 0, 0)rotate(0)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M21 12L13 12"
                stroke="#323232"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"
                stroke="#323232"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19"
                stroke="#323232"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <Link onClick={handleLogout} to="">
            <span style={{ color: "black" }}>Đăng xuất</span>
          </Link>
        </div>
      ),
    },
  ];

  // useEffect(() => {
  //   const fetchRefreshToken = async () => {
  //     try {
  //       await dispatch(fetchAccount());
  //       console.log("Fetch account success");
  //     } catch (error) {
  //       // lỗi thì thôi, không làm gì thêm
  //       console.error("Fetch account failed:", error);
  //     }
  //   };
  
  //   fetchRefreshToken();
  // }, [dispatch]);
  

  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <Col
              style={{
                padding: "10px 10px",
              }}
            >
              <a href="tel:10991006" title="10991006">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                  fill="orange"
                >
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
                <span>10991006</span>
              </a>
            </Col>
            <Col
              style={{
                padding: "10px 10px",
              }}
            >
              <a href="mailto:support@sapo.vn" title="support@sapo.vn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="20"
                  height="20"
                  fill="orange"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
                </svg>
                <span>support@sapo.vn</span>
              </a>
            </Col>
          </div>
          <div className="top-bar-right">
            {!isAuthenticated && (
              <>
                <Col
                  style={{
                    padding: "10px 10px",
                  }}
                >
                  <Link to="/login">
                    <span>Đăng nhập</span>
                  </Link>
                </Col>
                <Col
                  style={{
                    padding: "10px 10px",
                  }}
                >
                  <Link to="#">
                    <span>Đăng ký</span>
                  </Link>
                </Col>
              </>
            )}
            <Col
              style={{
                padding: "10px 10px",
              }}
            >
              <Link to="/cart">
                <span>Hệ thống cửa hàng</span>
              </Link>
            </Col>
            <Col
              style={{
                padding: "10px 10px",
              }}
            >
              <Link to="/cart">
                <span>FAQ</span>
              </Link>
            </Col>
            <Col
              style={{
                padding: "10px 10px",
              }}
            >
              <Link to="#">
                <span>Sản phẩm yêu thích</span>
              </Link>
            </Col>
            {isAuthenticated && (
              <Col
                style={{
                  padding: "0px 10px",
                }}
              >
                <Dropdown menu={{ items }} placement="bottom">
                  <Link to={`/user/${userId}`}>
                    <img
                      src={imageUrl}
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />

                    <span>{fullName}</span>
                  </Link>
                </Dropdown>
              </Col>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
