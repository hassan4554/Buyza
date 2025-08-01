import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import sellerReducer from "./reducers/seller";
import productReducer from "./reducers/product";
import eventReducer from "./reducers/event";
import couponReducer from "./reducers/coupon";
import cartReducer from "./reducers/cart";
import wishlistReducer from "./reducers/wishlist";
import orderReducer from "./reducers/order";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    coupon: couponReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});
export default store;
