import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRefreshTokenAction } from "../../redux/slices/authSlice";
import { message } from "antd";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { roles } from "../../utils/constant";
import { RootState } from "../../redux/store";

interface IProps {
  children: React.ReactNode;
}

const LayoutProtected = (props: IProps) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRole = useAppSelector(
    (state: RootState) => state.auth.user.role.roleName
  );
  const isRefreshToken = useAppSelector(
    (state: RootState) => state.auth.isRefreshToken
  );
  const errorRefreshToken = useAppSelector(
    (state: RootState) => state.auth.errorRefreshToken
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pathName = window.location.pathname;

  //handle refresh token error
  useEffect(() => {
    if (isRefreshToken === true) {
      localStorage.removeItem("access_token");
      message.error(errorRefreshToken);
      dispatch(setRefreshTokenAction({ status: false, message: "" }));
      navigate(pathName);
    }
  }, [isRefreshToken]);

  if (!isAuthenticated) {
    return (
      <Navigate to={"/login"} state={{ pathName: pathName }} />
    );
  }

  if (userRole !== roles.USER && userRole !== roles.ADMIN) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{props.children}</>;
};

export default LayoutProtected;
