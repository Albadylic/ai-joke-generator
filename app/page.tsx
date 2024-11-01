"use client";

import { useState } from "react";
import { generate } from "./api/chat/actions";
import { readStreamableValue } from "ai/rsc";

export const runtime = "edge";
export const preferredRegion = "home";

export default function Chat() {
  const [generation, setGeneration] = useState<string>("");

  const genres = [
    { emoji: "💼", value: "Work" },
    { emoji: "⚽️", value: "Sport" },
    { emoji: "📺", value: "Television" },
    { emoji: "🚀", value: "Space Travel" },
  ];

  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😈", value: "Dark" },
    { emoji: "😏", value: "Sarcastic" },
  ];

  const types = [
    { emoji: "🚪", value: "Knock, knock" },
    { emoji: "👨‍👧", value: "Dad joke" },
    { emoji: "🐕", value: "Shaggy dog story" },
  ];

  const [state, setState] = useState({
    genre: genres[0].value,
    tone: tones[0].value,
    type: types[0].value,
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className="mx-auto w-full  p-24 flex flex-col bg-slate-700">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-4 bg-opacity-25 bg-gray-200 rounded-lg p-4">
            <h2 className="text-3xl font-bold">
              🤣🤣 Funniest Joke App of All Time 🤣🤣
            </h2>
            <p>Customize the joke by selecting the genre and tone below.</p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }, index) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                    defaultChecked={index == 0 ? true : false}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }, index) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                    defaultChecked={index == 0 ? true : false}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Type</h3>

            <div className="flex flex-wrap justify-center">
              {types.map(({ value, emoji }, index) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="type"
                    value={value}
                    onChange={handleChange}
                    defaultChecked={index == 0 ? true : false}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-cyan-500 hover:bg-cyan-950 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={!state.genre || !state.tone}
            onClick={async () => {
              const { output } = await generate(
                `Generate a ${state.type} joke about ${state.genre} in a ${state.tone} tone`
              );
              setGeneration(() => "");
              for await (const delta of readStreamableValue(output)) {
                setGeneration(
                  (currentGeneration) => `${currentGeneration}${delta}`
                );
              }
            }}
          >
            Generate Joke
          </button>

          <div className="bg-opacity-25 bg-gray-700 rounded-lg p-4 max-w-2xl">
            {generation}
          </div>
        </div>
      </div>
    </main>
  );
}
