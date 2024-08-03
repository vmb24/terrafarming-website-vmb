// pages/api/create-checkout-session.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
})

type CreateCheckoutSessionRequest = {
  priceId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { priceId }: CreateCheckoutSessionRequest = req.body

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: priceId,
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      })

      res.status(200).json({ id: session.id })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
