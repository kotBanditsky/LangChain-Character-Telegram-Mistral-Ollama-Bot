import axios from "axios";
import fs from "fs";

async function generateImage(response) {
  const request = await axios.post("http://127.0.0.1:7860/sdapi/v1/txt2img", {
    prompt: response,
    negative_prompt: "",
    seed: -1,
    subseed: -1,
    subseed_strength: 0,
    seed_resize_from_h: -1,
    seed_resize_from_w: -1,
    sampler_name: "Euler a",
    batch_size: 1,
    n_iter: 1,
    steps: 20,
    cfg_scale: 7,
    width: 512,
    height: 512,
    restore_faces: true,
    tiling: true,
    do_not_save_samples: false,
    do_not_save_grid: false,
    eta: 0,
    denoising_strength: 0,
    s_min_uncond: 0,
    s_churn: 0,
    s_tmax: 0,
    s_tmin: 0,
    s_noise: 0,
    override_settings: {},
    override_settings_restore_afterwards: true,
    refiner_switch_at: 0,
    disable_extra_networks: false,
    enable_hr: false,
    firstphase_width: 0,
    firstphase_height: 0,
    hr_scale: 2,
    hr_second_pass_steps: 0,
    hr_resize_x: 0,
    hr_resize_y: 0,
    hr_prompt: "",
    hr_negative_prompt: "",
    send_images: true,
    save_images: false,
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
