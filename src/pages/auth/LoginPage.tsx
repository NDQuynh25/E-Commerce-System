import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../../styles/login.page.css";
import { callLogin } from "../../api/authApi";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks";
import { LoadingOutlined } from "@ant-design/icons";
import { setUserLoginInfo } from "../../redux/slices/authSlice";
import GoogleLoginPage from "./GoogleLoginPage";
import { useGoogleLoginHandler } from "../../hooks/useGoogleLoginHandler";
import FacebookLoginPage from "./FacebookLoginPage";

import { message, Spin } from "antd";
import { useGoogleLogin } from "@react-oauth/google";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const loginGoogle = useGoogleLoginHandler();
  const dispatch = useAppDispatch();
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const idToken = (tokenResponse as any).id_token; // Type assertion
      console.log(idToken);
    },
    // flow: "implicit" (default)
  });

  useEffect(() => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const validateEmail = (email: string): void => {
    if (email.trim() === "") {
      setErrorEmail("Email is required");
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(email)) {
      setErrorEmail("");
    } else {
      setErrorEmail("Invalid email format");
    }
  };
  const validatePassword = (password: string): void => {
    if (password.trim() === "") {
      setErrorPassword("Password is required");
    }
    if (password.length < 8) {
      setErrorPassword("Password must be at least 8 characters long");
    } else {
      setErrorPassword("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    validateEmail(email);
    validatePassword(password);

    try {
      const res = await callLogin(email, password);
      if (res?.data) {
        localStorage.setItem("access_token", res.data.access_token);
        dispatch(setUserLoginInfo(res.data?.user));
        message.success("Đăng nhập tài khoản thành công!");
        window.location.href = callback ? callback : "/";
      } else {
        message.error("Đăng nhập tài khoản thất bại!");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      message.error(
        err?.message || "Lỗi kết nối đến máy chủ. Vui lòng thử lại!"
      );
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className="login-main"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-right">
        <div
          className="login-right-container"
          style={{
            marginBottom: "50px",
            marginTop: "50px",
            backgroundColor: "#f7f7f7",
            padding: "50px",
            borderRadius: "30px",
            maxWidth: "500px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="login-center">
            <h2
              style={{
                marginBottom: "50px",
                fontSize: "40px",
                justifyContent: "left",
                color: "#ee4d2d",
              }}
            >
              Đăng nhập
            </h2>

            <form>
              <div style={{}}>
                <input
                  style={{
                    fontSize: "16px",
                    backgroundColor:
                      errorEmail === "" ? "white" : "rgb(255, 216, 216)",
                  }}
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {errorEmail !== "" && (
                  <p
                    style={{
                      textAlign: "left",
                      marginBottom: "8px",
                      color: "red",
                      fontSize: "14px",
                    }}
                  >
                    Invalid email format
                  </p>
                )}
              </div>
              <div className="pass-input-div">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  style={{
                    fontSize: "16px",
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label
                    htmlFor="remember-checkbox"
                    style={{ fontSize: "16px" }}
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <a
                  href="#"
                  className="forgot-pass-link"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div className="login-center-buttons">
                {isSubmitting ? (
                  <Spin
                    spinning={isSubmitting}
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 40, color: "#ee4d2d" }}
                      />
                    }
                  />
                ) : (
                  <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={(e: any) => {
                      handleSubmit(e);
                    }}
                  >
                    Đăng Nhập
                  </button>
                )}

                <GoogleLoginPage />

                <FacebookLoginPage />
              </div>
            </form>
          </div>

          <p
            className="login-bottom-p"
            style={{
              fontSize: "14px",
              marginTop: "14px",
            }}
          >
            Bạn chưa có tài khoản? <a href="#">Đăng Ký</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
