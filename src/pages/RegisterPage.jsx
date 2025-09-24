// src/components/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // Import motion
import api from "../lib/axios.js";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [message, setMessage] = useState("");
  const { name, email, password, username } = formData;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        username,
      });
      setMessage("✅ Registration successful! Redirecting to login...");
      setFormData({ name: "", email: "", password: "", username: "" });
      setTimeout(() => navigate("/login"), 1500);
      console.log("User registered:", res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
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
          Create an Account
        </h1>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
              className="block w-full px-4 py-2 bg-blue-50 border border-blue-300 rounded-md text-slate-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200"
              placeholder="Enter your name"
            />
          </div>
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
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="block w-full px-4 py-2 bg-blue-50 border border-blue-300 rounded-md text-slate-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200"
              placeholder="Enter your email"
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
              minLength="6"
              className="block w-full px-4 py-2 bg-blue-50 border border-blue-300 rounded-md text-slate-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200"
              placeholder="Create a password"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, backgroundColor: "#047857" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-colors duration-200"
          >
            {loading ? "Creating Account..." : "Register"}
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-600 hover:text-sky-700 font-semibold transition-colors duration-200"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
