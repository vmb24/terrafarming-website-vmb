// components/PredictiveMetricCard.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();

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
        return { icon: '📊', color: 'text-green-500 dark:text-green-400' };
      case 'irrigation':
        return { icon: '💧', color: 'text-blue-500 dark:text-blue-400' };
      case 'stress':
        return { icon: '🌡️', color: 'text-red-500 dark:text-red-400' };
      case 'planting':
        return { icon: '🌱', color: 'text-brown-500 dark:text-brown-400' };
      case 'pest':
        return { icon: '🐛', color: 'text-yellow-500 dark:text-yellow-400' };
      default:
        return { icon: '📈', color: 'text-gray-500 dark:text-gray-400' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg w-72 shadow-md p-6">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">{icon}</span>
        <h2 className="text-md font-semibold dark:text-white">{title}</h2>
      </div>
      {value !== null ? (
        <>
          <p className={`text-xl font-bold text-center mb-4 ${color}`}>
            {typeof value === 'number' ? animatedValue.toFixed(1) : value}
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </p>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          {lastUpdated && (
            <div className="border-t dark:border-gray-700 pt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Última atualização: {new Date(lastUpdated).toLocaleString()}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="text-xl font-bold text-center mb-4 text-gray-400 dark:text-gray-500">Sem dados</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Dados não disponíveis no momento</p>
        </>
      )}
    </div>
  );
};

export default PredictiveMetricCard;