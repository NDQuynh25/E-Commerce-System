import { IBackendRes } from "../types/backend";
import { Mutex } from "async-mutex";
import axiosClient from "axios";
import { store } from "../redux/store";
import { setRefreshTokenAction } from "../redux/slices/authSlice";
import { notification } from "antd";

interface AccessTokenResponse {
    access_token: string;
}

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const instance = axiosClient.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string,
    withCredentials: true, // Required to handle cookies.
    timeout: 10000,
});

const mutex = new Mutex();

const NO_RETRY_HEADER = 'x-no-retry';

const handleRefreshToken = async (): Promise<string | null> => {
    return await mutex.runExclusive(async () => {
        const res = await instance.get<IBackendRes<AccessTokenResponse>>('/api/v1/auth/refresh');
        if (res && res.data) return res.data.access_token;
        else return null;
    });
};

instance.interceptors.request.use(function (config) {
    if (config.url && config.url.startsWith('/api/v1/auth/') && config.url !== '/api/v1/auth/logout') {
        return config;
    }
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
});

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
    (res) => res.data,
    async (error) => {
      // ✅ Nếu máy chủ không phản hồi (timeout, connection refused, no internet)
      if (!error.response) {
        console.log(error);
        return {
          status: 500,
          message: "Máy chủ không phản hồi!",
          data: null, // Hoặc [] tùy API
          error: error.message || "Unknown error",
        };
      }
  
      // ✅ Nếu lỗi 401 và không phải login
      if (
        error.config &&
        error.response &&
        +error.response.status === 401 &&
        error.config.url !== "/api/v1/auth/login" &&
        
        !error.config.headers[NO_RETRY_HEADER]
      ) {
        error.config.headers[NO_RETRY_HEADER] = "true";
        const access_token = await handleRefreshToken();
  
        if (access_token) {
          localStorage.setItem("access_token", access_token);
          error.config.headers["Authorization"] = `Bearer ${access_token}`;
          return instance.request(error.config);
        } else {
          // ✅ Nếu refresh token lỗi
          const message = "Có lỗi xảy ra, vui lòng login.";
          store.dispatch(setRefreshTokenAction({ status: true, message }));
          localStorage.removeItem("access_token");
          localStorage.removeItem("persist:auth");
          if (location.pathname.startsWith("/admin")) {
            window.location.href = "/admin/login";
          } else {
            window.location.href = "/login";
          }
        }
      }
  
      // ✅ Nếu refresh token lỗi khi đang ở /admin
      if (
        error.config &&
        error.response &&
        +error.response.status === 400 &&
        error.config.url === "/api/v1/auth/refresh" 
      ) {
        
        const message = "Có lỗi xảy ra, vui lòng login.";
        store.dispatch(setRefreshTokenAction({ status: true, message }));
        localStorage.removeItem("access_token");
        localStorage.removeItem("persist:auth");
        if (location.pathname.startsWith("/admin")) {
          window.location.href = "/admin/login";
        } else {
          window.location.href = "/login";
        }
    

      }
  
      // ✅ Lỗi 403
      if (error.response && +error.response.status === 403) {
      
        notification.error({
          message: error?.response?.data?.message ?? "",
          description: error?.response?.data?.error ?? "",
        });
      }
  
      // ✅ Luôn reject lỗi cuối cùng
      return Promise.reject(error);
    }
  );
  
/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
// const axios = <T>(cfg: AxiosRequestConfig) => instance.request<any, T>(cfg);

// export default axios;

export default instance;