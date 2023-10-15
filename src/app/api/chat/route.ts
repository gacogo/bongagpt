import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const {message} =  await request.json();
  
  const openairesp = await gptResponse(message)

  
  return Response.json({message: openairesp})
}


async function gptResponse(message:string): Promise<string | null> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": message},
      ],
  });
  return response.choices?.[0].message.content ?? null;
}
