// components/RecommendationsBoard.tsx
import React from 'react';
import { MoistureRecommendations, TemperatureRecommendations } from '../types/types';
import { useTheme } from 'next-themes';

interface RecommendationsBoardProps {
  recommendations: MoistureRecommendations | TemperatureRecommendations | null;
  category: 'soilMoisture' | 'soilTemperature' | 'brightness' | 'airTemperature' | 'airMoisture';
}

const RecommendationsBoard: React.FC<RecommendationsBoardProps> = ({ recommendations, category }) => {
  const { theme } = useTheme();

  const getCategoryTitle = () => {
    switch (category) {
      case 'soilMoisture':
        return 'Recomendações de Umidade do Solo';
      case 'soilTemperature':
        return 'Recomendações de Temperatura do Solo';
      case 'brightness':
        return 'Recomendações de Luminosidade';
      case 'airTemperature':
        return 'Recomendações de Temperatura do Ar';
      case 'brightness':
        return 'Recomendações de Umidade do Ar';
      default:
        return 'Recomendações';
    }
  };

  if (!recommendations) {
    return <div className="text-gray-800 dark:text-gray-200">Carregando recomendações...</div>;
  }

  const recommendationEntries = Object.entries(recommendations);

  return (
    <div>
      <h2 className="text-xl text-gray-800 dark:text-white font-bold mb-4 -mt-24">
        {getCategoryTitle()}
      </h2>
      {recommendationEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendationEntries.map(([key, value]) => (
            <div key={key} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 dark:text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{key}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{value}</p>
              <div className="flex items-center text-xs mt-6 text-gray-400 dark:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date().toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">Não há recomendações para esta métrica.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsBoard;