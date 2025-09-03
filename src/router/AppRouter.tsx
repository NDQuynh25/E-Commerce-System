import { useLocation, useRoutes } from "react-router-dom";
import { adminRoutes } from "./AdminRouter";
import LayoutAdmin from "../components/layout/LayoutAdmin";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import { roles } from "../utils/constant";
import LayoutUser from "../components/layout/LayoutUser";
import { publicRoutes } from "./PublicRouter";
import { userRoutes } from "./UserRouter";

const RequireAuth = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) => {
  const user = useAppSelector((state: RootState) => state.auth.account_info);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const pathNameCurrent = useLocation().pathname;

  if (!isAuthenticated) {
    if (pathNameCurrent.startsWith("/admin")) {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user?.role?.roleName)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: "/admin",
      element: (
        <RequireAuth allowedRoles={[roles.ADMIN]}>
          <LayoutAdmin />
        </RequireAuth>
      ),
      children: adminRoutes,
    },
    {
      path: "/",
      element: <LayoutUser />,
      children: publicRoutes,
    },
    {
      path: "/",
      element: (
        <RequireAuth allowedRoles={[roles.USER, roles.ADMIN]}>
          <LayoutUser />
        </RequireAuth>
      ),
      children: userRoutes,
    },
  ]);

  return routes;
};
export default AppRouter;
