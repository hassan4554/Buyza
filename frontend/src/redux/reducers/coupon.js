import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestWrapper } from "../../utils/request_wrapper";
import { server } from "../../server";

export const createCoupon = createAsyncThunk(
  "createProduct",
  async ({ body = {}, header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/coupon/create`,
        body,
        "POST",
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

export const getAllCouponsByShop = createAsyncThunk(
  "getAllCouponsByShop",
  async ({ shopId }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/coupon/getAll?shopId=${shopId}`,
        {},
        "GET",
        "application/json"
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

export const getAllCoupons = createAsyncThunk(
  "getAllCoupons",
  async ({ header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/coupon/getAll?shopId=${undefined}`,
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

export const deleteCoupon = createAsyncThunk(
  "deleteCoupon",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/coupon/delete?id=${id}`,
        {},
        "DELETE",
        "application/json"
      );
      console.log(response);
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
  isLoadingByShop: false,
  data: [],
  allCoupons: [],
  error: null,
  success: null,
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.success = null;
    },
    updateCouponsData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    //////////////////    CREATE COUPONS    /////////////////////////////////
    builder
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.isLoading = false;
        state.data = [...state.data, action.payload.data];
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        console.log("Rejected");
        state.isLoading = false;
        state.error = action.payload.error;
      }),
      /////////////////////   GET ALL COUPONS BY SHOP    ///////////////
      builder
        .addCase(getAllCouponsByShop.pending, (state) => {
          state.isLoadingByShop = true;
        })
        .addCase(getAllCouponsByShop.fulfilled, (state, action) => {
          console.log("Event Fulfilled");
          state.isLoadingByShop = false;
          state.data = action.payload.data;
          state.error = null;
        })
        .addCase(getAllCouponsByShop.rejected, (state) => {
          console.log("Coupon Rejected");
          state.isLoadingByShop = false;
          // state.error = action.payload.error;
        });
    /////////////////////   GET ALL COUPONS    ////////////////////
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        console.log("All Coupons Fulfilled");
        state.isLoading = false;
        state.allCoupons = action.payload.data;
        state.error = null;
      })
      .addCase(getAllCoupons.rejected, (state) => {
        console.log("All Coupons Rejected");
        state.isLoading = false;
        // state.error = action.payload.error;
      });
    ///////////////////   DELETE COUPONS    ////////////////////////
    builder
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.isLoading = false;
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        console.log("Rejected");
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearErrors, clearMessages, updateCouponsData } =
  couponSlice.actions;
export default couponSlice.reducer;
