'use client';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';

import { absoluteUrl } from '@/lib/utils';

import { PropsWithChildren } from 'react';
import type { AppRouter } from '../server/router';
import { QUERY_CLIENT } from '@/query/query-client';

export const trpc = createTRPCReact<AppRouter>({});

const TRPC_CLIENT = trpc.createClient({
  links: [
    httpBatchLink({
      url: absoluteUrl('/api/trpc'),
    }),
  ],
});

export default function TrpcProvider({ children }: PropsWithChildren) {
  return (
    <trpc.Provider client={TRPC_CLIENT} queryClient={QUERY_CLIENT}>
      {children}
    </trpc.Provider>
  );
}
