import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContextType, LoginFormDataType, UserContextType } from "../types";
import { useAuthContext } from "../contexts/authContext";
import { API_ENDPOINT } from "../constants";
import { useUserContext } from "../contexts/userContext";

const Login: React.FC = () => {

  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "",
    password: "",
  });

  const { userId, setUserId, authToken, setAuthToken } = useAuthContext() as AuthContextType;
  const { setUser } = useUserContext() as UserContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if(authToken) navigate('/');
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
      localStorage.setItem("userId",user._id);
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
    <div className="flex flex-col justify-center items-center py-20">

      <div>
        <h3 className="my-4 text-xl ">Login to NotesTube</h3>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          {/* <input type="text" name="username" placeholder='username' value={formData.username} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" required/> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          <button
          type="button"
          onClick={() => navigate("/register")}
        >
          Don't have account? Register here
        </button>
   
          {/* <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
