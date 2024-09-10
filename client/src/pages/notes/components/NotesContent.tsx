
import { DUMMY_NOTES_CONTENT } from '../../../utils/dummy-data'
import ReactQuill from 'react-quill'

const NotesContent:React.FC<{allowEdit?: boolean}> = ({allowEdit}) => {
  return (
    <div className="h-full bg-gray-900 border-gray-600 max-w-full">
        <ReactQuill
          theme="snow"
          value={DUMMY_NOTES_CONTENT}
          onChange={() => {}}  //TODO:
          readOnly={!allowEdit} // Make the editor read-only
          style={{ border: "none" }}
          modules={{ toolbar: false }} // Hide the toolbar
        />
      </div>  
  )
}

export default NotesContent