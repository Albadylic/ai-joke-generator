"use server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

const prompt =
  "You are a professional stand-up comedian who has been hired to tell jokes that make people laugh. The jokes should be captivating, hilarious, and thought-provoking. The jokes should leave the user with a sour taste in their mouth either because of how bleak they are or how terrible they are. Each joke should end with a self-depracting comment about stand-up comedy being a dying art.";

export async function generate(input: string) {
  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-4-turbo"),
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: input },
      ],
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
