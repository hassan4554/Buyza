import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Layout/Loader";

export const SellerProtectedRoute = () => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  if (isLoading) return <Loader />;
  if (!isSeller) return <Navigate to="/shop/login" replace />;

  return <Outlet />;
};
