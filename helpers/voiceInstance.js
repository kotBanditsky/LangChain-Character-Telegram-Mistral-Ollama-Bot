import config from "../config/index.js";

async function setVoiceInstance() {
  let generateVoice;

  if (config.PROVIDER_AUDIO === "ELEVENLABS") {
    const module = await import("../services/Text2SpeechElevenlabsAPI.js");
    generateVoice = module.default; // Assuming that the module exports a default function
  }

  return generateVoice;
}

export default setVoiceInstance;
