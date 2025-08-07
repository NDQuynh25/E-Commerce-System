import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import viVN from "antd/lib/locale/vi_VN";
import { ConfigProvider } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  // Strict mode helps to identify potential problems in the application
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={viVN}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
