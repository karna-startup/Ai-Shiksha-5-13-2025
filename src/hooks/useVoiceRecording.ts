
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { speakText } from '@/services/elevenLabsService';

// N8N webhook URL
const N8N_WEBHOOK_URL = "https://karna-devops.app.n8n.cloud/webhook/n8n";

interface VoiceRecordingOptions {
  onActivate?: () => void;
}

export const useVoiceRecording = ({ onActivate }: VoiceRecordingOptions = {}) => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const triggerN8NWebhook = async (data: any) => {
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'no-cors' // Using no-cors to handle potential CORS issues
      });
      console.log('N8N webhook triggered');
    } catch (error) {
      console.error('Error triggering N8N webhook:', error);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      // Example: Send to a speech-to-text service (using a webhook as a proxy)
      const formData = new FormData();
      formData.append('audio', audioBlob);

      // Simulated response for now - In real app, this would be a call to a webhook
      // that handles the speech-to-text and returns a response
      setTimeout(async () => {
        // Simulate processing time
        const exampleTranscription = ""; // Empty transcription to avoid showing "What is a variable in programming?"
        setTranscript(exampleTranscription);

        // Simulate response from webhook
        const response = "I'm here to assist you. How can I help you today?";

        // Trigger N8N webhook with transcription data
        triggerN8NWebhook({
          event: 'transcription_complete',
          timestamp: new Date().toISOString(),
          transcript: exampleTranscription,
          response: response
        });

        // Use ElevenLabs to speak the response
        await speakText(response);
        setIsActive(false);

        // Trigger N8N webhook for voice session end
        triggerN8NWebhook({
          event: 'voice_session_end',
          timestamp: new Date().toISOString(),
          session_data: {
            transcript: exampleTranscription,
            duration: '10s' // Simulated duration
          }
        });
      }, 2000);
    } catch (error) {
      console.error('Error processing audio:', error);
      setIsActive(false);

      // Trigger N8N webhook for error
      triggerN8NWebhook({
        event: 'error',
        timestamp: new Date().toISOString(),
        error: 'Audio processing failed'
      });
    }
  };

  const handleStartListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = e => {
        audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav'
        });
        await processAudio(audioBlob);

        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsListening(true);
      setIsActive(true);

      // Trigger N8N webhook for voice session start
      triggerN8NWebhook({
        event: 'voice_session_start',
        timestamp: new Date().toISOString(),
        client_info: {
          userAgent: navigator.userAgent,
          language: navigator.language
        }
      });
      
      if (onActivate) {
        onActivate();
      }

      // Auto-stop recording after 10 seconds (as a safety measure)
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopListening();
        }
      }, 10000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      toast("Couldn't access microphone. Please check permissions.");
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      handleStartListening();
    }
  };

  return {
    isActive,
    isListening,
    transcript,
    toggleListening
  };
};
