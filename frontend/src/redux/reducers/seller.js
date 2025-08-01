import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestWrapper } from "../../utils/request_wrapper";
import { server } from "../../server";

export const get_shop = createAsyncThunk(
  "get_shop",
  async ({ header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/shop/get`,
        {},
        "GET",
        header
      );
      if (response.status === 200) {
        return response.data;
      }
      throw response;
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : { status: 500, message: "Something went wrong" }
      );
    }
  }
);

const initialState = {
  isLoading: true,
  isSeller: false,
  seller: null,
  error: null,
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    logoutSeller: (state) => {
      state.isLoading = false;
      state.seller = null;
      state.isSeller = false;
      state.error = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_shop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_shop.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.isSeller = true;
        state.isLoading = false;
        state.seller = action.payload.data;
        state.error = null;
      })
      .addCase(get_shop.rejected, (state, action) => {
        console.log("Rejected");
        state.isLoading = false;
        state.error = action.payload.error;
        state.isSeller = false;
      });
  },
});

export const { logoutSeller, clearErrors, clearMessages } = sellerSlice.actions;
export default sellerSlice.reducer;
