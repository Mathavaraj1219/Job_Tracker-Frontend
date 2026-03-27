import axios from "../../services/axios";

export const getProfileAPI = async () => {
  const res = await axios.get("/user/profile");
  return res.data;
};

export const updateProfileAPI = async (data) => {
  const res = await axios.put("/user/profile", data);
  return res.data;
};