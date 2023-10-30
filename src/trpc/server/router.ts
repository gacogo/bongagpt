import * as trpcNext from '@trpc/server/adapters/next';

import { router } from '@/trpc/server/trpc';
import { postQuestion } from '@/trpc/server/procedures/post-question';
import { getUser } from '@/trpc/server/procedures/get-user';
import { getMessages } from '@/trpc/server/procedures/get-messages';

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
