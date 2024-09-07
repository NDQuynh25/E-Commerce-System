import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRefreshTokenAction } from "../../redux/slices/authSlice";
import { message } from "antd";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { role } from "../../utils/constant";
import { RootState } from "../../redux/store";

interface IProps {
    children: React.ReactNode
}

const LayoutApp = (props: IProps) => {
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    const userRole = useAppSelector((state: RootState) => state.auth.user.role.name);
    const isRefreshToken = useAppSelector(state => state.auth.isRefreshToken);
    const errorRefreshToken = useAppSelector(state => state.auth.errorRefreshToken);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    //handle refresh token error
    useEffect(() => {
        if (isRefreshToken === true) {
            localStorage.removeItem('access_token')
            message.error(errorRefreshToken);
            dispatch(setRefreshTokenAction({ status: false, message: "" }))
            navigate('/login');
        }
        
    }, [isRefreshToken]);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" />;
      }
    
    if (userRole !== role.ADMIN) {
        return <Navigate to="/unauthorized" />;
    }
    
    return (
        <>
            {props.children}
        </>
    )
}

export default LayoutApp;