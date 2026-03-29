import axios from "../../services/axios";


export const fetchUsersAPI = async () => {
  const res = await axios.get("/admin/users");
  return res.data;

};
