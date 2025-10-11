import axios from "axios";

const api = axios.create({
  baseURL: "https://bkashp2p.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
