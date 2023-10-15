import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";


export async function GET(request: NextRequest) {
  const message =  request.body;

  return Response.json({message: message})
}

