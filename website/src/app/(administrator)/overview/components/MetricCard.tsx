// components/MetricCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface MetricCardProps {
  title: string;
  value: number | null;
  unit: string;
  status: string | null;
  date: string | null;
  max: number;
  type: 'soil-moisture' | 'soil-temperature' | 'brightness' | 'air-moisture' | 'air-temperature';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, status, date, max, type }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const hasData = value !== null && status !== null && date !== null;
  const { theme } = useTheme();

  useEffect(() => {
    if (hasData && value !== null) {
      let start = 0;
      const end = value;
      const duration = 1000;
      const startTime = performance.now();

      const animateValue = (timestamp: number) => {
        const runtime = timestamp - startTime;
        const progress = Math.min(runtime / duration, 1);
        const currentValue = start + (end - start) * progress;

        setAnimatedValue(currentValue);
        setAnimatedWidth((currentValue / max) * 100);

        if (runtime < duration) {
          requestAnimationFrame(animateValue);
        }
      };

      requestAnimationFrame(animateValue);
    } else {
      setAnimatedValue(0);
      setAnimatedWidth(0);
    }
  }, [value, hasData, max]);

  const getBarColor = () => {
    switch (type) {
      case 'soil-moisture':
      case 'air-moisture':
        return 'bg-blue-500 dark:bg-blue-400';
      case 'soil-temperature':
      case 'air-temperature':
        return 'bg-red-500 dark:bg-red-400';
      case 'brightness':
        return 'bg-yellow-500 dark:bg-yellow-400';
      default:
        return 'bg-gray-500 dark:bg-gray-400';
    }
  };

  const barColor = getBarColor();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg w-72 shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{title}</h2>
      <div className="relative pt-1 mb-4">
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-600">
          <div 
            style={{ width: `${animatedWidth}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${barColor} transition-all duration-500 ease-in-out`}
          ></div>
        </div>
      </div>
      <p className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
        {animatedValue.toFixed(1)} {unit}
      </p>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status: {hasData ? status : 'Não disponível'}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {hasData ? `Criado em: ${new Date(date!).toLocaleDateString()}` : 'Data não disponível'}
        </p>
      </div>
    </div>
  );
};

export default MetricCard;