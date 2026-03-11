import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    console.log("Generating image...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A happy Korean family smiling together in a sunny, lush green farm, wearing comfortable farming clothes, successful rural life, high quality, cinematic lighting, photorealistic, beautiful nature background.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(path.join(process.cwd(), 'public', 'hero-family.png'), buffer);
        console.log('Image saved to public/hero-family.png');
        return;
      }
    }
    console.log("No image data found in response.");
  } catch (e) {
    console.error("Error generating image:", e);
  }
}

generate();
