import React from 'react';

interface CheckoutButtonProps {
  planName: string;
  price: number;
  currency: string;
  interval: string;
  onCheckout: () => void;
  features?: string[];
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ 
  planName, 
  onCheckout
}) => {
  return (
    <button
      onClick={onCheckout}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
    >
      Assinar {planName}
    </button>
  );
};

export default CheckoutButton;