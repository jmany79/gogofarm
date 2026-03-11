import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    console.log("Generating smart farm image...");
    const response1 = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A modern indoor smart farm with vertical farming shelves, LED grow lights in purple and white, green leafy plants growing in trays, clean and technological agricultural environment, photorealistic, high quality.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      },
    });

    for (const part of response1.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const buffer = Buffer.from(base64Data, 'base64');
        fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
        fs.writeFileSync(path.join(process.cwd(), 'public', 'smartfarm.png'), buffer);
        console.log('Image saved to public/smartfarm.png');
        break;
      }
    }

    console.log("Generating insect image...");
    const response2 = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A large rhinoceros beetle eating a piece of yellow fruit like a peach or apple on a wooden log, close-up macro photography, highly detailed, nature background, photorealistic.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      },
    });

    for (const part of response2.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(path.join(process.cwd(), 'public', 'insect.png'), buffer);
        console.log('Image saved to public/insect.png');
        break;
      }
    }

  } catch (e) {
    console.error("Error generating image:", e);
  }
}

generate();
