import { DUMMY_NOTES_TITLE } from "../../../utils/dummy-data";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiSave } from "react-icons/fi";
import { useCurrentNotesContext } from "../../../contexts/currentNotesContext";
import { GrFormViewHide } from "react-icons/gr";
import { VscOpenPreview } from "react-icons/vsc";

const NotesHeader: React.FC<{
  isSaved?: boolean;
  title: string;
  setAllowEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  allowEditing?: boolean;
}> = ({ isSaved, title, setAllowEditing, allowEditing }) => {

  const {notes} = useCurrentNotesContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/notes/edit`);
  }

  const handleView = () => {
    navigate('/');
  }
  return (
    <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
      <h2 className="text-xl font-semibold">{notes?.title}</h2>
      <div className="flex gap-2">
        {!allowEditing ? (
          <button
            className="text-blue-400 hover:text-blue-300 mr-2"
            onClick={handleEdit}
          >
            <FaRegEdit size={20} />
          </button>
        ) : (
          <button
            className="text-blue-400 hover:text-blue-300 mr-2"
            onClick={handleView}
          >
            <VscOpenPreview size={20} />
          </button>
        )}

        <button className="text-green-400 hover:text-green-300">
          <FiSave size={20} />
        </button>
      </div>
    </div>
  );
};

export default NotesHeader;
