// RecommendationsList.tsx
'use client'
import React from 'react';
import { useMap } from './MapContext';

const RecommendationsList: React.FC = () => {
  const { recommendations, setSelectedRecommendation } = useMap();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Recomendações</h2>
        <span className="text-gray-500">{recommendations.length} áreas</span>
      </div>
      <div className="space-y-4">
        {recommendations.map(recommendation => (
          <div 
            key={recommendation.id} 
            className="bg-white rounded-lg shadow p-4 flex items-center space-x-4 cursor-pointer" 
            onClick={() => setSelectedRecommendation(recommendation)}
          >
            <div className={`w-1 h-16 rounded-full ${recommendation.color}`}></div>
            <div className="flex-grow">
              <div className="font-semibold">{recommendation.crop}</div>
              <div className="text-sm text-gray-500">{recommendation.location}</div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>R${recommendation.price.toFixed(2)}</span>
                <span>{recommendation.estimatedTime} min</span>
              </div>
            </div>
            <button className="p-2 bg-gray-200 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;