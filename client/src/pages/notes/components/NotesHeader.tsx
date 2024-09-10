
import { DUMMY_NOTES_TITLE } from '../../../utils/dummy-data'
import { useNavigate } from 'react-router-dom'
import { FaBookmark, FaRegBookmark, FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const NotesHeader:React.FC<{isSaved?: boolean}> = ({isSaved}) => {
    const navigate = useNavigate();
  return (
    <div className="notes-header bg-gray-800 rounded-t-lg border-gray-700 w-full flex justify-between items-center p-4">

        <div className="flex gap-2 items-center">
        <p className="text-gray-300 font-bold text-xl">{DUMMY_NOTES_TITLE}</p>
        </div>

        {/* card buttons  */}
        <div className="flex w-max justify-between gap-4">
            {/* TODO: */}
          <button onClick={() => {navigate('/edit-notes/' + 1)}} className="flex items-center gap-1 text-xs px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            <span>
              <FaRegEdit />
            </span>
            <span>Edit</span>
          </button>
          
          {isSaved 
            ?
          <button onClick={() => confirm("Delete notes?")} className="text-xs flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
            <span>
              <RiDeleteBin6Line />
            </span>
            <span>Delete</span>
          </button>
          : 
          <button onClick={() => confirm("Save notes?")} className="text-xs flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            <span>
            <FaRegBookmark className='text-white' />
            </span>
            <span>Save</span>
          </button>}


        </div>
      </div>
  )
}

export default NotesHeader