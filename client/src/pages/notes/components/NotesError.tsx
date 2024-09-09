import React from 'react'

const NotesError = () => {
  return (
    <div className="border border-zinc-700 bg-zinc-800 p-6 my-6 rounded-lg">
        <h3 className="text-2xl text-red-500 font-bold">🤧 Unable to Generate Notes!</h3>
        <ul className="list-disc list-inside">
          <li>The video length must not exceed 40 minutes.</li>
          <li>Only English-language videos are supported.</li>
          <li>If the video is in another language, it should be no longer than 10 minutes.</li>
        </ul>
      </div>
  )
}

export default NotesError