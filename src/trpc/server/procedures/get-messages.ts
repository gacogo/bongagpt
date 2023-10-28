import { db } from '@/lib/db';
import { privateProcedure, publicProcedure } from '@/trpc/server/trpc';
import { z } from 'zod';

export enum MessageKind {
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
}

export const getMessages = privateProcedure
  .output(
    z.array(
      z.object({
        id: z.number(),
        kind: z.enum([MessageKind.QUESTION, MessageKind.ANSWER]),
        content: z.string(),
        createdAt: z.date(),
      })
    )
  )
  .query(async (opts) => {
    const messages = await db.message.findMany({
      where: {
        userId: opts.ctx.userId,
      },
    });
    return messages.map((message) => {
      return {
        id: message.id,
        kind:
          message.kind === 'QUESTION'
            ? MessageKind.QUESTION
            : MessageKind.ANSWER,
        content: message.content,
        createdAt: message.createdAt,
      };
    });
  });
