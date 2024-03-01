// utils/ttsUtils.js
import Tts from 'react-native-tts';

// Initialize TTS engine
export const initTts = () => {
  // Add any initialization logic for TTS here
  Tts.setDefaultLanguage('en-US');
  // You can set other TTS configurations here
};

// Read text using TTS
export const readText = (text) => {
  Tts.speak(text);
};

// Stop TTS playback
export const stopTts = () => {
  Tts.stop();
};

// Other TTS-related utility functions can be added as needed
