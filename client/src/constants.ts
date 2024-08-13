export const YOUTUBE_IFRAME_URL = "https://www.youtube-nocookie.com/embed/";

export const FETCH_VIDEO_DETAILS = `https://www.googleapis.com/youtube/v3/videos?&part=snippet,contentDetails,statistics&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&id=`;

// export const PROMPT_FOR_NOTES_GENERATION = `You are an experienced content writer specialising in making programming notes in a simple and easily understandable language. I have shared the transcription of a video with you. Your task is to analyse this transcription and make proper notes on the topic discussed in this video for study purposes. Don't mention video anywhere like "this video covers" or "in this video, we will cover" etc, just prepare notes.  Remember to use code examples or other examples wherever required. Give me these detailed notes in <> interface NotesType {
//     title: string;                      // The main title of the notes, usually derived from the video title.
//     introduction: string;               // A brief introduction or summary of what the video is about.
//     keyPoints: KeyPoint[];              // An array of key points discussed in the video with subpoints if necessary.
//     examples?: Example[];               // Optional array of examples or code examples if relevant.
//     conclusion: string;                 // A concluding summary or final thoughts on the topic.
// }

// interface KeyPoint {
//     heading: string;                    // Heading for the key point.
//     details: string;                    // Detailed explanation of the key point.
//     subPoints?: string[];               // Optional subpoints or bullet points related to the key point.
// }

// interface Example {
//     description: string;                // Brief description of the example.
//     code?: string;                      // Optional code example if applicable.
// }</> this type of json object format. Notes should be perfect, well formatted and should cover all the points that are discussed in this video. These notes should be in detail. here is the transcription:`;

// export const PROMPT_FOR_NOTES_GENERATION = `You are an experienced content writer specialising in making programming notes in a simple and easily understandable language. I have shared the transcription of a video with you. Your task is to analyse this transcription and make proper notes on the topic discussed in this video for study purposes. Don't mention video anywhere like "this video covers" or "in this video, we will cover" etc, just prepare notes. Remember to use code examples or other examples wherever required. Give me these detailed notes in ".html" format.Use "pre" and "code" tag in html to enclose code examples or any other type of things. Don't include "head" and "body" tags in your response. Also avoid adding label for the code. Add Tailwind CSS classes in your response so that notes get proper margin, padding, line height, border etc. Give equal margins on top and bottom to all the headings. Use appropriate tags for all the elements in your response like li, ul, ol, p, h1,h2,h3, code, pre, strong, b, i, etc. Add code examples in special containers having border, padding, etc. Don't add normal examples that don't contains code in special containers. Add appropriate classes to the li elements like list-style, list type, etc. so that they get proper identity. Explicitly add clsses for font size in all the headings. Don't add classes for borders, shadows, margins and paddings in the main parent container. But remember important thing that i want your response in ".html" formt. Notes should be perfect, and well formatted and should cover all the points that are discussed in this video. These notes should be in detail. here is the transcription:`;


export const PROMPT_FOR_NOTES_GENERATION = `You are an experienced content writer specializing in making notes from video transcription in simple and easily understandable language. I have shared the transcription of a video with you. Your task is to analyze this transcription and make detailed, well-formatted notes on the topic discussed for study purposes.

Requirements:

Format: Provide the notes in ".html" format.

Content: Do not mention "this video covers" or "in this video, we will cover" these type of statements in the notes. Don't include anything rather than code examples in <pre> and <code> tags. If video is not related to coding, then only add code examples. <pre> tag should have "max-w-full" and "text-wrap" classes in its opening tag.

Notes: Use appropriate HTML tags for elements like <li>, <ul>, <ol>, <p>, <h1>, <h2>, <h3>, <code>, <pre>, <strong>, <b>, <i>, etc. In main heading tag, add a class "text-center". Add code examples in special containers with borders and padding if they are included. Do not include normal examples (without code) in special containers. 

Structure: Do not include <head> and <body> tags. Do not add classes for borders, shadows, margins, and paddings to the main parent container.

Please ensure the notes are comprehensive, detailed, and cover all points discussed in the transcription. Here is the transcription:`

export const PROMPT_FOR_SUMMARY_GENERATION = `You are an experienced content writer specializing in summarising videos in simple and easily understandable language. I have shared the transcription of a video with you. Your task is to analyze this transcription and make  well-formatted summary from this video.

Requirements:

Format: Provide the summary in ".html" format.

Content: Do not mention "this video covers", "in this video, we will cover" this type of statements. 

Summary: Use appropriate HTML tags for elements like <li>, <ul>, <ol>, <p>, <h1>, <h2>, <h3>, <code>, <pre>, <strong>, <b>, <i>, etc. 

Structure: Do not include <head> and <body> tags. Do not add classes for borders, shadows, margins, and paddings to the main parent container.

Please ensure the Summary is comprehensive, short and simple. Here is the transcription:`;

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;