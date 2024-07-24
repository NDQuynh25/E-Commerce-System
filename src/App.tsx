import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {path} from './utils/constant';
import AdminRoute from './components/AdminRouter';
import SellRoute from './components/SellRouter';
import Admin from './router/Admin';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Fragment>
        <Router>
          <Routes>
              <Route path={path.HOME_PAGE} } />
              <Route path={path.LOGIN} />
              <Route path={path.REGISTER} element={} />
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
