import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/auth"} replace={true} />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;