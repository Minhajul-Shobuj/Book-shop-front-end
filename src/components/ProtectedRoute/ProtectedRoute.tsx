import { ReactNode } from "react";
import {
  useCurrentToken,
  useCurrentUser,
} from "../../redux/features/auth/AuthSlice";
import { useAppSelector } from "../../redux/hook";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  roles: string[];
};
const ProtectedRoute = ({ children, roles }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
