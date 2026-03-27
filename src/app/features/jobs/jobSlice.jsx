import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobsAPI, addJobAPI, deleteJobAPI, updateJobAPI } from "./jobAPI";

// Fetch Jobs
export const fetchJobs = createAsyncThunk("jobs/fetch", async () => {
  return await fetchJobsAPI();
});

// Add Job
export const addJob = createAsyncThunk("jobs/add", async (data) => {
  return await addJobAPI(data);
});

// Delete Job
export const deleteJob = createAsyncThunk("jobs/delete", async (id) => {
  return await deleteJobAPI(id);
});

// Update Job
export const updateJob = createAsyncThunk("jobs/update", async ({ id, data } ) =>{
    return await updateJobAPI(id, data);
})

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,       
    addLoading: false,  
    deleteLoading: false,
    updateLoading: false,
  },

  extraReducers: (builder) => {
    builder

    // 🔹 Fetch
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
      })
      
     // 🔹 Add
      .addCase(addJob.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.addLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(addJob.rejected, (state) => {
        state.addLoading = false;
      })

      // 🔹 Delete
      .addCase(deleteJob.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.jobs = state.jobs.filter(j => j.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state) => {
        state.deleteLoading = false;
      })

      // 🔹 Update
      .addCase(updateJob.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.jobs.findIndex(j => j.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state) => {
        state.updateLoading = false;
      });

  },
});

export default jobSlice.reducer;