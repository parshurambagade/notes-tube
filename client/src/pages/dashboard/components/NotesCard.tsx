import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmationModal from "../../../components/modals/DeleteConfirmationModal";

interface NotesType {
  _id: string;
  title: string;
  thumbnail: string;
}

const NotesCard: React.FC<{
  notes: NotesType;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ notes, onEdit, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="card-top aspect-video">
        <img
          src={notes.thumbnail}
          alt={notes.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="card-bottom p-4 flex flex-col justify-between gap-2">
        <div className="flex justify-between items-center gap-1">
          <h3 className="text-sm sm:text-base font-semibold text-gray-100 line-clamp-2">
            {notes.title}
          </h3>
        </div>

        <div className="flex justify-between mt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit();
            }}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            <FaRegEdit />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            <RiDeleteBin6Line />
            <span>Delete</span>
          </button>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={(e) => {
          e.preventDefault();
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleConfirmDelete}
        noteTitle={notes.title}
      />
    </div>
  );
};

export default NotesCard;