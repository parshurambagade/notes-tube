import React, { useState } from 'react';
import { SaveNotesPopupProps } from '../types';

const SaveNotesPopup: React.FC<SaveNotesPopupProps> = ({  onSave, onClose, videoTitle }) => {
  const [notesName, setnotesName] = useState(videoTitle || "");


  const handleSave = async () => {
    if (notesName.trim()) {
      
      onSave({
        notesName
      });
    } else {
      alert('Please enter a name for the notes.');
    }
  };
  

  return (  
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Save Note</h2>
        <label className="block mb-2">
          <span className="text-gray-700">Note Name</span>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={notesName}
            onChange={(e) => setnotesName(e.target.value)}
            placeholder="Enter note name"
          />
        </label>

        
        <div className="flex justify-end">
          <button
            className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveNotesPopup;
