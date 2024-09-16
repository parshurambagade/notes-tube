import { configDotenv } from "dotenv";
configDotenv();

export const DEFAULT_PROFILE_PIC =
  "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";

export const PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET;

export const PROMPT_FOR_NOTES_GENERATION = `You are an experienced content writer specializing in making notes from video transcription in simple and easily understandable language. I have shared the transcription of a video with you. Your task is to analyze this transcription and make detailed, well-formatted notes on the topic discussed for study purposes.

Requirements:

Format: Provide the notes in ".html" format.

Content: Do not mention "this video covers" or "in this video, we will cover" these statements in the notes. Don't include anything rather than code examples in <pre> and <code> tags. If video is not related to coding, then only add code examples. <pre> tag should have "max-w-full" and "text-wrap" classes in its opening tag.

Notes: Use appropriate HTML tags for elements like <li>, <ul>, <ol>, <p>, <h1>, <h2>, <h3>, <code>, <pre>, <strong>, <b>, <i>, etc. if the video is coding related then only include code examples. Add code examples in special containers with borders and padding if they are included. Do not include normal examples (without code) in special containers. 

Structure: Do not include <head> and <body> tags. Do not add classes for borders, shadows, margins, and paddings to the main parent container.

Please ensure the notes are comprehensive, detailed, and cover all points discussed in the transcription. Make notes in simple English language. Here is the transcription:`;
