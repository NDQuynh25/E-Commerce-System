
import * as React from "react";
import  { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { path } from "./utils/constant";
import "./styles/app.module.css";
import Admin from "./router/Admin";
import User from "./router/User";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LoginAdmin from "./pages/auth/LoginAdmin";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import LayoutApp from "./components/layout/LayoutApp";
import LayoutUserWeb from "./components/layout/LayoutUserWeb";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="content-app">
      <React.Fragment>
        <Router>
          <Routes>
            <Route
              path={path.LOGIN}
              element={
                isAuthenticated ? <div>Already logged in</div> : <Login />
              }
            />
            <Route
              path={path.REGISTER}
              element={
                isAuthenticated ? <div>Already registered</div> : <Register />
              }
            />
            <Route path={path.LOGIN_ADMIN} element={<LoginAdmin />} />

            <Route
              path={path.USER}
              element={
                <LayoutUserWeb>
                  <User />
                </LayoutUserWeb>
              }
            />
            <Route
              path={path.ADMIN}
              element={
                <LayoutApp>
                  <LayoutAdmin>
                    <Admin />
                  </LayoutAdmin>
                </LayoutApp>
              }
            />
          </Routes>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
