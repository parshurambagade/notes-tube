import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmationModal from "../../../components/modals/DeleteConfirmationModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
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
      {/* CARD TOP  */}
      <div className="card-top h-[68%]">
        <img
          src={notes.thumbnail}
          alt={notes.title}
          className="w-full h-full object-fit"
        />
      </div>

      {/* CARD BOTTOM  */}
      <div className="card-bottom min-h-[32%] flex flex-col justify-between gap-2 p-4">
        {/* card text  */}
        <div className=" flex justify-between items-center gap-1">
          <h3 className="text-base font-semibold  text-gray-100">
            {notes.title}
          </h3>
        </div>

        {/* card buttons  */}
        <div className="flex justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit();
            }}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>
              <FaRegEdit />
            </span>
            <span>Edit</span>
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
          >
            <span>
              <RiDeleteBin6Line />
            </span>
            <span>Delete</span>
          </button>
        </div>
      </div>
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={(e) => { e.preventDefault(); setIsDeleteModalOpen(false)}} onConfirm={handleConfirmDelete} noteTitle={notes.title} />
    </div>
  );
};

export default NotesCard;
