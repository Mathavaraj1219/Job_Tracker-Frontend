import axios from "../../services/axios";

export const registerUser = async ({name, email, password}) => {
  const res = await axios.post("/auth/register", {name, email, password});
  return res.data;
};

export const loginUser = async ({email, password}) => {
  const res = await axios.post("/auth/login", {email, password});
  return res.data;
};