import axios from "axios";

const api = axios.create({
  baseURL: "https://bkashp2p.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
