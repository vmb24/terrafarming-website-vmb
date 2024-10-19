// CreditCard.tsx
import React from 'react';
import visa from '@/assets/card-brands/visa.png';
import mastercard from '@/assets/card-brands/mastercard.png';
import amex from '@/assets/card-brands/amex.png';
import discover from '@/assets/card-brands/discover.png';
import { StaticImageData } from 'next/image';

interface CreditCardProps {
  cardNumber: string;
  cardBrand: string | null;
  expiry: string;
  cvc: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ cardNumber, cardBrand, expiry, cvc }) => {
  const getCardBrandImage = (brand: string | null): StaticImageData | null => {
    if (!brand) return null;
    switch (brand) {
      case 'visa': return visa;
      case 'mastercard': return mastercard;
      case 'amex': return amex;
      case 'discover': return discover;
      default: return null;
    }
  };

  const cardBrandImage = getCardBrandImage(cardBrand);

  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 rounded-xl shadow-lg w-96 h-56 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        {cardBrandImage && (
          <img 
            src={cardBrandImage.src} 
            alt={`${cardBrand} logo`} 
            className="h-12" 
          />
        )}
      </div>
      <div className="text-white mt-16">
        <div className="text-2xl tracking-wider">
          {cardNumber || '•••• •••• •••• ••••'}
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <div className="text-xs opacity-75">Expiry</div>
            <div>{expiry || 'MM/YY'}</div>
          </div>
          <div>
            <div className="text-xs opacity-75">CVC</div>
            <div>{cvc || '•••'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;