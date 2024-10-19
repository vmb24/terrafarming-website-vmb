import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use a versão mais recente suportada
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planName, price, currency, interval } = body;

    console.log('Dados recebidos:', { planName, price, currency, interval });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: planName,
            },
            unit_amount: price,
            recurring: {
              interval: interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/settings-iot`,
    });

    console.log('Sessão criada com sucesso:', session.id);
    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error('Erro detalhado:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}