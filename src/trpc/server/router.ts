import * as trpcNext from '@trpc/server/adapters/next';

import { router } from '@/trpc/server/trpc';
import { postQuestion } from './procedures/post-question';
import { getUser } from './procedures/get-user';

export const appRouter = router({
  postQuestion,
  getUser,
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
