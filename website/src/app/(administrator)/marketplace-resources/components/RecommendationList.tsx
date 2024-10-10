// RecommendationsList.tsx
'use client'
import React from 'react';
import { useMap } from './MapContext';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const RecommendationsList: React.FC = () => {
  const { recommendations, setSelectedRecommendation } = useMap();
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark';

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-md mt-2 p-2`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recomendações</h2>
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}>{recommendations.length} áreas</span>
      </div>
      <div className="space-y-4 h-[550px] overflow-y-auto pr-2">
        {recommendations.map(recommendation => (
          <div 
            key={recommendation.id} 
            className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow cursor-pointer transition-colors duration-200 overflow-hidden`} 
            onClick={() => setSelectedRecommendation(recommendation)}
          >
            <div className="relative">
              <Image 
                src={recommendation.imageUrl} 
                alt={recommendation.crop} 
                width={300} 
                height={150} 
                className="w-full h-36 object-cover"
              />
              <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center">
                <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded">{recommendation.location}</span>
                <span className="flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {recommendation.rating}
                </span>
              </div>
            </div>
            <div className="p-3">
              <div className="font-semibold">{recommendation.crop}</div>
              <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mt-2`}>
                <span>R${recommendation.price.toFixed(2)}</span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recommendation.estimatedTime} min
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;