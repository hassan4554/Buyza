import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestWrapper } from "../../utils/request_wrapper";
import { server } from "../../server";

export const get_user = createAsyncThunk(
  "get_user",
  async ({ header = "application/json" }, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/user/get-user`,
        {},
        "GET",
        header
      );
      return response.status === 200
        ? response.data
        : (() => {
            throw response;
          })();
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : { status: 500, message: "Something went wrong" }
      );
    }
  }
);

export const update_user = createAsyncThunk(
  "update_user",
  async (body, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/user/update`,
        body,
        "PATCH",
        "application/json"
      );
      return response.status === 200
        ? response.data
        : (() => {
            throw response;
          })();
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : { status: 500, message: "Something went wrong" }
      );
    }
  }
);

export const update_password = createAsyncThunk(
  "update_password",
  async (body, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/user/update-password`,
        body,
        "PATCH",
        "application/json"
      );
      return response.status === 200
        ? response.data
        : (() => {
            throw response;
          })();
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : { status: 500, message: "Something went wrong" }
      );
    }
  }
);

export const add_address = createAsyncThunk(
  "add_address",
  async (body, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/user/add-address`,
        body,
        "PATCH",
        "application/json"
      );
      return response.status === 200
        ? response.data
        : (() => {
            throw response;
          })();
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : { status: 500, message: "Something went wrong" }
      );
    }
  }
);

export const delete_address = createAsyncThunk(
  "delete_address",
  async (id, { rejectWithValue }) => {
    try {
      const response = await requestWrapper(
        `${server}/user/delete-address?id=${id}`,
        {},
        "DELETE",
        "application/json"
      );
      return response.status === 200
        ? response.data
        : (() => {
            throw response;
          })();
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
  loading: true,
  isAuthenticated: false,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
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
    //////////////////////    GET USER      ///////////////////////////////
    builder
      .addCase(get_user.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_user.fulfilled, (state, action) => {
        console.log("User Fulfilled");
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(get_user.rejected, (state, action) => {
        console.log("User Rejected");
        state.loading = false;
        state.error = action.payload.error;
        state.isAuthenticated = false;
      });
    ////////////////    UPDATE USER   //////////////////////////////////
    builder
      .addCase(update_user.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_user.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.loading = false;
        state.user = action.payload.data;
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(update_user.rejected, (state, action) => {
        console.log("Rejected");
        state.loading = false;
        state.error = action.payload.error;
      });
    ////////////////    UPDATE PASSWORD   //////////////////////////////////
    builder
      .addCase(update_password.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_password.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.loading = false;
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(update_password.rejected, (state, action) => {
        console.log("Rejected");
        state.loading = false;
        state.error = action.payload.error;
      });
    ////////////////    UPDATE ADDRESS   //////////////////////////////////
    builder
      .addCase(add_address.pending, (state) => {
        state.loading = true;
      })
      .addCase(add_address.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.loading = false;
        state.successMessage = action.payload.message;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(add_address.rejected, (state, action) => {
        console.log("Rejected");
        state.loading = false;
        state.error = action.payload.error;
      });
    ////////////////    DELETE ADDRESS   //////////////////////////////////
    builder
      .addCase(delete_address.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_address.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.loading = false;
        state.successMessage = action.payload.message;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(delete_address.rejected, (state, action) => {
        console.log("Rejected");
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { logout, clearErrors, clearMessages } = userSlice.actions;
export default userSlice.reducer;
