'use client'

import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useTheme } from 'next-themes';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface AgricultureMetric {
  name: string;
  value: number;
  status: 'Ótimo' | 'Bom' | 'Atenção' | 'Risco';
  icon: string;
}

const AgriculturalMetricsRadar: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const metrics: AgricultureMetric[] = [
    { name: 'Crescimento das Plantas', value: 75, status: 'Ótimo', icon: '🌱' },
    { name: 'Saúde do Solo', value: 60, status: 'Bom', icon: '🌿' },
    { name: 'Eficiência da Irrigação', value: 80, status: 'Ótimo', icon: '💧' },
    { name: 'Risco de Pragas', value: 30, status: 'Risco', icon: '🐛' },
    { name: 'Produtividade da Colheita', value: 70, status: 'Bom', icon: '🌾' },
  ];

  const data = {
    labels: metrics.map(metric => ''),
    datasets: [
      {
        label: 'Métricas Agrícolas',
        data: metrics.map(metric => metric.value),
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          display: false,
        },
        ticks: {
          display: false,
        },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ótimo':
        return 'text-green-500';
      case 'Bom':
        return 'text-blue-500';
      case 'Atenção':
        return 'text-yellow-500';
      case 'Risco':
        return 'text-red-500';
      default:
        return '';
    }
  };

  const getTrendIcon = (value: number) => {
    if (value >= 70) return '↗️';
    if (value >= 50) return '→';
    return '↘️';
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} mb-8 w-[850px]`}>
      <h2 className="text-2xl font-bold mb-6">Análise de Impacto Agrícola</h2>
      <div className="flex justify-center">
        <div className="w-full h-[300px] relative">
          <Radar data={data} options={options} />
          {metrics.map((metric, index) => {
            const angle = -Math.PI / 2 + index * (2 * Math.PI / metrics.length);
            const radius = 0.78; // Ajuste este valor para mover as métricas para dentro ou fora
            return (
              <div
                key={index}
                className="absolute text-center"
                style={{
                  top: `${50 + radius * 50 * Math.sin(angle)}%`,
                  left: `${50 + radius * 50 * Math.cos(angle)}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                }}
              >
                <div className="text-3xl mb-1">{metric.icon}</div>
                <div className="font-semibold text-sm leading-tight">{metric.name}</div>
                <div className="text-lg font-bold">{metric.value}% {getTrendIcon(metric.value)}</div>
                <div className={`font-semibold ${getStatusColor(metric.status)} text-sm`}>
                  {metric.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgriculturalMetricsRadar;