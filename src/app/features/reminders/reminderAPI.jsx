import axios from "../../services/axios";

// Get reminders
export const fetchRemindersAPI = async () => {
  const res = await axios.get("/user/reminders");
  return res.data;
};

// Add reminder
export const addReminderAPI = async (data) => {
  const res = await axios.post("/user/reminders", data);
  return res.data;
};

// Delete reminder
export const deleteReminderAPI = async (id) => {
  await axios.delete(`/user/reminders/${id}`);
  return id;
};

//Update reminder
export const updateReminderAPI = async (id, data) => {
  const res = await axios.put(`/user/reminder/${id}`, data);
  return res.data;
}