import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsSearch, BsTrash2, BsTrash3 } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/authContext'
import { API_ENDPOINT } from '../../constants'
import axios from 'axios'
import NotesCard from './components/NotesCard'
import {useNavigate} from 'react-router-dom';

interface Notes {
  id: string
  title: string
  date: string
  thumbnail: string
}

export default function Dashboard() {
  const {userId} = useAuthContext();

  const [savedNotes, setSavedNotes] = useState<Notes[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllNotes();
  }, [userId])


  const fetchAllNotes = async () => {
    try{
      const response = await axios.get(`${API_ENDPOINT}/notes/all`, {
        withCredentials: true,
      });

      setSavedNotes(response.data);


    }catch(err){
      console.error(err);
    }
  }
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <BsArrowLeft className="mr-2" size={20} />
            Back home
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Saved Notes</h2>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center" onClick={() => navigate('/')}>
            <span className="mr-2">+</span> New
          </button>
        </div>

        <div className="relative mb-6 w-full max-w-lg">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedNotes.length > 0 ? savedNotes.map((notes) => (
            <NotesCard key={notes.id} notes={{...notes, _id: notes.id}} onEdit={() => navigate(`/notes/edit/${notes?.id}`)} onDelete={() => {}} />
          )) : <p className='text-gray-400 text-2xl'>No notes found.</p>}
        </div>
      </main>
    </div>
  )
}