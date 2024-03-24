// Import necessary modules
import express from "express";
import "cheerio";
import TelegramBot from "node-telegram-bot-api";
import {
  TELEGRAM_TOKEN,
  PORT,
  MISTRAL_API_KEY,
  PROVIDER,
  OLLAMA_MODEL,
  MISTAL_MODEL,
  OLLAMA_HOST,
  OLLAMA_URL_QUESTION,
  BOT_URL,
  BOT_NAME,
  BOT_TEST_MESSAGE,
  BOT_TEST_ANSWER,
  INPUT,
  PROMPT_CHAT,
} from "./config.js";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatMistralAI } from "@langchain/mistralai";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { PromptTemplate } from "@langchain/core/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

const app = express();
const outputParser = new StringOutputParser();
const ollamaEmbeddings = new OllamaEmbeddings();

const bot = new TelegramBot(TELEGRAM_TOKEN, {
  polling: true,
});

const promptChat = ChatPromptTemplate.fromMessages([
  ["system", PROMPT_CHAT],
  ["human", INPUT],
]);

const chatInstance =
  PROVIDER === "MISTRAL"
    ? new ChatMistralAI({
        apiKey: MISTRAL_API_KEY,
        modelName: MISTAL_MODEL,
      })
    : new ChatOllama({
        baseUrl: OLLAMA_HOST,
        model: OLLAMA_MODEL,
      });

function isUrl(input) {
  try {
    new URL(input);
    return true;
  } catch (err) {
    return false;
  }
}

async function handleUrl(msg, chatId) {
  const url = msg.text;
  const question = OLLAMA_URL_QUESTION;

  const loader = new CheerioWebBaseLoader(url);
  const data = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 20,
  });

  const splitDocs = await textSplitter.splitDocuments(data);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    ollamaEmbeddings
  );

  const resultOne = await vectorStore.similaritySearch(question, 1);

  const prompt = PromptTemplate.fromTemplate(
    "Summarize the main themes in these retrieved docs: {context}"
  );

  const chain = await createStuffDocumentsChain({
    llm: chatInstance,
    outputParser: new StringOutputParser(),
    prompt,
  });

  const rest = await chain.invoke({
    context: resultOne,
  });

  bot.sendMessage(chatId, rest, {
    disable_notification: true,
  });
}

async function handleText(msg, chatId, llm) {
  const question = msg.text;

  const chain = promptChat.pipe(llm).pipe(outputParser);

  const response = await chain.invoke({
    input: question,
  });

  bot.sendMessage(chatId, response, {
    disable_notification: true,
  });
}

function executeFunctionWithProbability(
  probability,
  msg,
  chatId,
  chatInstance
) {
  var randomNum = Math.floor(Math.random() * 100) + 1;

  if (randomNum <= probability) {
    handleText(msg, chatId, chatInstance);
  } else {
    console.log(
      "Function executed stopped with probability " +
        randomNum +
        " bigger than " +
        probability
    );
  }
}

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (typeof msg.text === "undefined") {
    console.log("Text is undefined");
    return;
  }

  if (msg.text.includes(BOT_URL) || msg.text.includes(BOT_NAME)) {
    executeFunctionWithProbability(99, msg, chatId, chatInstance);
  } else if (msg.text === BOT_TEST_MESSAGE) {
    bot.sendMessage(chatId, BOT_TEST_ANSWER, {
      disable_notification: true,
    });
  } else if (isUrl(msg.text) && PROVIDER === "OLLAMA") {
    handleUrl(msg, chatId);
  } else {
    executeFunctionWithProbability(10, msg, chatId, chatInstance);
  }
});

app.listen(PORT, () => console.log(`Bot is running on port ${PORT}`));
