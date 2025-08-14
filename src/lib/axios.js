import axios from "axios";

const BASE_URL = "https://your-backend-name.onrender.com/api";
; // backend Render URL

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
