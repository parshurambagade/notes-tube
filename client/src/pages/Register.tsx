import React, { useState } from 'react'
import axios from 'axios';
import { account, ID } from '../appwrite/config';
import { useNavigate } from 'react-router-dom';


interface FormDataType {
  email: string,
  password: string,
  username: string
}

const Register: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [formData, setFormData] = useState<FormDataType>({ email: "", password: "", username: ""});

  const navigate = useNavigate();
  const {email, username, password} = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }



  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response =  await account.create(ID.unique(), email, password, username);
      const user = await account.createEmailPasswordSession(email, password);
      navigate('/');
      setLoggedInUser(user);
      console.log(loggedInUser); 
    }catch(error){
      alert(error.message);
      throw error;
    }
  }

  return (
    <div className='flex flex-col justify-center items-center py-20'>
      <p>
        {loggedInUser ? `Logged in as ${loggedInUser.username}` : 'Not logged in'}
      </p>

      <div>
      <h3 className='my-4 text-xl '>Login to NotesTube</h3>
      <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
        <input type="text" name="username" placeholder='username' value={formData.username} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" required/>
        <input type="email" name="email" placeholder='email' value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" required/>
        <input type="password" name="password" placeholder='password' value={formData.password} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" required/>
        <button type='submit' className="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600">Register</button>
      </form>
      </div>
    </div>
  )
}

export default Register