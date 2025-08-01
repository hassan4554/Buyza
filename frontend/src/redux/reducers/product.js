import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestWrapper } from "../../utils/request_wrapper";
import { server } from "../../server";

export const createProduct = createAsyncThunk(
  "createProduct",
  async ({ body = {}, header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/product/create`,
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

export const getAllProductsByShop = createAsyncThunk(
  "getAllProductsByShop",
  async ({ shopId }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/product/getAll?shopId=${shopId}`,
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

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/product/getAll?shopId=${undefined}`,
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

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/product/delete?id=${id}`,
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
  allProducts: [],
  error: null,
  success: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.success = null;
    },
    updateProductsData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    //////////////////    CREATE PRODUCT    /////////////////////////////////
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.isLoading = false;
        state.data = [...state.data, action.payload.data];
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        console.log("Rejected");
        state.isLoading = false;
        state.error = action.payload.error;
      }),
      /////////////////////   GET ALL PRODUCTS BY SHOP    ///////////////
      builder
        .addCase(getAllProductsByShop.pending, (state) => {
          state.isLoadingByShop = true;
        })
        .addCase(getAllProductsByShop.fulfilled, (state, action) => {
          console.log("Product Fulfilled");
          state.isLoadingByShop = false;
          state.data = action.payload.data;
          state.error = null;
        })
        .addCase(getAllProductsByShop.rejected, (state) => {
          console.log("Product Rejected");
          state.isLoadingByShop = false;
          // state.error = action.payload.error;
        });
    /////////////////////   GET ALL PRODUCTS    ////////////////////
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log("All Product Fulfilled");
        state.isLoading = false;
        state.allProducts = action.payload.data;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state) => {
        console.log("All Product Rejected");
        state.isLoading = false;
        // state.error = action.payload.error;
      });
    ///////////////////   DELETE PRODUCT    ////////////////////////
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.isLoading = false;
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.log("Rejected");
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearErrors, clearMessages, updateProductsData } =
  productSlice.actions;
export default productSlice.reducer;
