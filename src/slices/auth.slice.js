import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  loading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  error: "",
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authService.login(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = "";
      localStorage.clear("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.user = {};
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = {};
        state.error = action.payload.message;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
export const { logout } = authSlice.actions;
