// Groq — Ultra-fast LLM inference
// Docs: https://console.groq.com/docs
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function chat(prompt: string): Promise<string> {
  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
    max_tokens: 1024,
    stream: false,
  });
  return completion.choices[0].message.content ?? "";
}

// Available models:
// llama-3.3-70b-versatile  — balanced
// llama-3.1-8b-instant     — fastest
// mixtral-8x7b-32768       — long context
// gemma2-9b-it             — Google fine-tune

(async () => {
  const result = await chat("Write a TypeScript generic debounce function");
  console.log(result);
})();