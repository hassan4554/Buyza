import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/helper";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i.id === item.id);

      if (isItemExist) {
        toast.error("Item already in cart");
        return;
      }

      const localStorageData = getFromLocalStorage("cart");
      let data = localStorageData ? JSON.parse(localStorageData) : [];
      data = [...data, item];
      setToLocalStorage("cart", JSON.stringify(data));
      state.cart = [...state.cart, item];
      toast.success("Item added to cart successfully!");
    },

    removeFromCart: (state, action) => {
      const data = state.cart.filter((i) => i.id !== action.payload);
      state.cart = [...data];
      setToLocalStorage("cart", JSON.stringify(data));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, qty: quantity } : item
      );
      state.cart = updatedCart;
      setToLocalStorage("cart", JSON.stringify(updatedCart));
    },

    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, emptyCart } =
  cartSlice.actions;
export default cartSlice.reducer;
