import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestWrapper } from "../../utils/request_wrapper";
import { server } from "../../server";

export const createEvent = createAsyncThunk(
  "createProduct",
  async ({ body = {}, header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/event/create`,
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

export const getAllEventsByShop = createAsyncThunk(
  "getAllEventsByShop",
  async ({ shopId }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/event/getAll?shopId=${shopId}`,
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

export const getAllEvents = createAsyncThunk(
  "getAllEvents",
  async ({ header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/event/getAll?shopId=${undefined}`,
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

export const deleteEvent = createAsyncThunk(
  "deleteEvent",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/event/delete?id=${id}`,
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
  allEvents: [],
  error: null,
  success: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.success = null;
    },
    updateEventsData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    //////////////////    CREATE EVENT    /////////////////////////////////
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.isLoading = false;
        state.data = [...state.data, action.payload.data];
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        console.log("Rejected");
        state.isLoading = false;
        state.error = action.payload.error;
      }),
      /////////////////////   GET ALL PRODUCTS BY SHOP    ///////////////
      builder
        .addCase(getAllEventsByShop.pending, (state) => {
          state.isLoadingByShop = true;
        })
        .addCase(getAllEventsByShop.fulfilled, (state, action) => {
          console.log("Event Fulfilled");
          state.isLoadingByShop = false;
          state.data = action.payload.data;
          state.error = null;
        })
        .addCase(getAllEventsByShop.rejected, (state) => {
          console.log("Event Rejected");
          state.isLoadingByShop = false;
          // state.error = action.payload.error;
        });
    /////////////////////   GET ALL PRODUCTS    ////////////////////
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        console.log("All Events Fulfilled");
        state.isLoading = false;
        state.allEvents = action.payload.data;
        state.error = null;
      })
      .addCase(getAllEvents.rejected, (state) => {
        console.log("All Events Rejected");
        state.isLoading = false;
        // state.error = action.payload.error;
      });
    ///////////////////   DELETE PRODUCT    ////////////////////////
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.isLoading = false;
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        console.log("Rejected");
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearErrors, clearMessages, updateEventsData } =
  eventSlice.actions;
export default eventSlice.reducer;
