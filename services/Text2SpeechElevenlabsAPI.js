import ElevenLabs from "elevenlabs-node/index.js";
import config from "../config/index.js";

const voice = new ElevenLabs({
  apiKey: config.ELEVENLABS_KEY, // Your API key from Elevenlabs
  voiceId: config.ELEVENLABS_VOICE, // A Voice ID from Elevenlabs
});

async function generateVoice(response) {
  try {
    const res = await voice.textToSpeech({
      // Required Parameters
      fileName: "audio.mp3", // The name of your audio file
      textInput: response, // The text you wish to convert to speech
      // Optional Parameters
      voiceId: config.ELEVENLABS_VOICE, // A different Voice ID from the default
      stability: 1, // The stability for the converted speech
      similarityBoost: 1, // The similarity boost for the converted speech
      modelId: "eleven_multilingual_v2", // The ElevenLabs Model ID
      style: 1, // The style exaggeration for the converted speech
      speakerBoost: true, // The speaker boost for the converted speech
    });
    console.log(res);
    return res.filePath;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default generateVoice;
