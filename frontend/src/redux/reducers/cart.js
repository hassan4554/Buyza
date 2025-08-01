import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/helper";

const initialState = {
  cart: (() => {
    try {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return [];
    }
  })(),
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

      try {
        const localStorageData = getFromLocalStorage("cart");
        let data = localStorageData ? JSON.parse(localStorageData) : [];
        data = [...data, item];
        setToLocalStorage("cart", JSON.stringify(data));
        state.cart = [...state.cart, item];
        toast.success("Item added to cart successfully!");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Error adding item to cart");
      }
    },

    removeFromCart: (state, action) => {
      try {
        const data = state.cart.filter((i) => i.id !== action.payload);
        state.cart = [...data];
        setToLocalStorage("cart", JSON.stringify(data));
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    },

    updateQuantity: (state, action) => {
      try {
        const { id, quantity } = action.payload;
        const updatedCart = state.cart.map((item) =>
          item.id === id ? { ...item, qty: quantity } : item
        );
        state.cart = updatedCart;
        setToLocalStorage("cart", JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    },

    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, emptyCart } =
  cartSlice.actions;
export default cartSlice.reducer;
