// components/SoilCard.tsx
import React from 'react';

interface SoilCardProps {
  title: string;
  value: number | undefined;
  unit: string;
  status: string | undefined;
  date: string | undefined;
}

const SoilCard: React.FC<SoilCardProps> = ({ title, value, unit, status, date }) => {
  const hasData = value !== undefined && status !== undefined && date !== undefined;

  return (
    <div className="bg-white rounded-lg w-72 shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {hasData ? (
        <>
          <p className="text-3xl font-bold mb-2">
            {value.toFixed(1)} {unit}
          </p>
          <p className="text-sm text-gray-600 mb-2">{status}</p>
          <p className="text-sm text-gray-600">Criado em: {new Date(date).toLocaleDateString()}</p>
        </>
      ) : (
        <>
          <p className="text-3xl font-bold mb-2">Sem dados</p>
          <p className="text-sm text-gray-600 mb-2">Status: Não disponível</p>
          <p className="text-sm text-gray-600">Data não disponível</p>
        </>
      )}
    </div>
  );
};

export default SoilCard;