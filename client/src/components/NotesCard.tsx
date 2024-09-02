import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    <div className="card-body flex flex-col w-full bg-gray-800 rounded-lg h-96 overflow-hidden">
      <div className="card-top h-[65%]">
        <img
          src={thumbnail}
          alt={notes.title}
          className="w-full h-full  object-fit"
        />
      </div>
      <div className="card-bottom h-[35%]">
  
        {/* card text  */}
        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-lg font-semibold  text-gray-100">
            {notes.title}
          </h3>
          <p className="text-xs text-gray-400 ">
            {notes.date.toLocaleDateString()}
          </p>
          {/* <p className="text-sm text-gray-300 mb-0">{notes.content}</p> */}
        </div>
  
        {/* card buttons  */}
        <div className="flex justify-between p-4">
        <button
          onClick={() => onEdit(notes)}
          className="flex items-center gap-1 text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <span>
            <FaRegEdit />
          </span>
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(notes.id)}
          className="text-sm flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
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