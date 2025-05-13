
# AI-Shiksha

AI-powered computer science learning for students aged 3–18.

## Setup Instructions

1. Clone this repository
2. Install dependencies with `npm install`
3. Create a `.env` file in the root directory (see `.env.example` for required variables)
4. Add your ElevenLabs API key to the `.env` file:
   ```
   VITE_ELEVENLABS_API_KEY=your_api_key_here
   ```
5. Run the development server with `npm run dev`

## Features

- Interactive ElevenLabs Conversational AI assistant named "Saras"
- Age-appropriate interface for different learning levels
- Built-in accessibility features including dark mode and dyslexia-friendly options
- Direct integration with ElevenLabs for high-quality conversational AI

## Voice Assistant

The application uses the ElevenLabs Conversational AI widget for interactive voice assistance. Users can interact with Saras by clicking the microphone button and speaking naturally. The AI maintains context throughout the conversation for a seamless learning experience.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- ElevenLabs Conversational AI
- Vite

## License

© AI-Shiksha - All rights reserved
