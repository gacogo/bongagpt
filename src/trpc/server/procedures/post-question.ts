import { privateProcedure, publicProcedure } from '@/trpc/server/trpc';
import { z } from 'zod';
import { gptResponse } from '@/lib/open-ai';
import { db } from '@/lib/db';
import { MessageType } from '@/trpc/server/procedures/get-messages';



const PostQuestionInput = z.object({
  question: z.string(),
})

const PostQuestionOutPut = z.object({
  answer: z.string(),
})

export const postQuestion = privateProcedure
  .input(PostQuestionInput)
  .output(PostQuestionOutPut)
  .mutation(async (opts) => {
    const question = opts.input.question;
    const userId = opts.ctx.userId;
    const kind = MessageType.QUESTION;
    const answer = await gptResponse(question);
    await db.message.create({
      data: {
        kind,
        userId,
        content: question,
      },
    });
   
    await db.message.create({
      data: {
        kind: MessageType.ANSWER,
        content: answer ? answer : '',
        userId: userId,
      },
    });
    return {
      answer: answer ?? '',
    };
  });
