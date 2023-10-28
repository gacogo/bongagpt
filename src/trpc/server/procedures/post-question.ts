import { publicProcedure } from '@/trpc/server/trpc';
import { z } from 'zod';
import { gptResponse } from '@/lib/open-ai';

export const postQuestion = publicProcedure
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
    const answer = await gptResponse(opts.input.question);
    return {
      answer: answer ?? '',
    };
  });
