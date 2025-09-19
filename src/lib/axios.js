import axios from "axios";

// Decide backend URL based on environment
const BASE_URL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? "https://backend-notesmanager-1.onrender.com/api"
    : "http://localhost:5001/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies along with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
