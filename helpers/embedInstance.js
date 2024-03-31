import config from "../config/index.js";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import generateUrlText from "../services/Url2TextAPI.js";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatYandexGPT } from "@langchain/yandex/chat_models";

async function setEmbedInstance() {
  const ollamaEmbeddings = new OllamaEmbeddings();
  const mistralEmbeddings = new MistralAIEmbeddings({
    apiKey: config.MISTRAL_API_KEY,
  });

  let embedInstance;

  switch (config.PROVIDER_TEXT) {
    case "MISTRAL":
      embedInstance = mistralEmbeddings;
      break;
    case "OLLAMA":
      embedInstance = ollamaEmbeddings;
      break;
    default:
      throw new Error(
        "Invalid PROVIDER value. Expected 'MISTRAL', 'OLLAMA', or 'YANDEX'."
      );
  }

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

  async function generateUrl(msg) {
    return await generateUrlText(msg, embedInstance, chatInstance);
  }

  return generateUrl;
}

export default setEmbedInstance;
