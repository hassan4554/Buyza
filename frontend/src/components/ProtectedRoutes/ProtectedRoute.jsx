import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Layout/Loader";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};
