import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatYandexGPT } from "@langchain/yandex/chat_models";
import config from "../config/index.js";
import generateChatText from "../services/Text2ChatAPI.js";
// import generateUrlText from "../services/Url2TextAPI.js";
// import isUrl from "../utils/checkUrl.js";

async function setChatInstance() {
  let chatInstance;

  switch (config.PROVIDER_TEXT) {
    case "MISTRAL":
      chatInstance = new ChatMistralAI({
        apiKey: config.MISTRAL_API_KEY,
        modelName: config.MISTAL_MODEL,
      });
      break;
    case "OLLAMA":
      chatInstance = new ChatOllama({
        baseUrl: config.OLLAMA_HOST,
        model: config.OLLAMA_MODEL,
      });
      break;
    case "YANDEX":
      chatInstance = new ChatYandexGPT({
        apiKey: config.YANDEX_API_KEY,
        modelURI: config.YANDEX_SERVICE,
      });
      break;
    default:
      throw new Error(
        "Invalid PROVIDER value. Expected 'MISTRAL', 'OLLAMA', or 'YANDEX'."
      );
  }

  async function generateText(msg, type) {
    return await generateChatText(msg, chatInstance, type);
  }

  // async function generateText(msg) {
  //   if (isUrl(msg.text)) {
  //     return await generateUrlText(msg, chatInstance);
  //   } else {
  //     return await generateChatText(msg, chatInstance);
  //   }
  // }

  return generateText;
}

export default setChatInstance;
