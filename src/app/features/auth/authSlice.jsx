import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAPI";

export const register = createAsyncThunk( "auth/register", async (data, { rejectWithValue }) => {
    try {
      return await registerUser(data);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Register failed");
    }
  }
);

export const login = createAsyncThunk( "auth/login", async ({email,password}, { rejectWithValue }) => {
    try {
      return await loginUser({email, password});
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.clear();
    }
  },

  extraReducers: (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;

      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(register.pending, (state) => {
      state.loading = true;
    })
    .addCase(register.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
},
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;