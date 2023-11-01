import { db } from '@/lib/db';
import { privateProcedure } from '@/trpc/server/trpc';
import { z } from 'zod';

export const getMessages = privateProcedure
  .output(
    z.array(
      z.object({
        id: z.number(),
        question: z.string(),
        createdAt: z.date(),
        answers: z.array(
          z.object({
            id: z.number(),
            content: z.string(),
            createdAt: z.date(),
          })
        ),
      })
    )
  )
  .query(async (opts) => {
    const qAndA = await db.question.findMany({
      where: {
        userId: opts.ctx.userId,
      },
      include: {
        answers: true,
      },
    });
    return qAndA.map((question) => {
      return {
        id: question.id,
        question: question.content,
        createdAt: question.createdAt,
        answers: question.answers.map((answer) => ({
          id: answer.id,
          content: answer.content,
          createdAt: answer.createdAt,
          userId: answer.userId,
        })),
      };
    });
  });
