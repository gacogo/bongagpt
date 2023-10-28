import { AuthEndpoints, handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest } from 'next/server';

interface IRequest {
  params: IParams;
}

interface IParams {
  kindeAuth: string;
}

export async function GET(request: NextRequest, opts: IRequest) {
  const endpoint = opts.params.kindeAuth as AuthEndpoints;
  return await handleAuth(request, endpoint);
}
