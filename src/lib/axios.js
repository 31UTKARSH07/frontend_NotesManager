import axios from "axios";

// Decide backend URL based on environment
const BASE_URL = "http://localhost:5001/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies along with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;