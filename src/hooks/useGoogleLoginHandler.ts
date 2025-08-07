import { useEffect, useRef } from "react";
import { message } from "antd";
import { callLoginGoogle } from "../api/authApi";

declare global {
  interface Window {
    google?: any;
  }
}

export const useGoogleLoginHandler = () => {
  const googleReady = useRef(false);

  useEffect(() => {
    // Tạo script SDK thủ công
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("✅ Google SDK đã được load");

      if (!window.google || !window.google.accounts?.id) {
        console.error("❌ SDK Google không có accounts.id");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          const idToken = response.credential;
          if (!idToken) {
            message.error("Không nhận được id_token");
            return;
          }

          try {
            const res = await callLoginGoogle(idToken);
            const data = res.data;
            message.success("Đăng nhập Google thành công!");
          } catch (err) {
            message.error("Không thể kết nối máy chủ");
          }
        },
        ux_mode: "popup",
      });

      googleReady.current = true;
    };

    script.onerror = () => {
      console.error("❌ Không thể tải Google SDK");
    };

    document.head.appendChild(script);
  }, []);

  const triggerGoogleLogin = () => {
    if (!window.google || !googleReady.current) {
      message.error("Google SDK chưa sẵn sàng.");
      return;
    }

    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed()) {
        console.warn("⛔ One Tap không hiển thị:", notification.getNotDisplayedReason());
      }
      if (notification.isSkippedMoment()) {
        console.warn("⏭ One Tap bị skip:", notification.getSkippedReason());
      }
      if (notification.isDismissedMoment()) {
        console.warn("❌ One Tap bị đóng:", notification.getDismissedReason());
      }
    });
  };

  return triggerGoogleLogin;
};
