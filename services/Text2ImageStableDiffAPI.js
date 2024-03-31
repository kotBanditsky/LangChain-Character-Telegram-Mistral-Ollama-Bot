import axios from "axios";
import fs from "fs";

async function generateImage(response) {
  const request = await axios.post("http://127.0.0.1:7860/sdapi/v1/txt2img", {
    prompt: response,
  });

  let images = await request.data.images;

  const base64String = images[0];

  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  return new Promise((resolve, reject) => {
    fs.writeFile("image.jpg", buffer, "base64", (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("File saved!");
        resolve("image.jpg");
      }
    });
  });
}

export default generateImage;
