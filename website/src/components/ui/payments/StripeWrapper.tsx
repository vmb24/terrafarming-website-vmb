'use client'
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeWrapperProps {
  children: React.ReactNode;
}

export function StripeWrapper({ children }: StripeWrapperProps) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}