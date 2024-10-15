'use client'

import React from 'react';
import { Sun, Droplet, Image as ImageIcon, Tractor, Cpu, Brain, Bug } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface MetricCardProps {
  id: string;
  title: string;
  imageSrc: string | null;
  description: string;
  icon: React.ElementType;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ id, title, imageSrc, description, icon: Icon, color }) => {
  const { theme } = useTheme();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-t-4${color}`}>
      <div className="relative h-48 rounded-t-lg overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-700">
            <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Imagem não disponível</span>
          </div>
        )}
        <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded-full text-xs">{id}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <Icon className={`w-6 h-6 mr-2 ${color.replace('border-', 'text-')}`} />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      </div>
    </div>
  );
};

const AgricultureReport: React.FC = () => {
  const { theme } = useTheme();

  const metrics = [
    { id: '01', title: 'Ferramentas de agricultura de precisão', imageSrc: null, description: 'Tecnologia avançada que utiliza sensores de precisão e análise de dados para otimizar cada etapa do processo agrícola.', icon: Tractor, color: 'border-green-500' },
    { id: '02', title: 'Sistemas de irrigação inteligentes', imageSrc: null, description: 'Sensores e controles automáticos regulam o volume e as programações de irrigação com base no solo e nas condições climáticas.', icon: Droplet, color: 'border-blue-500' },
    { id: '03', title: 'Previsão de rendimento com base em IA', imageSrc: null, description: 'Os algoritmos de aprendizado de máquina analisam os dados para fornecer previsões precisas de rendimento e sugestões de otimização.', icon: Brain, color: 'border-purple-500' },
    { id: '04', title: 'Gerenciamento sustentável de pragas', imageSrc: null, description: 'Soluções integradas que minimizam o uso de produtos químicos e maximizam a proteção das culturas por meio de controles biológicos.', icon: Bug, color: 'border-red-500' },
  ];

  return (
    <div className="bg-green-50 dark:bg-gray-900 p-8 rounded-md">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center">
          <Cpu className="w-8 h-8 mr-2 text-green-500 font-semibold" />
          Soluções de Agricultura Sustentável
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Cultivo de Culturas, Preservação de Recursos</p>
        <p className="mb-4 text-gray-700 dark:text-gray-200 mt-8">Explore nossa gama de soluções agrícolas inovadoras projetadas para otimizar o rendimento das colheitas, minimizar o uso de recursos e simplificar as operações agrícolas.</p>
        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition flex items-center">
          <Sun className="w-5 h-5 mr-2" />
          Explore o relatório
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-[-1rem] p-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default AgricultureReport;