import React from 'react'
import { BsArrowLeft, BsSearch, BsTrash2, BsTrash3 } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'

interface Note {
  id: string
  title: string
  date: string
  thumbnail: string
}

const notes: Note[] = [
  { id: '1', title: 'First Note', date: '5/20/2023', thumbnail: 'https://static-cse.canva.com/blob/1697393/1600w-wK95f3XNRaM.jpg' },
  { id: '2', title: 'Second Note', date: '5/21/2023', thumbnail: 'https://static-cse.canva.com/blob/1697393/1600w-wK95f3XNRaM.jpg' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <a href="#" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <BsArrowLeft className="mr-2" size={20} />
            Back home
          </a>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Saved Notes</h2>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center">
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
          {notes.map((note) => (
            <div key={note.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img src={note.thumbnail} alt={note.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                <p className="text-gray-400 mb-4">{note.date}</p>
                <div className="flex justify-between">
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    <FaRegEdit size={20} className="mr-1" /> Edit
                  </button>
                  <button className="flex items-center text-red-400 hover:text-red-300 transition-colors">
                    <BsTrash3 size={18} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}