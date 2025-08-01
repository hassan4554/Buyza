import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_user } from "./redux/reducers/user";
import { get_shop } from "./redux/reducers/seller";
import { getAllProducts } from "./redux/reducers/product";
import {
  SignupPage,
  LoginPage,
  ActivationPage,
  HomePage,
  FAQPage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  OrderSuccessPage,
  PaymentPage,
  ShopCreatPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox
} from "./routes/routes";
import Loader from "./components/Layout/Loader";
import { ProtectedRoute } from "./components/ProtectedRoutes/ProtectedRoute";
import { SellerProtectedRoute } from "./components/ProtectedRoutes/SellerProtectedRoute";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  ShopCreateCoupon,
  ShopAllCoupons,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
  ShopInboxPage,
} from "./routes/shop.routes";
import { getAllEvents } from "./redux/reducers/event";
import { getAllCoupons } from "./redux/reducers/coupon";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { requestWrapper } from "./utils/request_wrapper";
import { server } from "./server";

function App() {
  const dispatch = useDispatch();
  const [stripeApikey, setStripeApiKey] = useState("");
  const { loading: userLoading } = useSelector((state) => state.user);
  const { isLoading: sellerLoading } = useSelector((state) => state.seller);
  const { isLoading: productsLoading } = useSelector((state) => state.product);
  const { isLoading: eventsLoading } = useSelector((state) => state.event);
  const { isLoading: couponsLoading } = useSelector((state) => state.coupon);

  async function getStripeApikey() {
    const res = await requestWrapper(
      `${server}/payment/stripe-api-key`,
      {},
      "GET",
      "application/json"
    );
    if (res.status === 200) {
      setStripeApiKey(res.data.data);
      return;
    }
  }
  useEffect(() => {}, [
    userLoading,
    productsLoading,
    sellerLoading,
    eventsLoading,
    couponsLoading,
  ]);

  useEffect(() => {
    dispatch(get_user({}));
    dispatch(get_shop({}));
    dispatch(getAllProducts({}));
    dispatch(getAllEvents({}));
    dispatch(getAllCoupons({}));
    getStripeApikey();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        theme="colored"
        draggable
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        newestOnTop={false}
        rtl={false}
      />
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/payment" element={<PaymentPage />} />
            </Route>
          </Routes>
        </Elements>
      )}

      {sellerLoading ||
      userLoading ||
      productsLoading ||
      eventsLoading ||
      couponsLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/activation/:token" element={<ActivationPage />} />
          <Route path="/shop">
            <Route path="create" element={<ShopCreatPage />} />
            <Route
              path="activation/:token"
              element={<ActivationPage type="shop" />}
            />
            <Route path="login" element={<ShopLoginPage />} />
            <Route path=":id" element={<ShopHomePage />} />
            <Route path="preview/:id" element={<ShopPreviewPage />} />
          </Route>
          <Route element={<SellerProtectedRoute />}>
            <Route path="/settings" element={<ShopSettingsPage />} />
            <Route path="/order/:id" element={<ShopOrderDetails />} />
            <Route path="/dashboard">
              <Route path="" element={<ShopDashboardPage />} />
              <Route path="create-product" element={<ShopCreateProduct />} />
              <Route path="products" element={<ShopAllProducts />} />
              <Route path="create-event" element={<ShopCreateEvent />} />
              <Route path="events" element={<ShopAllEvents />} />
              <Route path="create-coupons" element={<ShopCreateCoupon />} />
              <Route path="coupons" element={<ShopAllCoupons />} />
              <Route path="orders" element={<ShopAllOrders />} />
              <Route path="refunds" element={<ShopAllRefunds />} />
              <Route
                path="withdraw-money"
                element={<ShopWithdrawMoneyPage />}
              />
              <Route path="messages" element={<ShopInboxPage />} />
            </Route>
          </Route>
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/inbox" element={<UserInbox />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/success" element={<OrderSuccessPage />} />
            <Route path="/user/order">
              <Route path=":id" element={<OrderDetailsPage />} />
              <Route path="track/:id" element={<TrackOrderPage />} />
            </Route>
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
