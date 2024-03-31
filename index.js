import express from "express";
import config from "./config/index.js";
import handleMessage from "./utils/handleMessage.js";
import executeProb from "./utils/executeProb.js";
// import isUrl from "./utils/checkUrl.js";
import { bot } from "./helpers/botInstance.js";

const app = express();

bot.on("message", async (msg) => {
  if (typeof msg.text === "undefined") {
    console.log("Text is undefined");
    return;
  }

  const isBotMentioned =
    msg.text.includes(config.BOT_URL) || msg.text.includes(config.BOT_NAME);
  const isStopWordPresent =
    msg.text.includes(config.BOT_IMG_STOP) ||
    msg.text.includes(config.BOT_TALK_STOP);

  function getRandomType() {
    const types = ["text", "audio", "image"];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }

  if (isBotMentioned && !isStopWordPresent) {
    executeProb(() => handleMessage(msg, "text"), 100);
  } else if (msg.text.includes(config.BOT_IMG_START)) {
    executeProb(() => handleMessage(msg, "image"), 100);
  } else if (msg.text.includes(config.BOT_TALK_START)) {
    executeProb(() => handleMessage(msg, "audio"), 100);
  } else {
    const typeForAnswer = getRandomType();
    executeProb(() => handleMessage(msg, typeForAnswer), config.ANSWER_CHANCE);
  }

  // now functional not working
  // if (isUrl(msg.text)) {
  //   console.log("url");
  //   executeProb(() => handleMessage(msg, "url"), 100);
  // }
});

app.listen(config.PORT, () =>
  console.log(`Bot is running on port ${config.PORT}`)
);
