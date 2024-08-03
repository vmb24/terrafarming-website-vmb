'use client'

import { FC } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutButtonProps {
  priceId: string
}

const CheckoutButton: FC<CheckoutButtonProps> = ({ priceId }) => {
  const handleClick = async () => {
    const stripe = await stripePromise
    const res = await fetch('/api/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    })

    const { id } = await res.json()
    const { error } = await stripe!.redirectToCheckout({ sessionId: id })

    if (error) {
      console.error('Error redirecting to Checkout:', error)
    }
  }

  return (
    <button
      role="link"
      onClick={handleClick}
      className="bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
    >
      Comprar
    </button>
  )
}

export default CheckoutButton
