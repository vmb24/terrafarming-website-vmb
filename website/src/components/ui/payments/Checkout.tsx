// Checkout.tsx
import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import CreditCard from './CreditCard';

interface CheckoutProps {
  planName: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  onReturn: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ planName, price, currency, interval, features, onReturn }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleCardNumberChange = (event: any) => {
    console.log('Card number change event:', event);
    if (event.complete) {
      setCardNumber(event.empty ? '' : '•••• •••• •••• ' + event.value.substr(-4));
    }
    if (event.brand) {
      setCardBrand(event.brand);
    } else {
      setCardBrand(null);
    }
  };

  const handleCardExpiryChange = (event: any) => {
    if (event.complete) {
      setExpiry(event.value);
    }
  };

  const handleCardCvcChange = (event: any) => {
    if (event.complete) {
      setCvc(event.value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe não está carregado');
      setLoading(false);
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      setError('Elementos do cartão não encontrados');
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
    });

    if (error) {
      setError(error.message || 'Erro ao processar o pagamento');
    } else {
      console.log('Payment Method:', paymentMethod);
      alert('Pagamento processado com sucesso! Bem-vindo ao plano ' + planName);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8 mx-auto w-full max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Checkout - Plano {planName}</h1>
      
      <div className="bg-green-800 p-4 rounded-lg mb-6">
        <h2 className="font-semibold">Transforme sua agricultura com tecnologia inteligente!</h2>
        <p>Aproveite os recursos avançados para otimizar sua produção e aumentar sua produtividade.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Informações da Assinatura</h2>
          <div className="mb-4">
            <label className="block mb-2">Nome Completo</label>
            <input type="text" className="w-full p-2 border rounded bg-gray-800 border-gray-700" placeholder="Seu nome completo" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input type="email" className="w-full p-2 border rounded bg-gray-800 border-gray-700" placeholder="seu@email.com" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Telefone</label>
            <input type="tel" className="w-full p-2 border rounded bg-gray-800 border-gray-700" placeholder="+55 (11) 98765-4321" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Detalhes do Pagamento</h2>
          <div className='mt-12'>
            <CreditCard cardNumber={cardNumber} cardBrand={cardBrand} expiry={expiry} cvc={cvc} />
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4 mt-8">
              <label className="block mb-2">Número do Cartão</label>
              <CardNumberElement 
                className="p-3 border rounded bg-gray-800 border-gray-700"
                onChange={handleCardNumberChange}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#ffffff',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#ff0000',
                    },
                  },
                }}
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label className="block mb-2">Data de Expiração</label>
                <CardExpiryElement 
                  className="p-3 border rounded bg-gray-800 border-gray-700" 
                  onChange={handleCardExpiryChange}
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2">CVC</label>
                <CardCvcElement 
                  className="p-3 border rounded bg-gray-800 border-gray-700" 
                  onChange={handleCardCvcChange}
                />
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              type="submit"
              disabled={!stripe || loading}
              className="bg-green-600 text-white p-2 rounded w-full hover:bg-green-700 transition-colors mb-4"
            >
              {loading ? 'Processando...' : `Assinar ${planName}`}
            </button>
            <button
              type="button"
              onClick={onReturn}
              className="bg-gray-700 text-white p-2 rounded w-full hover:bg-gray-600 transition-colors"
            >
              Voltar para Planos
            </button>
          </form>
        </div>
      </div>

      {/* Resto do componente (Resumo do Plano e Política de Cancelamento) permanece o mesmo */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Resumo do Plano</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Plano</span>
            <span>{planName}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Preço</span>
            <span>{currency} {price}/{interval}</span>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Recursos Incluídos:</h3>
            <ul className="list-disc pl-5">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between font-bold mt-4">
            <span>Total</span>
            <span>{currency} {price}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Política de Cancelamento</h2>
        <p>
          Entendemos que as necessidades agrícolas podem mudar. Você pode cancelar ou modificar sua assinatura a qualquer momento sem custos adicionais. O cancelamento será efetivo no final do período de faturamento atual.
        </p>
        <a href="#" className="text-green-500 hover:underline">Ver mais detalhes</a>
      </div>
    </div>
  );
};

export default Checkout;