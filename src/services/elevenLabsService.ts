
// ElevenLabs API service for text-to-speech
interface TTSOptions {
  text: string;
  voiceId?: string;
  modelId?: string;
}

export const synthesizeSpeech = async (options: TTSOptions): Promise<ArrayBuffer> => {
  const { 
    text, 
    voiceId = '9BWtsMINqrJLrRacOk9x', // Default: Aria voice
    modelId = 'eleven_multilingual_v2' // Default: Multilingual v2
  } = options;

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY || '',
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`ElevenLabs API error: ${errorData.detail?.message || response.statusText}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
};

// Function to play audio from ArrayBuffer
export const playAudio = (audioBuffer: ArrayBuffer): HTMLAudioElement => {
  const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  
  audio.onended = () => {
    URL.revokeObjectURL(url);
  };
  
  audio.play();
  return audio;
};

export const speakText = async (text: string): Promise<HTMLAudioElement | null> => {
  try {
    const audioBuffer = await synthesizeSpeech({ text });
    return playAudio(audioBuffer);
  } catch (error) {
    console.error('Error speaking text:', error);
    return null;
  }
};
