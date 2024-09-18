import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContextType, LoginFormDataType } from "../../types";
import { useAuthContext } from "../../contexts/authContext";
import { API_ENDPOINT } from "../../constants";
import { useUserContext } from "../../contexts/userContext";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "test1@gmail.com",
    password: "Pass123",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { setUserId, user, setUser, isAuthenticated, setIsAuthenticated } =
    useAuthContext() as AuthContextType;
    const { setSavedNotes} = useUserContext();
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      setSavedNotes(user?.notes || []);
    }
  }, [user])
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

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
      const response = await axios.post(
        `${API_ENDPOINT}/auth/login`,
        formData,
        { withCredentials: true }
      );
      const { user } = response.data;

      setUserId(user._id);
      setUser(user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "something went wrong!"
      );
      console.error(error?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex lg:items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row my-8 md:my-16 lg:my-0 h-max md:w-max lg:w-full py-8 md:py-16 lg:py-0 md:px-12 lg:px-0">
        <div className="w-full relative hidden lg:block">
          <img
            src="https://plus.unsplash.com/premium_photo-1664372145591-f7cc308ff5da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"
            alt="Login background"
            className="object-cover h-full w-full max-h-[32rem]"
          />
          <div className="absolute inset-0 bg-blue-600 bg-opacity-50 flex flex-col items-center justify-center gap-4 md:gap-8 p-4">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black text-center">
              Login to NotesTube
            </h1>
            <p className="text-gray-200 text-sm md:text-base">
              From watching to understanding!!!
            </p>
          </div>
        </div>

        <div className="w-full p-6 md:p-0 lg:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-8 lg:mb-6">
            Login
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-8 lg:space-y-6">
            {errorMessage && (
              <p className="text-red-500 text-xs md:text-sm select-none">
                {errorMessage}!
              </p>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="text-sm mt-1 outline-none block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:border-transparent"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="text-sm mt-1 outline-none block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:border-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full outline-none flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-8 lg:mt-4 text-center text-xs md:text-sm text-gray-400">
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
