import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT, LOGIN_BACKGROUND_IMAGE } from "../../constants";
import { AuthContextType, RegisterFormDataType } from "../../types";
import { useAuthContext } from "../../contexts/authContext";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormDataType>({
    email: "",
    password: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser, setUserId, setIsAuthenticated, isAuthenticated } =
    useAuthContext() as AuthContextType;
  const navigate = useNavigate();

  const { email, username, password } = formData;

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [navigate, isAuthenticated]);

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
        `${API_ENDPOINT}/auth/register`,
        formData,
        { withCredentials: true }
      );
      const { user } = response.data;
      setUser(user);
      setUserId(user._id);
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
      <div className="bg-gray-800 h-max rounded-xl shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row md:w-max  py-8 md:py-16 lg:py-6 md:px-12 lg:w-full mt-8 md:mt-16 lg:mt-0">
        <div className="w-full md:w-1/2 relative hidden lg:block">
          <img
            src={LOGIN_BACKGROUND_IMAGE}
            alt="Login background"
            className="object-cover h-full w-full max-h-[32rem]"
          />
          <div className="absolute inset-0 bg-blue-600 bg-opacity-50 flex flex-col items-center justify-center gap-4 md:gap-8 p-4">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black text-center">
              Register to NotesTube
            </h1>
            <p className="text-gray-200 text-sm md:text-base">From watching to understanding!!!</p>
          </div>
        </div>

        <div className="w-full p-6 md:p-0 lg:p-8 ">
          <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-8 lg:mb-4">Register</h2>
          {errorMessage && (
            <p className="text-red-500 text-xs md:text-sm select-none my-4">
              {errorMessage}!
            </p>
          )}
          <form onSubmit={handleFormSubmit} className="space-y-8 md:space-y-6 w-full">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                required
                className="text-sm outline-none mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:border-transparent"
                placeholder="Enter your username"
                value={username}
                onChange={handleInputChange}
              />
            </div>
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
                className="text-sm outline-none mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:border-transparent"
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
                className="text-sm outline-none mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:border-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="outline-none w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-8 lg:mt-4 text-center text-xs md:text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;