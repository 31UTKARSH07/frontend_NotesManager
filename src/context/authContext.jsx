import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../lib/axios";

const AuthContext = createContext();

export const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const { user, accessToken } = response.data.data;

      setUser(user);
      setAccessToken(accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      throw error; // Re-throw so UI can handle the error
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post("/register", { name, email, password });
      const { user, accessToken } = response.data.data;

      setUser(user);
      setAccessToken(accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Registration failed",
        error.response?.data || error.message
      );
      throw error; // Re-throw so UI can handle the error
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
    } finally {
      setUser(null);
      setAccessToken("");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
    </AuthContext.Provider>
  );
};

export default AuthContext;
