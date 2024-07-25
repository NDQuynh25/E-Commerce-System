import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {path} from './utils/constant';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import './styles/app.module.css';
import AdminRoute from './components/router/AdminRouter';
import SellRoute from './components/router/SellRouter';
import Admin from './router/Admin';
import Sell from './router/Sell';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';



function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <div className="content-app">
      <Fragment>
        <Router>
          <Routes>
              <Route path={path.HOME_PAGE} element={<></>} />
              <Route path={path.LOGIN} element={<>{isAuthenticated ? <></> : <Login />}</>}/>
              <Route path={path.REGISTER} element={<>{isAuthenticated ? <></> : <Register />}</>}/>
              <Route path={path.SELL} element={
                  <SellRoute>
                      <Sell />
                  </SellRoute>
              } />
              <Route path={path.ADMIN} element={
                  <AdminRoute>
                      <Admin />
                  </AdminRoute>
              } />
           
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
