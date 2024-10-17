// MarketplaceRecommendationsLocations.tsx
'use client'
import React, { useState } from 'react';
import { MapProvider } from './MapContext';
import MapComponent from './Map';
import RecommendationsList from './RecommendationList';
import OnlineRecommendations from './OnlineRecommendations';
import { useTheme } from 'next-themes';
import AuxiliaryProductsList from './AuxiliaryProductsList';

const MarketplaceRecommendationsLocations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'online' | 'profile' | 'notifications' | 'settings'>('local');
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark';

  const renderContent = () => {
    switch (activeTab) {
      case 'local':
        return (
          <div className="flex">
            <div className="w-1/4 pr-4">
              <RecommendationsList />
            </div>
            <div className="w-2/3">
              <MapComponent />
            </div>
            <div className='w-1/4'>
              <AuxiliaryProductsList />
            </div>
          </div>
        );
      case 'online':
        return <OnlineRecommendations />;
      case 'profile':
        return <div>Profile Content</div>;
      case 'notifications':
        return <div>Notifications Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
    }
  };

  return (
    <MapProvider>
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} flex h-[650px] rounded-md`}>
        {/* Sidebar */}
        <div className={`w-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4 flex flex-col items-center justify-between rounded-md`}>
          <div className="space-y-8">
            <button onClick={() => setActiveTab('local')} className={`p-2 rounded-full ${activeTab === 'local' ? 'bg-green-500' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button onClick={() => setActiveTab('online')} className={`p-2 rounded-full ${activeTab === 'online' ? 'bg-green-500' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </button>
            {/* <button onClick={() => setActiveTab('profile')} className={`p-2 rounded-full ${activeTab === 'profile' ? 'bg-green-500' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button> */}
          </div>
          {/* <div className="space-y-4">
            <button onClick={() => setActiveTab('notifications')} className={`p-2 rounded-full ${activeTab === 'notifications' ? 'bg-green-500' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button onClick={() => setActiveTab('settings')} className={`p-2 rounded-full ${activeTab === 'settings' ? 'bg-green-500' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-2">
          {renderContent()}
          <div id="recommendation-info" className="mt-4"></div>
        </div>
      </div>
    </MapProvider>
  );
};

export default MarketplaceRecommendationsLocations;