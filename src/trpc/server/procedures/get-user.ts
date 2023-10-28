import { publicProcedure } from '@/trpc/server/trpc';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { z } from 'zod';

export const getUser = publicProcedure
  .output(
    z
      .object({
        name: z.string(),
      })
      .nullable()
  )
  .query(async () => {
    const { getUser, isAuthenticated } = getKindeServerSession();
    if (!isAuthenticated()) return null;
    const user = getUser();
    if (!user.id) return null;
    return {
      name: user.given_name ?? user.family_name ?? user.id,
    };
  });
