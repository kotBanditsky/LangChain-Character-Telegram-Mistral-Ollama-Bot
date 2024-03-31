### Your Character Chatbot with Langchain and Telegram

### Introduction:

In this project, the goal was to create a program that can emulate a pre-set personality in a Telegram chatbot.

##### The bot is able to:

- Respond with a themed message with text/audio/image to your direct request
- Respond with a themed message with text/audio/image to a random message in chat.

### How to use:

- You can use Ollama and StableDiffusion LLMs deployed locally on your computer to generate text and images. You can easily find instructions for installing them on the internet.
- It is important to run StableDiffusion with the `set COMMANDLINE_ARGS=--api` parameter. With this method, the time it takes to generate responses and images will depend directly on the performance of your computer
- You can also use the free service https://fusionbrain.ai and its Kandinsky model to generate images, also register and get an API key. The service is still free, but generation of some topics may be limited.
- You can use MistralAI for text generation - it is a low-cost powerful competitor of OpenAI, just register and get the API key here: https://console.mistral.ai/api-keys/.
- For audio generation use https://elevenlabs.io/ - you can get the API key by registering there, the service provides free limits.

### Notes:

- You can create a chat with a unique character by describing it in detail in the `config.js` file in the `PROMPT_CHAT` variable - the more detailed you describe the assistant's personality, the more similar the answers will be to him. Feel free to write A LOT.
- The bot passes through its personality promts for audio messages and image generation, this cannot be disabled, so you can't use it just as an audio and image generator.

### Getting Started:

1. Clone the project repository.
2. Install dependencies using `npm install`.
3. Create a `config.js` file using `config_demo.js` - it describes the assignments of all required parameters
4. Run the application using `npm start`.
5. Interact with the chatbot via Telegram to test its functionalities.

### Technologies Used:

- **Node.js**: For server-side JavaScript runtime environment.
- **Express**: Framework for building web applications with Node.js.
- **Cheerio**: For web scraping and parsing HTML content.
- **Ollama**: Get up and running with large language models, locally.
- **MistralAI**: Open and portable generative AI for devs and businesses.
- **Fusion Brain**: Platform with AI-based video and image generation models (Kandinsky model).
- **StableDiffusion**: Stable Diffusion is a deep learning model that generates images from text descriptions.
- **YandexGPT**: YandexGPT is a neural network of the GPT family from Yandex that can create and revise text, suggest new ideas, and take into account the context of a conversation.
- **TelegramBot**: Node.js library for interacting with the Telegram Bot API.
- **Langchain**: Various NLP-related packages for language processing tasks.
