import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { path } from './utils/constant';
import './styles/app.module.css';
import SellRoute from './components/router/SellRouter';
import Admin from './router/Admin';
import Sell from './router/Sell';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LoginAdmin from './pages/auth/LoginAdmin';
import LayoutAdmin from './components/layout/LayoutAdmin';
import LayoutApp from './components/layout/LayoutApp';
import HomePage from './pages/customer/HomePage';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="content-app">
      <Fragment>
        <Router>
          <Routes>
            <Route path={path.HOME_PAGE} element={<HomePage/>} />
            <Route path={path.LOGIN} element={isAuthenticated ? <div>Already logged in</div> : <Login />} />
            <Route path={path.REGISTER} element={isAuthenticated ? <div>Already registered</div> : <Register />} />
            <Route path={path.LOGIN_ADMIN} element={<LoginAdmin />} />
            
            <Route path={path.SELL + "/*"} element={
              <SellRoute>
                <Sell />
              </SellRoute>
            } />
            <Route path={path.ADMIN } element={
              <LayoutApp>
                <LayoutAdmin>
                  <Admin />
                </LayoutAdmin>
              </LayoutApp>
             
            } />
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
