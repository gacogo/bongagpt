import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";


export async function POST(request: NextRequest) {
  
  const controller = new AbortController();

  await sleep(1000, controller);

  setTimeout(() => {
    controller.abort();
  });

  return Promise.resolve(Response.json({ messages: [] }));
}

function sleep(ms: number, contoller) {
  return new Promise((resolve, reject) => {
    setTimeout(( ) => {
      resolve();
    }, ms);
  })
}