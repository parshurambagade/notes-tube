import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const thumbnail = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWI34nEn31vZoTLiDsmv2Jt9KpjoMhwAkopA&s`;

interface Notes {
  id: string;
  date: Date;
  thumbnail: string;
  title: string;
  content: string;
}

const NotesCard: React.FC<{
  notes: Notes;
  onEdit: (notes: Notes) => void;
  onDelete: (id: string) => void;
}> = ({ notes, onEdit, onDelete }) => (
  <div className="card-body shadow-md shadow-gray-800 border border-gray-700 flex flex-col w-full bg-gray-800 rounded-lg max-h-96 overflow-hidden">
    {/* CARD TOP  */}
    <div className="card-top h-[68%]">
      <Link to={"/notes/1"}>
        <img
          src={thumbnail}
          alt={notes.title}
          className="w-full h-full  object-fit"
        />
      </Link>
    </div>

    {/* CARD BOTTOM  */}
    <div className="card-bottom h-[32%] flex flex-col gap-2 p-4">
      {/* card text  */}
      <Link to={"/notes/1"}>
        <div className=" flex justify-between items-center gap-1">
          <h3 className="text-lg font-semibold  text-gray-100">
            {notes.title}
          </h3>
          <p className="text-xs text-gray-400 ">
            {notes.date.toLocaleDateString()}
          </p>
          {/* <p className="text-sm text-gray-300 mb-0">{notes.content}</p> */}
        </div>
      </Link>

      {/* card buttons  */}
      <div className="flex justify-between">
        <button
          onClick={() => onEdit(notes)}
          className="flex items-center gap-1 text-xs px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <span>
            <FaRegEdit />
          </span>
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(notes.id)}
          className="text-xs flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
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
