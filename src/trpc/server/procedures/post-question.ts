import { privateProcedure, publicProcedure } from '@/trpc/server/trpc';
import { z } from 'zod';
import { gptResponse } from '@/lib/open-ai';
import { db } from '@/lib/db';
import { MessageKind } from './get-messages';

export const postQuestion = privateProcedure
  .input(
    z.object({
      question: z.string(),
    })
  )
  .output(
    z.object({
      answer: z.string(),
    })
  )
  .mutation(async (opts) => {
    const question = opts.input.question;
    const answer = await gptResponse(question);
    const user = opts.ctx.userId;
    await db.message.create({
      data: {
        kind: MessageKind.QUESTION,
        content: question,
        userId: user,
      },
    });

    await db.message.create({
      data: {
        kind: MessageKind.ANSWER,
        content: answer ? answer : '',
        userId: user,
      },
    });
    return {
      answer: answer ?? '',
    };
  });
