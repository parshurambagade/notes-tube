import React from 'react'

const NotesContainer: React.FC = () => {
  return (
    <div className=' my-8 flex justify-center mx-20 gap-8'>
        {/* CONTAINER FOR VIDEO */}
        <div className='w-1/3 border shadow-md rounded-lg'>
            <div className='bg-slate-100 py-2  text-center'>
                <p>YouTube Video</p>
            </div>
            <div className='w-full p-6'>   
                <iframe className='w-full aspect-video' src="https://www.youtube.com/embed/K5Y4QoBR1tw?si=MIoTuAxHu4UgjPi0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className='px-6 flex flex-col gap-4'>
                <div className='mb-4'>
                    <h5 className='font-bold text-lg'>ChatGPT for Content Creation 2024 - Ansh Mehra at Nas Summit Singapore</h5>
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='flex justify-between'>
                        <span>Author</span>
                        <span>Ansh Mehra</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Video Length</span>
                        <span>12 mins 23 secs</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Read Time</span>
                        <span>1 min 15 secs</span>
                    </div>
                </div>
            </div>
        </div>

        {/* CONTAINER FOR NOTES AND SUMMARY  */}
        <div className='w-2/3 h-full overflow-hidden border shadow-md rounded-lg px-8 py-4 '>
            <div className='flex justify-between mb-6'>
                <div className='flex gap-4 bg-slate-100 px-4 py-2'>
                    <button className='px-4 py-2 rounded text-blue-400 bg-white hover:bg-blue-400 hover:text-white focus:outline-none shadow-sm'>Notes</button>
                    <button>Summary</button>
                    <button>Transcript</button>
                </div>
                <div>
                    {/* TODO: add notes icon */}
                    <button className='px-4 py-2 rounded text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600'>Save as Note</button>
                </div>
            </div>

            <div className='h-[30rem] overflow-y-scroll'>
            <div className="h-full mx-auto  bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Using AI in Content Creation</h1>
        
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>AI technology has significantly transformed the field of content creation. This guide outlines practical uses of AI tools to enhance productivity and reach a broader audience.</p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Points</h2>
            <ul className="list-disc pl-5">
                <li>Real-time animation of static images using AI.</li>
                <li>Generation of multilingual content to expand reach.</li>
                <li>Transition from new AI tools to AI integration in existing tools (e.g., Premiere Pro, Gmail).</li>
                <li>Shift from prompt engineering to idea-based outputs.</li>
                <li>Repurposing content across different platforms using AI.</li>
            </ul>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Flowchart of AI in Content Creation</h2>
            <ol className="list-decimal pl-5">
                <li>Human defines the problem and provides the context.</li>
                <li>Human gives a prompt to the AI.</li>
                <li>AI generates an initial result.</li>
                <li>Human refines and builds on the AI-generated content.</li>
                <li>Final content delivery by human.</li>
            </ol>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">AI Tools and Techniques</h2>
            <h3 className="text-xl font-semibold mb-4">Boosting YouTube Performance Using ChatGPT</h3>
            <p>With ChatGPT Plus ($20/month), you can utilize data analysis to enhance your YouTube metrics:</p>
            <ol className="list-decimal pl-5">
                <li>Download the CSV file from YouTube Studio.</li>
                <li>Prompt: <code className="bg-gray-200 p-1 rounded">"Analyze this YouTube Studio data and give me three data-backed recommendations to hit my goal of 250k subscribers in the next 5 months. For every recommendation, call out the data behind it."</code></li>
                <li>Utilize the AI's suggestions to strategically grow your channel.</li>
            </ol>
        </section>

        <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Using AI as a Content Intern</h3>
            <p>Leverage GPT Bots for specific tasks to streamline content creation:</p>
            <ol className="list-decimal pl-5">
                <li>Create a GPT Bot tailored to your needs via the 'Explore' button in ChatGPT.</li>
                <li>Feed the bot documents, PDFs, and scripts to train it.</li>
                <li>Refine AI-generated scripts to match your style and tone.</li>
                <li>Note: OpenAI plans to launch a GPT store, allowing creators to monetize their bots.</li>
            </ol>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Health and Mind Management</h2>
            <p>With the rapid advancements in AI, preserving mental and physical health is essential. Prioritize well-being to maintain creativity and productivity.</p>
        </section>
        <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
        <p>AI acts as a co-pilot in content creation, enhancing capabilities without replacing the human touch. Leveraging AI tools effectively can scale your content and reach new heights. Always remember to balance technology use with personal creativity and maintain your health to sustain long-term success.</p>
        <p>For continuous learning and updates on using AI in content creation, follow our tutorials and stay connected with our community.</p>
    </section>
</div>
            </div>
        </div>
         </div>
  )
}

export default NotesContainer