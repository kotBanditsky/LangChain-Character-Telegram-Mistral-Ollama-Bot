import config from "../config/index.js";

async function setImageInstance() {
  let generateImage;

  if (config.PROVIDER_IMAGE === "KANDINSKY") {
    const module = await import("../services/Text2ImageKandinskyAPI.js");
    generateImage = module.default; // Assuming that the module exports a default function
  }

  if (config.PROVIDER_IMAGE === "DIFFUSION") {
    const module = await import("../services/Text2ImageStableDiffAPI.js");
    generateImage = module.default; // Assuming that the module exports a default function
  }

  return generateImage;
}

export default setImageInstance;
