import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import { AuthContextType, RegisterFormDataType, User, UserContextType } from "../types";
import { useAuthContext } from "../contexts/authContext";
import { useUserContext } from "../contexts/userContext";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormDataType>({
    email: "",
    password: "",
    username: "",
  });

  const {authToken, setAuthToken, userId, setUserId} = useAuthContext() as AuthContextType;
  const { setUser } = useUserContext() as UserContextType;

  useEffect(() => {
    if(authToken) navigate('/');
  }, [])

  useEffect(() => {
    console.log(`Logged in user: ${JSON.stringify(userId)}`);
  }, [userId]);

  const navigate = useNavigate();
  const { email, username, password } = formData;

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
        formData
      );
      console.log(response);
      const { user, token, message } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId",user._id);
      setUserId(user._id);
      setAuthToken(token);
      setUser(user);
      navigate("/");
    } catch (err) {
      alert(err.message);
      throw err;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-20">
      <p>
        {userId
          ? `Logged in as ${userId?.username}`
          : "Not logged in"}
      </p>

      <div>
        <h3 className="my-4 text-xl ">Login to NotesTube</h3>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500"
            required
          />
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
