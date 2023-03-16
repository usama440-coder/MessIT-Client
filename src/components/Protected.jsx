import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children, redirectedPath, allowedRole }) => {
  const { user, error } = useSelector((state) => state.auth);
  const role = useSelector((state) => state.auth.role);

  if (
    !user ||
    Object.keys(user).length === 0 ||
    error === "Not Authorized" ||
    !allowedRole.includes(role)
  ) {
    return <Navigate to={redirectedPath} />;
  }

  return children ? children : <Outlet />;
};

export default Protected;
