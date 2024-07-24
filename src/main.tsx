import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {store} from './redux/store'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Provider } from 'react-redux';
import LoginPage from './pages/auth/login.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/login",
    element: <LoginPage/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
)
