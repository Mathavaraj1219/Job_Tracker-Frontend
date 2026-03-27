import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRemindersAPI,
  addReminderAPI,
  deleteReminderAPI
} from "./reminderAPI";

// Fetch
export const fetchReminders = createAsyncThunk(
  "reminders/fetch",
  async () => {
    return await fetchRemindersAPI();
  }
);

// Add
export const addReminder = createAsyncThunk(
  "reminders/add",
  async (data) => {
    return await addReminderAPI(data);
  }
);

// Delete
export const deleteReminder = createAsyncThunk(
  "reminders/delete",
  async (id) => {
    return await deleteReminderAPI(id);
  }
);

const reminderSlice = createSlice({
  name: "reminders",
  initialState: {
    reminders: [],
    loading: false,         // for fetch
    addLoading: false,      // ✅ for add
    deleteLoading: false,   // (optional)
  },

  extraReducers: (builder) => {
    builder

      // 🔹 Fetch
      .addCase(fetchReminders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReminders.fulfilled, (state, action) => {
        state.loading = false;
        state.reminders = action.payload;
      })
      .addCase(fetchReminders.rejected, (state) => {
        state.loading = false;
      })

      // 🔹 Add
      .addCase(addReminder.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addReminder.fulfilled, (state, action) => {
        state.addLoading = false;
        state.reminders.push(action.payload);
      })
      .addCase(addReminder.rejected, (state) => {
        state.addLoading = false;
      })

      // 🔹 Delete
      .addCase(deleteReminder.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteReminder.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.reminders = state.reminders.filter(
          (r) => r.id !== action.payload
        );
      })
      .addCase(deleteReminder.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export default reminderSlice.reducer;