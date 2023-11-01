import { AuthEndpoints, handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest } from 'next/server';

interface IRequestOptions {
  params: IParams;
}

interface IParams {
  kindeAuth: string;
}

export async function GET(request: NextRequest, opts: IRequestOptions) {
  const endpoint = opts.params.kindeAuth as AuthEndpoints;
  return await handleAuth(request, endpoint);
}
