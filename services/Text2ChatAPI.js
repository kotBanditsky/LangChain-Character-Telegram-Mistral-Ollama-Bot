import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage } from "@langchain/core/messages";
import config from "../config/index.js";

async function generateChatText(msg, chatInstance, type) {
  const question = msg.text;
  const outputParser = new StringOutputParser();
  let response;

  const promptChat = ChatPromptTemplate.fromMessages([
    ["system", config.PROMPT_CHAT],
    ["human", config.INPUT],
  ]);

  const chain = promptChat.pipe(chatInstance).pipe(outputParser);

  if (type === "image") {
    if (config.IMAGE_TUMBLER === "CLEAR") {
      const responseBase = await chatInstance.invoke([
        new HumanMessage(`${config.IMAGE_PROMT_CLEAR} ${question}`),
      ]);
      response = responseBase.content;
    }

    if (config.IMAGE_TUMBLER === "ROLE") {
      response = await chain.invoke({
        input: `${config.IMAGE_PROMT} ${question}`,
      });
    }
  } else {
    response = await chain.invoke({
      input: question,
    });
  }

  return response;
}

export default generateChatText;
