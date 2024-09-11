import { DUMMY_NOTES_TITLE } from "../../../utils/dummy-data";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiSave } from "react-icons/fi";

const NotesHeader: React.FC<{ isSaved?: boolean, title: string }> = ({ isSaved, title}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
      <h2 className="text-xl font-semibold">{title || DUMMY_NOTES_TITLE}</h2>
      <div className="flex gap-2">
        <button className="text-blue-400 hover:text-blue-300 mr-2">
          <FaRegEdit size={20} />
        </button>
        <button className="text-green-400 hover:text-green-300">
          <FiSave size={20} />
        </button>
      </div>
    </div>
  );
};

export default NotesHeader;
