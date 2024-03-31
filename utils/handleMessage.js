import { sendMessage } from "../helpers/botInstance.js";
import generateAnswer from "../utils/generateAnswer.js";
import generateResponse from "./generateResponce.js";

async function handleMessage(msg, type) {
  const response = await generateResponse(msg, type);

  console.log(response);

  if (type === "audio") {
    const generatedVoice = await generateAnswer(response, type);
    sendMessage(msg, type, "audio.mp3");
  }

  if (type === "text") {
    const generatedText = await generateAnswer(response, type);
    sendMessage(msg, type, generatedText);
  }

  if (type === "image") {
    const generatedImage = await generateAnswer(response, type);
    sendMessage(msg, type, generatedImage, response);
  }

  // if (type === "url") {
  //   const generatedText = await generateAnswer(response, type);
  //   sendMessage(msg, type, generatedText);
  // }
}

export default handleMessage;
