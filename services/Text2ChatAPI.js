import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import config from "../config/index.js";

async function generateChatText(msg, chatInstance) {
  const question = msg.text;
  const outputParser = new StringOutputParser();

  const promptChat = ChatPromptTemplate.fromMessages([
    ["system", config.PROMPT_CHAT],
    ["human", config.INPUT],
  ]);

  const chain = promptChat.pipe(chatInstance).pipe(outputParser);

  const response = await chain.invoke({
    input: question,
  });

  return response;
}

export default generateChatText;
