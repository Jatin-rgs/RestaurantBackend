import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", credentials);
      localStorage.setItem("token", res.data.jwtToken);
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Login successful!");
      navigate("/menus");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="text-center">
          <div className="flex justify-center items-center text-purple-600 font-bold text-4xl">
            <span className="bg-purple-100 px-4 py-1 rounded-md">T</span>
          </div>
          <h1 className="text-xl font-semibold mt-2">TableTrack</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 cursor-pointer text-sm text-gray-500"
              >
                👁️
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
