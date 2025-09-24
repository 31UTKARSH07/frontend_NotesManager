import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const { username, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      await api.post("/auth/login", {
        username,
        password,
      });

      setMessage("✅ Login successful!");
      // With HttpOnly cookies, the browser handles the token automatically.
      // No need to save anything to localStorage.
      setTimeout(() => navigate("/home"), 500); // Redirect to your protected page
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setMessage(`❌ ${errorMessage}`);
    }
  };

  // Framer Motion Variants
  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-200 p-4">
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-blue-200 transform hover:scale-[1.01] transition-transform duration-300"
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Login to Your Account
        </h1>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              required
              className="block w-full px-4 py-2 bg-blue-50 border border-blue-300 rounded-md text-slate-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="block w-full px-4 py-2 bg-blue-50 border border-blue-300 rounded-md text-slate-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, backgroundColor: "#047857" }} // Slightly bigger and darker emerald
            whileTap={{ scale: 0.98 }}
            className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-colors duration-200"
          >
            Login
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-center text-sm font-medium ${
              message.startsWith("✅") ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {message}
          </motion.p>
        )}

        <p className="mt-6 text-center text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sky-600 hover:text-sky-700 font-semibold transition-colors duration-200"
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
