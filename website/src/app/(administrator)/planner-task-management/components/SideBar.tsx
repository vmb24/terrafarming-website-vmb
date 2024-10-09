// components/Sidebar.tsx
import React from 'react';
import { SparklesIcon, FireIcon, CloudIcon, BeakerIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';

interface SidebarProps {
  activeCategory: 'moisture' | 'temperature' | 'moistureRecommendations' | 'temperatureRecommendations';
  setActiveCategory: (category: 'moisture' | 'temperature' | 'moistureRecommendations' | 'temperatureRecommendations') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory }) => {
  const { theme } = useTheme();

  const menuItems = [
    { name: 'Umidade do Solo', icon: SparklesIcon, category: 'moisture' },
    { name: 'Temperatura do Solo', icon: FireIcon, category: 'temperature' },
    { name: 'Recomendações de Umidade', icon: CloudIcon, category: 'moistureRecommendations' },
    { name: 'Recomendações de Temperatura', icon: BeakerIcon, category: 'temperatureRecommendations' },
  ];

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 h-screen p-4 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Categorias</h2>
      <ul>
        {menuItems.map((item) => (
          <li 
            key={item.category}
            className={`cursor-pointer p-2 mb-2 rounded flex items-center ${
              activeCategory === item.category 
                ? 'bg-green-600 text-white' 
                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory(item.category as any)}
          >
            <item.icon className={`w-5 h-5 mr-2 ${
              activeCategory === item.category 
                ? 'text-white' 
                : 'text-gray-600 dark:text-gray-400'
            }`} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;