'use client'

import React from 'react';
import { useTheme } from 'next-themes';
import { MoreVertical, Droplet, Thermometer, Wind } from 'lucide-react';

const IrrigationSystem: React.FC = () => {
  const { theme } = useTheme();

  // Dados de exemplo para o gráfico de umidade do solo
  const soilMoistureData = [
    { position: 10, value: 30 },
    { position: 40, value: 45 },
    { position: 70, value: 35 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Sistema de Irrigação</h2>
        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="flex items-center">
          <Droplet className="text-blue-500 mr-2" size={24} />
          <div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">45%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Umidade do Solo</p>
          </div>
        </div>
        <div className="flex items-center">
          <Thermometer className="text-red-500 mr-2" size={24} />
          <div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">28°C</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Temperatura</p>
          </div>
        </div>
        <div className="flex items-center">
          <Wind className="text-green-500 mr-2" size={24} />
          <div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">10km/h</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Velocidade do Vento</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Umidade do Solo (Últimas 24h)</h3>
      <div className="relative h-64">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 opacity-20"></div>
        <div className="absolute inset-0">
          {soilMoistureData.map((point, index) => (
            <React.Fragment key={index}>
              <div 
                className="absolute bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded"
                style={{ left: `${point.position}%`, bottom: `${point.value}%` }}
              >
                {point.value}%
              </div>
              <div 
                className="absolute w-px h-full bg-gray-300 dark:bg-gray-600" 
                style={{ left: `${point.position}%` }}
              ></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IrrigationSystem;