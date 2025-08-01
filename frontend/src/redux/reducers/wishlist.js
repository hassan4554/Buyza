import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/helper";

const initialState = {
  wishlist: (() => {
    try {
      const wishlistData = localStorage.getItem("wishlist");
      return wishlistData ? JSON.parse(wishlistData) : [];
    } catch (error) {
      console.error("Error parsing wishlist data:", error);
      return [];
    }
  })(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    updateWishlist: (state, action) => {
      try {
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
      } catch (error) {
        console.error("Error updating wishlist:", error);
        toast.error("Error updating wishlist");
      }
    },
  },
});

export const { updateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
