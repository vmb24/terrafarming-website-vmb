// components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  activeCategory: 'moisture' | 'temperature' | 'moistureRecommendations' | 'temperatureRecommendations';
  setActiveCategory: (category: 'moisture' | 'temperature' | 'moistureRecommendations' | 'temperatureRecommendations') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Categorias</h2>
      <ul>
        <li 
          className={`cursor-pointer p-2 mb-2 rounded ${activeCategory === 'moisture' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveCategory('moisture')}
        >
          Umidade do Solo
        </li>
        <li 
          className={`cursor-pointer p-2 mb-2 rounded ${activeCategory === 'temperature' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveCategory('temperature')}
        >
          Temperatura do Solo
        </li>
        <li 
          className={`cursor-pointer p-2 mb-2 rounded ${activeCategory === 'moistureRecommendations' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveCategory('moistureRecommendations')}
        >
          Recomendações de Umidade
        </li>
        <li 
          className={`cursor-pointer p-2 rounded ${activeCategory === 'temperatureRecommendations' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveCategory('temperatureRecommendations')}
        >
          Recomendações de Temperatura
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;