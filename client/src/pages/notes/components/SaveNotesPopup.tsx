import React, { useState } from 'react';
import { SaveNotesPopupProps } from '../../../types';

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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 border border-zinc-600">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Save Note</h2>
        <label className="block mb-2">
          <span className="text-zinc-400">Notes Name</span>
          <input
            type="text"
            className="mt-1 block w-full p-2 border outline-none bg-zinc-700 border-zinc-700 rounded-md focus:outline-none "
            value={notesName}
            onChange={(e) => setnotesName(e.target.value)}
            placeholder="Enter note name"
          />
        </label>

        
        <div className="flex justify-end">
          <button
            className="mr-2 hover:bg-zinc-700 bg-zinc-600 text-white px-4 py-2 rounded-md focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-700 px-4 py-2 rounded-md focus:outline-none"
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
