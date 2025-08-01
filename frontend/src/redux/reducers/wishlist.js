import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/helper";

const initialState = {
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    updateWishlist: (state, action) => {
      const id = action.payload;
      const isItemExist = state.wishlist.find((i) => i === id);
      let data;

      if (isItemExist) {
        data = state.wishlist.filter((i) => i !== id);
        state.wishlist = [...data];
        toast.success("Item removed from wishlist");
      } else {
        const localStorageData = getFromLocalStorage("wishlist");
        data = localStorageData ? JSON.parse(localStorageData) : [];
        data = [...data, id];
        state.wishlist = [...state.wishlist, id];
        toast.success("Item added to wishlist successfully!");
      }
      setToLocalStorage("wishlist", JSON.stringify(data));
    },
  },
});

export const { updateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
