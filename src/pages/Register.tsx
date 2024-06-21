import axios from 'axios';
import React, { useState } from 'react'

interface FormDataType {
    username: string,
    email: string,
    password: string
}
const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({username: "", email: "", password: ""});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/auth/register', formData);
    console.log(response);
  }

  return (
    <div className='flex flex-col justify-center items-center py-20'>
      <h3 className='my-4 text-xl '>Create account - NotesTube</h3>
      <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
      <input type="text" name="username" placeholder='username' value={formData.username} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" required/>
        <input type="email" name="email" placeholder='email' value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" required/>
        <input type="password" name="password" placeholder='password' value={formData.password} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" required/>
        <button type='submit' className="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600">Sign Up</button>
      </form>
    </div>
  )
}

export default Register