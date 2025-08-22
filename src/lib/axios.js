import axios from "axios";

// const BASE_URL = "https://backend-notesmanager-1.onrender.com/api"; // backend Render URL
const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://backend-notesmanager-1.onrender.com/api"
  : "http://localhost:5001/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
