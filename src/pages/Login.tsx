import React, { useState } from 'react'
import axios from 'axios';
import { account, ID } from '../lib/appwrite';

// const App = () => {
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');

//   async function login(email, password) {
//     await account.createEmailPasswordSession(email, password);
//     setLoggedInUser(await account.get());
//   }

//   return (
//     <div>
//       <p>
//         {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
//       </p>

//       <form>
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//         <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

//         <button type="button" onClick={() => login(email, password)}>
//           Login
//         </button>

//         <button
//           type="button"
//           onClick={async () => {
//             await account.create(ID.unique(), email, password, name);
//             login(email, password);
//           }}
//         >
//           Register
//         </button>

//         <button
//           type="button"
//           onClick={async () => {
//             await account.deleteSession('current');
//             setLoggedInUser(null);
//           }}
//         >
//           Logout
//         </button>
//       </form>
//     </div>
//   );
// };

// export default App;


interface FormDataType {
  email: string,
  password: string,
  username: string
}
const Login: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [formData, setFormData] = useState<FormDataType>({ email: "", password: "", username: ""});

  const {email, username, password} = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }



  async function login(email: string, password:string) {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  }


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/login', formData);
    console.log(response);
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
        <button type='button' onClick={() => login(email, password)} className="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600">Login</button>
        <button
          type="button"
          onClick={async () => {
            await account.create(ID.unique(), email, password, username);
            login(email, password);
          }}
        >
          Register
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.deleteSession('current');
            setLoggedInUser(null);
          }}
        >
          Logout
        </button>
      </form>
      </div>
    </div>
  )
}

export default Login