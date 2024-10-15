'use client'

import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Droplet, Thermometer, Wind, Leaf, Image as ImageIcon } from 'lucide-react';

interface AgricultureCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  imageSrc: string;
}

const AgricultureCard: React.FC<AgricultureCardProps> = ({ id, title, description, icon: Icon, imageSrc }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700">
            <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Imagem não disponível</span>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
          {id}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center mb-2">
          <Icon className="w-5 h-5 mr-2" />
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
);

const SustainableAgricultureSolutions: React.FC = () => {
  const { theme } = useTheme();

  const agricultureData = [
    {
      id: '01',
      title: 'Monitoramento de Umidade do Solo',
      description: 'Sensores avançados medem a umidade do solo em tempo real, otimizando a irrigação e conservando água.',
      icon: Droplet,
      imageSrc: ''
    },
    {
      id: '02',
      title: 'Controle de Temperatura do Solo',
      description: 'Sistemas inteligentes monitoram e ajustam a temperatura do solo para criar condições ideais de crescimento.',
      icon: Thermometer,
      imageSrc: ''
    },
    {
      id: '03',
      title: 'Gestão de Luminosidade',
      description: 'Tecnologia de ponta para otimizar a exposição à luz, maximizando a fotossíntese e o crescimento das plantas.',
      icon: Sun,
      imageSrc: ''
    },
    {
      id: '04',
      title: 'Controle de Umidade do Ar',
      description: 'Sistemas automatizados regulam a umidade do ar para prevenir doenças e melhorar a saúde das plantas.',
      icon: Wind,
      imageSrc: ''
    },
    {
      id: '05',
      title: 'Monitoramento da Temperatura do Ar',
      description: 'Sensores precisos e IA trabalham juntos para manter a temperatura ideal para cada tipo de cultivo.',
      icon: Leaf,
      imageSrc: ''
    }
  ];

  return (
    <div className="bg-green-50 dark:bg-gray-900 min-h-screen p-4">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white max-w-2xl">
              Soluções de Agricultura Sustentável: Nutrindo Culturas, Preservando Recursos
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">Nosso Produto</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
            Explore nossa gama de soluções agrícolas inovadoras projetadas para otimizar o rendimento das colheitas, 
            minimizar o uso de recursos e simplificar as operações agrícolas.
          </p>
          <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors duration-300 flex items-center">
            Explore Mais
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agricultureData.map((item) => (
            <AgricultureCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SustainableAgricultureSolutions;