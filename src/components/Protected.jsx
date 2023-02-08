import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children, redirectedPath }) => {
  const { user, error } = useSelector((state) => state.auth);

  if (!user || Object.keys(user).length === 0 || error === "Not Authorized") {
    return <Navigate to={redirectedPath} />;
  }

  return children ? children : <Outlet />;
};

export default Protected;
