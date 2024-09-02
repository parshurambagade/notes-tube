import React, { useState } from "react";
import { RiAddLargeFill } from "react-icons/ri";
import NotesCard from "../components/NotesCard";

interface Notes {
  id: string;
  date: Date;
  thumbnail: string;
  title: string;
  content: string;
}


export default function DarkThemedSavedNotes() {
  const [notesArray, setNotesArray] = useState<Notes[]>([
    {
      id: "1",
      date: new Date("2023-05-20"),
      thumbnail: "/placeholder.svg?height=128&width=256",
      title: "First Note",
      content:
        "This is the content of the first note. It can be quite long and will be truncated in the card view.",
    },
    {
      id: "2",
      date: new Date("2023-05-21"),
      thumbnail: "/placeholder.svg?height=128&width=256",
      title: "Second Note",
      content:
        "This is the content of the second note. It demonstrates how longer content is handled in the card layout.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Notes | null>(null);

  const handleEdit = (notes: Notes) => {
    setEditingNote(notes);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setNotesArray(notesArray.filter((notes) => notes.id !== id));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNote) {
      setNotesArray(
        notesArray.map((notes) => (notes.id === editingNote.id ? editingNote : notes))
      );
      setIsEditModalOpen(false);
      setEditingNote(null);
    }
  };

  const handleNewNote = () => {
    const newNotes: Notes = {
      id: Date.now().toString(),
      date: new Date(),
      thumbnail: "/placeholder.svg?height=128&width=256",
      title: "New Note",
      content: "",
    };
    setEditingNote(newNotes);
    setIsEditModalOpen(true);
  };

  const filteredNotes = notesArray.filter(
    (notes) =>
      notes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notes.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4 pt-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Saved Notes</h2>
          <button
            onClick={handleNewNote}
            className="flex items-center gap-1 text-sm px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <span className="text-lg">
              <RiAddLargeFill />
            </span>
            <span>New Notes</span>
          </button>
        </div>
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-400 outline-none text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[1.1rem] w-[1.1rem] absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredNotes.map((notes) => (
            <NotesCard
              key={notes.id}
              notes={notes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        {isEditModalOpen && editingNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">
                {editingNote.id ? "Edit Note" : "New Note"}
              </h2>
              <form onSubmit={handleSaveEdit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={editingNote.title}
                      onChange={(e) =>
                        setEditingNote({
                          ...editingNote,
                          title: e.target.value,
                        })
                      }
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-2 text-gray-100 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Content
                    </label>
                    <textarea
                      id="content"
                      value={editingNote.content}
                      onChange={(e) =>
                        setEditingNote({
                          ...editingNote,
                          content: e.target.value,
                        })
                      }
                      rows={5}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-2 text-gray-100 outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-sm px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
