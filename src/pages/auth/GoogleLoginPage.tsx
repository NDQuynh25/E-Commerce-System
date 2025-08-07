import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { callLoginGoogle } from "../../api/authApi";

const LoginGooglePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const callback = params.get("callback");

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    console.log(idToken); // Để kiểm tra giá trị idToke

    try {
      const res = await callLoginGoogle(idToken);

      console.log(res);
    } catch (err) {
      console.error("Google login error:", err);
      message.error("Không thể kết nối đến máy chủ.");
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => message.error("Đăng nhập Google thất bại")}
        size="large" // "small", "medium", "large"
        theme="outline" // "outline", "filled_black"
        text="signin_with" // "signin", "signup", "continue", "signin_with"
        shape="pill" // "rectangular", "pill", "circle", "square"
        logo_alignment="center" // "left" hoặc "center"
      />
    </div>
  );
};

export default LoginGooglePage;
