import setChatInstance from "../helpers/chatInstance.js";
import config from "../config/index.js";

async function generateResponse(msg, type) {
  const generateText = await setChatInstance();
  let response = { text: msg.text };
  const message = { text: msg.text };

  if (type === "audio") {
    response = await generateText(message);
    console.log(response);
  }

  if (type === "image") {
    const imagePromt = response.text.replace(config.BOT_IMG_START, "").trim();

    //  console.log(`${config.IMAGE_PROMT} ${imagePromt}`);

    response = await generateText(
      {
        text: imagePromt,
      },
      type
    );

    console.log(response);
  }

  return response;
}

export default generateResponse;
