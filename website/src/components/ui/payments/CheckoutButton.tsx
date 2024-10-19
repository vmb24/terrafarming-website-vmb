import React from 'react';

interface CheckoutButtonProps {
  planName: string;
  price: number;
  currency: string;
  interval: string;
  onCheckout: () => void;
  features?: string[];
  className?: string; // Novo atributo para aceitar classes personalizadas
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ 
  planName, 
  onCheckout,
  className = '' // Valor padrão como string vazia
}) => {
  // Combine as classes padrão com as classes personalizadas
  const buttonClasses = `bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ${className}`.trim();

  return (
    <button
      onClick={onCheckout}
      className={buttonClasses}
    >
      Assinar {planName}
    </button>
  );
};

export default CheckoutButton;