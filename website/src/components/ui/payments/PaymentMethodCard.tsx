'use client'

import React, { useState } from 'react';
import CreditCard from './CreditCard';

interface Card {
  cardNumber: string;
  cardBrand: string | null;
  expiry: string;
  cvc: string;
}

const PaymentMethodCard: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<Card>({
    cardNumber: '',
    cardBrand: null,
    expiry: '',
    cvc: '',
  });

  const [activeMenu, setActiveMenu] = useState('Cartões salvos');

  const detectCardBrand = (number: string): string | null => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
    };

    for (const [brand, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) return brand;
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'cardNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 16);
      const cardBrand = detectCardBrand(processedValue);
      setCurrentCard(prev => ({ ...prev, cardBrand }));
    } else if (name === 'expiry') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
      if (processedValue.length > 2) {
        processedValue = `${processedValue.slice(0, 2)}/${processedValue.slice(2)}`;
      }
    } else if (name === 'cvc') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCurrentCard(prev => ({ ...prev, [name]: processedValue }));
  };

  const addCard = () => {
    console.log('Cartão adicionado:', currentCard);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      
      <div className="flex space-x-4 mb-6">
        {['Cartões salvos', 'Endereços salvos', 'Preferências de notificações', 'Conta bancária'].map((menu) => (
          <button
            key={menu}
            onClick={() => setActiveMenu(menu)}
            className={`px-4 py-2 rounded-full ${
              activeMenu === menu ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {menu}
          </button>
        ))}
      </div>
      
      {activeMenu === 'Cartões salvos' && (
        <>
          <h2 className="text-xl font-bold mb-4 mt-16">Detalhes do Pagamento</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <CreditCard
                cardNumber={currentCard.cardNumber}
                cardBrand={currentCard.cardBrand}
                expiry={currentCard.expiry}
                cvc={currentCard.cvc}
              />
            </div>
            
            <div className="w-full md:w-1/2 space-y-4">
                <input
                    type="text"
                    name="cardNumber"
                    value={currentCard.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Número do Cartão"
                    className="w-full p-3 bg-gray-800 rounded"
                />
                <div className="flex space-x-4">
                    <input
                        type="text"
                        name="expiry"
                        value={currentCard.expiry}
                        onChange={handleInputChange}
                        placeholder="MM / AA"
                        className="w-1/2 p-3 bg-gray-800 rounded"
                    />
                    <input
                        type="text"
                        name="cvc"
                        value={currentCard.cvc}
                        onChange={handleInputChange}
                        placeholder="CVC"
                        className="w-1/2 p-3 bg-gray-800 rounded"
                    />
                </div>

                <button 
                    onClick={addCard}
                    className="w-full mt-6 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                    Adicionar cartão
                </button>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default PaymentMethodCard;