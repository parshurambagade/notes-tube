
import { DUMMY_NOTES_CONTENT } from '../../../utils/dummy-data'
import ReactQuill from 'react-quill'

const NotesContent:React.FC<{allowEdit?: boolean, content?: string}> = ({allowEdit, content}) => {
  return (
    <div className="h-full bg-gray-900 border-gray-600 max-w-full">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={() => {}}  //TODO:
          readOnly={!allowEdit} // Make the editor read-only
          style={{ border: "none" }}
          modules={{ toolbar: false }} // Hide the toolbar
        />
      </div>  
  )
}

export default NotesContent