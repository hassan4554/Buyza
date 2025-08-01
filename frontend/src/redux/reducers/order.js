import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestWrapper } from "../../utils/request_wrapper";
import { server } from "../../server";

export const getAllOrdersOfUser = createAsyncThunk(
  "getAllOrdersOfUser",
  async ({ header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/order/get-all-user`,
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

export const getAllOrdersOfShop = createAsyncThunk(
  "getAllOrdersOfShop",
  async ({ header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/order/get-all-seller`,
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

export const getOrder = createAsyncThunk(
  "getOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/order/get?id=${id}`,
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

const initialState = {
  isLoading: true,
  isLoadingByShop: false,
  data: [],
  sellerData: [],
  currentOrder: null,
  error: null,
  success: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    /////////////////////   GET ALL ORDERS OF USER    ///////////////
    builder
      .addCase(getAllOrdersOfUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfUser.fulfilled, (state, action) => {
        console.log("All Order Fulfilled");
        state.isLoading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(getAllOrdersOfUser.rejected, (state) => {
        console.log("All Order Rejected");
        state.isLoading = false;
      });
    /////////////////////   GET ALL ORDERS OF SELLER    ///////////////
    builder
      .addCase(getAllOrdersOfShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfShop.fulfilled, (state, action) => {
        console.log("All Seller Order Fulfilled");
        state.isLoading = false;
        state.sellerData = action.payload.data;
        state.error = null;
      })
      .addCase(getAllOrdersOfShop.rejected, (state) => {
        console.log("All Seller Order Rejected");
        state.isLoading = false;
      });
    /////////////////////   GET SINGLE ORDER    ///////////////
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        console.log("Order Fulfilled");
        state.isLoading = false;
        state.currentOrder = action.payload.data;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state) => {
        console.log("Order Rejected");
        state.isLoading = false;
      });
  },
});

export const { clearErrors, clearMessages } = orderSlice.actions;
export default orderSlice.reducer;
