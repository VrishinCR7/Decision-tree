// Gemini API — Google
// Docs: https://ai.google.dev/gemini-api/docs

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}

// Streaming variant
async function generateStream(prompt: string): Promise<void> {
  const stream = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.text ?? "");
  }
}

(async () => {
  console.log(await generate("Explain transformers in ML"));
})();