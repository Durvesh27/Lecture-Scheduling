import axios from "axios";

const token = JSON.parse(localStorage.getItem("Token"));
if (token) {
  var api = axios.create({
    baseURL: "https://lecture-scheduling-backend-41oh.onrender.com",
    headers: { Authorization: `Bearer${token}` },
  });
} else {
  var api = axios.create({
    baseURL: "https://lecture-scheduling-backend-41oh.onrender.com",
  });
}
export default api;