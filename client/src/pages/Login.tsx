import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContextType, LoginFormDataType, UserContextType } from "../types";
import { useAuthContext } from "../contexts/authContext";
import { API_ENDPOINT } from "../constants";
import { useUserContext } from "../contexts/userContext";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "",
    password: "",
  });

  const { userId, setUserId, authToken, setAuthToken } =
    useAuthContext() as AuthContextType;
  const { setUser } = useUserContext() as UserContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) navigate("/");
  }, []);

  const { email, password } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, formData);
      const { user, token } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user._id);
      setAuthToken(token);
      setUserId(user._id);
      setUser(user);
      navigate("/");
      console.log("Logged in user: ", userId);
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-4xl w-full flex">
        {/* Left side - Image and Text */}
        <div className="w-1/2 relative hidden md:block">
          <img
            src="https://plus.unsplash.com/premium_photo-1664372145591-f7cc308ff5da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"
            alt="Login background"
            className="object-cover h-full w-full max-h-[32rem]"
          />
          <div className="absolute inset-0 bg-blue-600 bg-opacity-50 flex flex-col items-center justify-center gap-8">
            <h1 className="text-white text-6xl font-black text-center text-wrap">
              Login to NotesTube
            </h1>
            <p className="text-gray-200">From watching to understanding!!!</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Login</h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 outline-none block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:border-transparent"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 outline-none block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:border-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full outline-none flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
