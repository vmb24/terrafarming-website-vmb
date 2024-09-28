// components/RecommendationsBoard.tsx
import React from 'react';
import { MoistureRecommendations, TemperatureRecommendations } from '../types/soil';

interface RecommendationsBoardProps {
  recommendations: MoistureRecommendations | TemperatureRecommendations | null;
  category: 'moistureRecommendations' | 'temperatureRecommendations';
}

const RecommendationsBoard: React.FC<RecommendationsBoardProps> = ({ recommendations, category }) => {
  if (!recommendations) {
    return <div>Carregando recomendações...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {category === 'moistureRecommendations' ? 'Recomendações de Umidade do Solo' : 'Recomendações de Temperatura do Solo'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(recommendations).map(([key, value]) => (
          <div key={key} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-2">{key}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsBoard;