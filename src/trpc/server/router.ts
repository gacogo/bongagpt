import * as trpcNext from '@trpc/server/adapters/next';

import { router } from '@/trpc/server/trpc';
import { postQuestion } from '@/trpc/server/procedures/post-question';
import { getUser } from '@/trpc/server/procedures/get-user';
import { getMessages } from '@/trpc/server/procedures/get-messages';
import { createStripeCustomer } from '@/trpc/server/procedures/stripe-route/create-stripe-customer';
import { subscribeCustomer } from './procedures/stripe-route/subscribe-customer';

export const appRouter = router({
  postQuestion,
  getUser,
  getMessages,
  createStripeCustomer,
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
