export default {
  PORT: 3005,
  TELEGRAM_TOKEN: "", // telegram bot token (by BotFather)
  KANDINSKY_KEY: "", // https://fusionbrain.ai/docs/doc/api-dokumentaciya/
  KANDINSKY_SECRET: "", // https://fusionbrain.ai/docs/doc/api-dokumentaciya/
  MISTRAL_API_KEY: "", // https://console.mistral.ai/api-keys/
  YANDEX_API_KEY: "", // by yandex cloud
  YANDEX_SERVICE: "", // by yandex cloud
  PROVIDER_TEXT: "OLLAMA", // MISTRAL / OLLAMA / YANDEX
  PROVIDER_IMAGE: "KANDINSKY", // KANDINSKY / DIFFUSION
  PROVIDER_AUDIO: "ELEVENLABS", // ELEVENLABS
  OLLAMA_MODEL: "llama2", // vicuna:13b / llama2 / or other
  MISTAL_MODEL: "mistral-small", // mistral-small / mistral-medium-latest / mistral-large-latest
  OLLAMA_HOST: "http://localhost:11434", // you local ollama host
  BOT_URL: "@demo_bot", // telegram bot link
  BOT_NAME: "Botty", // bot-name in chat
  NEGATIVE_PROMT: "Car, butterfly, ball", // negative promt for image generation
  ELEVENLABS_KEY: "", // https://elevenlabs.io/app/speech-synthesis
  ELEVENLABS_VOICE: "", // voice-id
  ANSWER_CHANCE: 5, // chance of answer to random message in chat (of 100)
  AUDIO_LENGTH: 150, // maximal length of audio generation symbols
  BOT_IMG_STOP: "draw", // if this word in text message bot not start drawing
  BOT_TALK_STOP: "say", // if this word in text message bot not start audio
  BOT_IMG_START: "Botty draw", // if you send this phrase in chat bot start drawing by you text message
  BOT_TALK_START: "Botty say", // if you send this phrase in chat bot start audio by you text message
  URL_SUMMARIZE: "Summarize the main themes in these retrieved docs: {context}", // promt for url-summarize-analyze functional - not work now
  OLLAMA_URL_QUESTION: "What do you think about it?", // promt for url-summarize-analyze functional - not work now
  INPUT: "{input} - answer to this question from Botty character", // promt for get your character-like chat answer
  IMAGE_PROMT:
    "Generate an accurate, clear description of a high-quality photorealistic image on the topic:", // promt for image generation
  PROMPT_CHAT: "Botty is fun little bot", // you character full profile, maximize it!
};
