'use client'

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { useTheme } from 'next-themes';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const WeatherAlert: React.FC = () => {
  const { theme } = useTheme();

  const chartData = {
    labels: ['', '', '', ''],
    datasets: [
      {
        fill: true,
        label: 'Tendência Climática',
        data: [8, 32, 60, 67],
        borderColor: 'rgba(0, 0, 0, 0)',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 400, 0);
          gradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
          gradient.addColorStop(0.5, 'rgba(255, 255, 0, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0.8)');
          return gradient;
        },
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-gray-800 h-[400px] rounded-lg shadow-lg p-6 max-w-2xl mb-8 text-white">
      <h2 className="text-2xl font-semibold mb-6">Alerta Climático</h2>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div>
          <p className="text-3xl font-bold">28°C</p>
          <p className="text-gray-400">Temperatura</p>
        </div>
        <div>
          <p className="text-3xl font-bold">45mm</p>
          <p className="text-gray-400">Precipitação</p>
        </div>
        <div>
          <p className="text-3xl font-bold">67%</p>
          <p className="text-gray-400">Impacto na Agricultura</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-yellow-500">Atenção</p>
          <p className="text-gray-400">Alerta de Clima Extremo</p>
        </div>
      </div>

      <div className="relative h-24 mb-6">
        <Line options={chartOptions} data={chartData} />
        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center pointer-events-none">
          {[8, 32, 60, 67].map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-sm mb-1">{value}%</span>
              <div className="h-full border-l border-dashed border-gray-600"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-gray-400">
        <p>Período: Próximas 24 horas</p>
        <p>Tendência: Piora nas condições climáticas</p>
      </div>
    </div>
  );
};

export default WeatherAlert;