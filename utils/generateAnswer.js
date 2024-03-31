import setChatInstance from "../helpers/chatInstance.js";
import setImageInstance from "../helpers/imageInstance.js";
import setVoiceInstance from "../helpers/voiceInstance.js";
// import setEmbedInstance from "../helpers/embedInstance.js";

const generateAnswer = async (response, type) => {
  let generateFunction;

  switch (type) {
    case "audio":
      generateFunction = await setVoiceInstance();
      break;
    case "text":
      generateFunction = await setChatInstance();
      break;
    case "image":
      generateFunction = await setImageInstance();
      break;
    // case "url":
    //   generateFunction = await setChatInstance();
    //   generateFunction = await setEmbedInstance();
    //   break;
    default:
      throw new Error(`Invalid type: ${type}`);
  }

  return generateFunction(response);
};

export default generateAnswer;
