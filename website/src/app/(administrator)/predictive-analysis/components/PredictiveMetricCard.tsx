// components/PredictiveMetricCard.tsx
'use client'
import React, { useState, useEffect } from 'react';

interface PredictiveMetricCardProps {
  title: string;
  value: string | number | null;
  unit?: string;
  description: string;
  lastUpdated: string | null;
  type: 'yield' | 'irrigation' | 'stress' | 'planting' | 'pest';
}

const PredictiveMetricCard: React.FC<PredictiveMetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  description, 
  lastUpdated, 
  type 
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 1000;
      const startTime = performance.now();

      const animateValue = (timestamp: number) => {
        const runtime = timestamp - startTime;
        const progress = Math.min(runtime / duration, 1);
        const currentValue = start + (end - start) * progress;

        setAnimatedValue(currentValue);

        if (runtime < duration) {
          requestAnimationFrame(animateValue);
        }
      };

      requestAnimationFrame(animateValue);
    }
  }, [value]);

  const getIconAndColor = () => {
    switch (type) {
      case 'yield':
        return { icon: '📊', color: 'text-green-500' };
      case 'irrigation':
        return { icon: '💧', color: 'text-blue-500' };
      case 'stress':
        return { icon: '🌡️', color: 'text-red-500' };
      case 'planting':
        return { icon: '🌱', color: 'text-brown-500' };
      case 'pest':
        return { icon: '🐛', color: 'text-yellow-500' };
      default:
        return { icon: '📈', color: 'text-gray-500' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div className="bg-white rounded-lg w-72 shadow-md p-6">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">{icon}</span>
        <h2 className="text-md font-semibold">{title}</h2>
      </div>
      {value !== null ? (
        <>
          <p className={`text-xl font-bold text-center mb-4 ${color}`}>
            {typeof value === 'number' ? animatedValue.toFixed(1) : value}
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </p>
          <p className="text-sm text-center text-gray-600 mb-4">{description}</p>
          {lastUpdated && (
            <div className="border-t pt-2">
              <p className="text-xs text-gray-500">Última atualização: {new Date(lastUpdated).toLocaleString()}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="text-xl font-bold text-center mb-4 text-gray-400">Sem dados</p>
          <p className="text-sm text-gray-600 mb-4">Dados não disponíveis no momento</p>
        </>
      )}
    </div>
  );
};

export default PredictiveMetricCard;