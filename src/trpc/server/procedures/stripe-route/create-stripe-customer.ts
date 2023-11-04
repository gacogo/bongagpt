import { z } from 'zod';
import { privateProcedure } from '../../trpc';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

const newStripeCustomer = async (email: string) => {
  const customer = await stripe.customers.create({ email: email });
  return customer;
};

export const createStripeCustomer = privateProcedure
  .input(z.object({ email: z.string() }))
  .output(
    z.object({
      email: z.string(),
      kindeUserId: z.string(),
      stripeCustomerId: z.string(),
    })
  )
  .mutation(async (opts) => {
    const customer = await newStripeCustomer(opts.input.email);
    const kindeUserId = opts.ctx.userId;
    const stripeEmail = customer.email ?? opts.input.email;
    await db.customer.create({
      data: {
        kindeUserId: kindeUserId,
        stripeCustomerId: customer.id,
        email: stripeEmail,
      },
    });
    return {
      stripeCustomerId: customer.id,
      kindeUserId: kindeUserId,
      email: stripeEmail,
    };
  });
