import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import jobReducer from "./features/jobs/jobSlice";
import reminderReducer from "./features/reminders/reminderSlice";
import profileReducer from "./features/profile/profileSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    reminders: reminderReducer,
    profile: profileReducer,
    users: userReducer,
  },
});