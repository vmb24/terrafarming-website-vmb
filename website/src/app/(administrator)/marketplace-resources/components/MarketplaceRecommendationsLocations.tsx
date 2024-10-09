// MarketplaceRecommendationsLocations.tsx
'use client'
import React, { useState } from 'react';
import { MapProvider } from './MapContext';
import MapComponent from './Map';
import RecommendationsList from './RecommendationList';
import OnlineRecommendations from './OnlineRecommendations';
import { useTheme } from 'next-themes';

const MarketplaceRecommendationsLocations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'online'>('local');
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark';

  return (
    <MapProvider>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} -mt-20 rounded-md p-4`}>
        <div className="flex mb-4 space-x-2">
          <button 
            onClick={() => setActiveTab('local')}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeTab === 'local' 
                ? 'bg-green-500 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-white text-gray-700'
            }`}
          >
            Local
          </button>
          <button 
            onClick={() => setActiveTab('online')}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeTab === 'online' 
                ? 'bg-green-500 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-white text-gray-700'
            }`}
          >
            Online
          </button>
        </div>
        {activeTab === 'local' ? (
          <div className="flex">
            <div className="w-1/3 pr-4">
              <RecommendationsList />
            </div>
            <div className="w-2/3">
              <MapComponent />
            </div>
          </div>
        ) : (
          <OnlineRecommendations />
        )}
        <div id="recommendation-info" className="mt-4"></div>
      </div>
    </MapProvider>
  );
};

export default MarketplaceRecommendationsLocations;