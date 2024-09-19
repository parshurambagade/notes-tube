import { YoutubeTranscript } from 'youtube-transcript';

export async function fetchYouTubeTranscript(videoId) {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        
        // Format the transcript into a single string
        const formattedTranscript = transcript.map(entry => entry.text).join('\n');
        
        return formattedTranscript;
    } catch (error) {
        console.error('Error fetching transcript:', error);
        return null;
    }
}


