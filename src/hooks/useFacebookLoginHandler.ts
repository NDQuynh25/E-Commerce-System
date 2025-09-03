import { useEffect, useRef } from "react";
import { message } from "antd";
import { callLoginFacebook } from "../api/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUserLoginInfo } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    FB: any;
  }
}

export const useFacebookLoginHandler = () => {
  const fbReady = useRef(false);
  const dispatch = useAppDispatch();
  const callback = window.location.search.split("callback=")[1];
  const navigate = useNavigate();
  useEffect(() => {
    const checkFB = () => {
      if (window.FB) {
        window.FB.init({
          appId: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
          cookie: true,
          xfbml: false,
          version: "v23.0",
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
          // Kiểm tra quyền email có được cấp chưa
          window.FB.api("/me/permissions", (permRes: any) => {
            const hasEmail = permRes.data?.some(
              (p: any) => p.permission === "email" && p.status === "granted"
            );

            if (!hasEmail) {
              message.error("Bạn phải cấp quyền email để tiếp tục.");
              // Thử login lại với reauth
              window.FB.login(
                (resp: any) => {
                  if (resp.authResponse) {
                    handleLogin(resp.authResponse.accessToken);
                  }
                },
                { scope: "email,public_profile", auth_type: "rerequest" }
              );
            } else {
              handleLogin(response.authResponse.accessToken);
            }
          });
        } else {
          message.error("Bạn đã huỷ đăng nhập Facebook.");
        }
      },
      { scope: "email,public_profile", auth_type: "rerequest" } // auth_type giúp yêu cầu lại quyền
    );
  };

  const handleLogin = async (accessToken: string) => {
    try {
      // Gọi Graph API để lấy email
      window.FB.api(
        "/me",
        { fields: "id,name,email,picture" },
        async (userInfo: any) => {
          const res = await callLoginFacebook(accessToken);
          console.log(res);
          if (res.status === 200) {
            if (res.data?.access_token) {
                localStorage.setItem("access_token", res.data.access_token);
            }           
            dispatch(setUserLoginInfo(res.data?.account_info));
            navigate(callback || "/");
            message.success("Đăng nhập thành công!");
 
          } else {
            localStorage.removeItem("persist:auth");
            localStorage.removeItem("access_token");
            message.error(res.message || "Đăng nhập thất bại.");
          }
        }
      );
    } catch (err) {
      console.error("Facebook login error", err);
      localStorage.removeItem("persist:auth");
      message.error("Xác thực với máy chủ thất bại.");
    }
  };

  return loginWithFacebook;
};
