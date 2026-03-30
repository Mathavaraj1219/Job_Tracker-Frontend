import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRemindersAPI,
  addReminderAPI,
  deleteReminderAPI,
  updateReminderAPI
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

//Update
export const updateReminder = createAsyncThunk(
  "reminders/update",
  async ({id, data}) => {
    return await updateReminderAPI(id, data);
  }
)

const reminderSlice = createSlice({
  name: "reminders",
  initialState: {
    reminders: [],
    loading: false, 
    addLoading: false,   
    deleteLoading: false,
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
        const newReminder = action.meta.arg;

        state.reminders.push({
          id: action.payload.id,
          ...newReminder
        });
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
      })
      .addCase(updateReminder.fulfilled, (state, action) => {
        const updatedData = action.meta.arg;

        const index = state.reminders.findIndex(r => r.id === updatedData.id);

        if (index !== -1) {
          state.reminders[index] = {
            ...state.reminders[index],
            ...updatedData.data
          };
        }
      });
  },
});

export default reminderSlice.reducer;