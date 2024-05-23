

const Home = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col justify-center gap-3'>
            <div className='text-center flex flex-col gap-3'>
                <h2 className='text-2xl text-gray-900 font-bold'>YouTube Study Notes Generator</h2>
                <p className='text-base text-gray-800'>Transform YouTube videos into concise, organized notes instantly.</p>
            </div>
            <form action="#" className='flex items-center border border-dotted border-blue-400 rounded-lg p-3 gap-3'>
                <input className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" type="text" name="video-link" placeholder='paste youtube video link here...'/>
                <button type='submit' className="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600">Generate</button>
            </form>
        </div>
    </div>
  )
}

export default Home