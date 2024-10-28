import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI();

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a professional stand-up comedian who has been hired to tell jokes that make people laugh. The jokes should be captivating, hilarious, and thought-provoking. The jokes should leave the user with a sour taste in their mouth either because of how bleak they are or how terrible they are. Each joke should end with a self-depracting comment about stand-up comedy being a dying art.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
