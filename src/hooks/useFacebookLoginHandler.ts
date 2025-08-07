import { useEffect, useRef } from "react";
import { message } from "antd";
import { callLoginFacebook } from "../api/authApi";

declare global {
  interface Window {
    FB: any;
  }
}

export const useFacebookLoginHandler = () => {
  const fbReady = useRef(false);

  useEffect(() => {
    const checkFB = () => {
      if (window.FB) {
        window.FB.init({
          appId: "1071143235129348",
          cookie: true,
          xfbml: false,
          version: "v18.0",
        });
        fbReady.current = true;
      } else {
        setTimeout(checkFB, 100); // Retry until FB is ready
      }
    };

    checkFB();
  }, []);

  const loginWithFacebook = () => {
    if (!window.FB || !fbReady.current) {
      message.error("Facebook SDK chưa sẵn sàng.");
      return;
    }

    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          handleLogin(accessToken);
        } else {
          message.error("Bạn đã huỷ đăng nhập Facebook.");
        }
      },
      { scope: "email,public_profile" }
    );
  };

  const handleLogin = async (accessToken: string) => {
    try {
      const res = await callLoginFacebook(accessToken);
      const data = res.data;
      // localStorage.setItem("access_token", data.token);
      message.success("Đăng nhập Facebook thành công!");
    } catch (err) {
      console.error("Facebook login error", err);
      message.error("Xác thực với máy chủ thất bại.");
    }
  };

  return loginWithFacebook;
};
