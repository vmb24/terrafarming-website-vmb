import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe('seu_stripe_publishable_key');