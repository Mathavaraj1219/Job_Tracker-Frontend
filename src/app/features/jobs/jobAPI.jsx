import axios from "../../services/axios";

// Get all jobs
export const fetchJobsAPI = async () => {
  const res = await axios.get("/user/jobs");
  return res.data;
};

// Add job
export const addJobAPI = async (data) => {
  const res = await axios.post("/user/jobs", data);
  return res.data;
};

// Delete job
export const deleteJobAPI = async (id) => {
  await axios.delete(`/user/jobs/${id}`);
  return id;
};

//Update job
export const updateJobAPI = async (id, data) => {
    const res = await axios.put(`/user/jobs/${id}`, data);
    return res.data;
}