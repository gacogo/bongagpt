import { privateProcedure, publicProcedure } from '@/trpc/server/trpc';
import { z } from 'zod';
import { gptResponse } from '@/lib/open-ai';
import { db } from '@/lib/db';

const PostQuestionInput = z.object({
  question: z.string(),
});

const PostQuestionOutPut = z.object({
  answer: z.object({
    content: z.string(),
    userId: z.string(),
    id: z.number(),
  }),
});

export const postQuestion = privateProcedure
  .input(PostQuestionInput)
  .output(PostQuestionOutPut)
  .mutation(async (opts) => {
    const question = opts.input.question;
    const userId = opts.ctx.userId;
    const gptAnswer = await gptResponse(question);
    const postedQuestion = await db.question.create({
      data: {
        userId,
        content: question,
      },
    });

    const postedAnswer = await db.answer.create({
      data: {
        content: gptAnswer ? gptAnswer : '',
        userId,
        question: {
          connect: {
            id: postedQuestion.id,
          },
        },
      },
    });
    return {
      answer: {
        content: postedAnswer.content,
        userId: postedAnswer.userId,
        id: postedAnswer.id,
      },
    };
  });
