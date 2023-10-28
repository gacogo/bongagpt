import * as trpcNext from '@trpc/server/adapters/next';

import { router } from '@/trpc/server/trpc';
import { postQuestion } from './procedures/post-question';
import { getUser } from './procedures/get-user';
import { getMessages } from './procedures/get-messages';

export const appRouter = router({
  postQuestion,
  getUser,
  getMessages,
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
