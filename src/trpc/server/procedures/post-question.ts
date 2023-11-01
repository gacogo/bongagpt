import { privateProcedure, publicProcedure } from '@/trpc/server/trpc';
import { z } from 'zod';
import { gptResponse } from '@/lib/open-ai';
import { db } from '@/lib/db';

const PostQuestionInput = z.object({
  question: z.string(),
});

const PostQuestionOutPut = z.object({
  answer: z.string(),
});

export const postQuestion = privateProcedure
  .input(PostQuestionInput)
  .output(PostQuestionOutPut)
  .mutation(async (opts) => {
    const question = opts.input.question;
    const userId = opts.ctx.userId;
    const answer = await gptResponse(question);
    const postedQuestion = await db.question.create({
      data: {
        userId,
        content: question,
      },
    });

    await db.answer.create({
      data: {
        content: answer ? answer : '',
        userId,
        question: {
          connect: {
            id: postedQuestion.id,
          },
        },
      },
    });
    return {
      answer: answer ?? '',
    };
  });
