import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileAPI, updateProfileAPI } from "./profileAPI";

// Fetch profile
export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfileAPI();
    } catch (err) {
      return rejectWithValue("Failed to load profile");
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "profile/update",
  async (data, { rejectWithValue }) => {
    try {
      return await updateProfileAPI(data);
    } catch (err) {
      return rejectWithValue("Failed to update profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    saving: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateProfile.pending, (state) => {
        state.saving = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.saving = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;