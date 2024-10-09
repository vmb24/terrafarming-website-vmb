// RecommendationsList.tsx
'use client'
import React from 'react';
import { useMap } from './MapContext';
import { useTheme } from 'next-themes';

const RecommendationsList: React.FC = () => {
  const { recommendations, setSelectedRecommendation } = useMap();
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark';

  return (
    <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Recomendações</h2>
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}>{recommendations.length} áreas</span>
      </div>
      <div className="space-y-4">
        {recommendations.map(recommendation => (
          <div 
            key={recommendation.id} 
            className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow p-4 flex items-center space-x-4 cursor-pointer transition-colors duration-200`} 
            onClick={() => setSelectedRecommendation(recommendation)}
          >
            <div className={`w-1 h-16 rounded-full ${recommendation.color}`}></div>
            <div className="flex-grow">
              <div className="font-semibold">{recommendation.crop}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{recommendation.location}</div>
              <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                <span>R${recommendation.price.toFixed(2)}</span>
                <span>{recommendation.estimatedTime} min</span>
              </div>
            </div>
            <button className={`p-2 ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} rounded-full transition-colors duration-200`}>
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