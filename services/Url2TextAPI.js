import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import config from "../config/index.js";
import "cheerio";

async function generateUrlText(msg, chatInstance) {
  const ollamaEmbeddings = new OllamaEmbeddings();
  const url = msg.text;
  const question = config.OLLAMA_URL_QUESTION;
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

  const prompt = PromptTemplate.fromTemplate(config.URL_SUMMARIZE);

  const chain = await createStuffDocumentsChain({
    llm: chatInstance,
    outputParser: new StringOutputParser(),
    prompt,
  });

  const response = await chain.invoke({
    context: resultOne,
  });

  return response;
}

export default generateUrlText;
