import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5001/api"
  : "https://backend-notesmanager-1.onrender.com/api"; // backend Render URL

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
