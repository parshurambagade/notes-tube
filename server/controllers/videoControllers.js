// controllers/noteController.js

// import { YoutubeTranscript } from 'youtube-transcript';

// // Create Note
// export const transcribe = async (req, res) => {
//   const { videoId } = req.body;
//   try {
//     const transcript = await YoutubeTranscript.fetchTranscript(videoId);
//     const fullTranscript = transcript.reduce((acc, cur) => {
//       return acc + cur.text + " ";
//     }); 
//     console.log(fullTranscript);
//     res.json({ fullTranscript });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch transcript" });
//   }
// };
