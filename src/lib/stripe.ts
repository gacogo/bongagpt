import { loadStripe } from '@stripe/stripe-js';

import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error('Stripe secret key is missing');
}
export const stripe = new Stripe(secretKey, {
  apiVersion: '2023-10-16',
});
export const getStripe = () => {
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripePublicKey) {
    throw new Error('Stripe public key is missing');
  }

  return loadStripe(stripePublicKey);
};
