import axios from "../../services/axios";

// Get reminders
export const fetchRemindersAPI = async () => {
  const res = await axios.get("/reminders");
  return res.data;
};

// Add reminder
export const addReminderAPI = async (data) => {
  const res = await axios.post("/reminders", data);
  return res.data;
};

// Delete reminder
export const deleteReminderAPI = async (id) => {
  await axios.delete(`/reminders/${id}`);
  return id;
};