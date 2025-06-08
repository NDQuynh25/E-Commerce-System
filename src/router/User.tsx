import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Đảm bảo định nghĩa RootState trong store
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "../pages/user/Cart";
import HomePage from "../pages/user/HomePage";
import Product from "../pages/user/Product";

const User = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Fragment>
      {/* {isAuthenticated && <NavBarManagement />} */}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default User;
