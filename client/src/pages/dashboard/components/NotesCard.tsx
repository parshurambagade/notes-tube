import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

interface NotesType {
  _id: string;
  title: string;
  thumbnail: string;
}

const NotesCard: React.FC<{
  notes: NotesType;
  onEdit: (notes: NotesType) => void;
  onDelete: (id: string) => void;
}> = ({ notes, onEdit, onDelete }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
    {/* CARD TOP  */}
    <div className="card-top h-[68%]">
      <Link to={"/notes/1"}>
        <img
          src={notes.thumbnail}
          alt={notes.title}
          className="w-full h-full object-fit"
        />
      </Link>
    </div>

    {/* CARD BOTTOM  */}
    <div className="card-bottom min-h-[32%] flex flex-col justify-between gap-2 p-4">
      {/* card text  */}
      <Link to={"/notes/1"}>
        <div className=" flex justify-between items-center gap-1">
          <h3 className="text-base font-semibold  text-gray-100">
            {notes.title}
          </h3>
        </div>
      </Link>

      {/* card buttons  */}
      <div className="flex justify-between">
        <button
          onClick={() => onEdit(notes)}
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>
            <FaRegEdit />
          </span>
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(notes._id)}
          className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
        >
          <span>
            <RiDeleteBin6Line />
          </span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  </div>
);

export default NotesCard;
