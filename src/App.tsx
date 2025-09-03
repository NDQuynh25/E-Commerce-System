import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./router/AppRouter";
import "./styles/app.module.css";

function App() {
  
  return (
    <div className="content-app">
      <React.Fragment>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

export default App;
