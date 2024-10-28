# AI Joke Generator

I built this app as part of my learning on Encode's AI and GPTs Bootcamp.

The project is the homework for the second week of the programme where we look at AI API integrations with Web Apps.

I followed instructions for a story generation app as the foundation of this app. I then adapted the prompt and layout to suit a joke generation app instead.

The technology used in the tutorial had some depracated packages which I wanted to avoid using. This took about twice as long to implement as the initial set up.

I followed guidance on Vercel's documentation to implement [streamText()](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text) as well as adapting their tutorial on how to [Stream Text Generation](https://sdk.vercel.ai/examples/rsc/basics/streaming-text-generation) to suit my purposes.

Overall this was a satisying learning opportunity, especially since I haven't used Next before (only React).

The site allows a user to pick a genre and type of humour. The agent will respond with a joke fitting these conditions. However, they're cynical about the future of stand-up comedy and will make it known that they think it's a dying art... 😢🤡

### Deployment

I had a couple of issues with deployment:

- The routes file is a specific type and requires any exports to be typed as requests (e.g. GET and POST) and so I had to rename this to actions.ts

- Vercel only allows a limit time for a function to run. This meant streaming responses were causing an error which prevented the response from generating on the page. To get around this, I followed the steps [here](https://github.com/vercel/ai-chatbot/issues/291) which meant adding two lines of code to `page.tsx`

```
export const runtime = "edge";
export const preferredRegion = "home";
```
