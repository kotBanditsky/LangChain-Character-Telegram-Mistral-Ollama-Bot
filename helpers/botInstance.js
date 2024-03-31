import TelegramBot from "node-telegram-bot-api";
import config from "../config/index.js";

const bot = new TelegramBot(config.TELEGRAM_TOKEN, {
  polling: true,
});

const sendMessage = (msg, type, data, caption, options = {}) => {
  switch (type) {
    case "text":
      bot.sendMessage(msg.chat.id, data, {
        disable_notification: true,
        reply_to_message_id: msg.message_id,
        ...options,
      });
      break;
    case "audio":
      bot.sendVoice(msg.chat.id, data, {
        disable_notification: true,
        reply_to_message_id: msg.message_id,
        ...options,
      });
      break;
    case "image":
      bot.sendPhoto(msg.chat.id, data, {
        caption,
        parse_mode: "HTML",
        disable_notification: true,
        reply_to_message_id: msg.message_id,
        ...options,
      });
      break;
    default:
      throw new Error(`Unknown message type: ${type}`);
  }
};

export { bot, sendMessage };
