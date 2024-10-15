// components/Sidebar.tsx
import React, { useState } from 'react';
import { HomeIcon, ChatBubbleLeftEllipsisIcon, PlusIcon, CreditCardIcon, UserGroupIcon, CubeIcon, ChevronUpIcon, ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

type Category = 'soilMoisture' | 'soilTemperature' | 'brightness' | 'airTemperature' | 'airMoisture';
type RecommendationCategory = `${Category}Recommendations`;
type AllCategories = Category | RecommendationCategory;

interface SidebarProps {
  activeCategory: AllCategories;
  setActiveCategory: (category: AllCategories) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory }) => {
  const { theme } = useTheme();
  const [isTasksOpen, setIsTasksOpen] = useState(true);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(true);
  const [showTasks, setShowTasks] = useState(true);

  const taskItems = [
    { name: 'Umidade do Solo', category: 'soilMoisture' },
    { name: 'Temperatura do Solo', category: 'soilTemperature' },
    { name: 'Luminosidade', category: 'brightness' },
    { name: 'Temperatura do Ar', category: 'airTemperature' },
    { name: 'Umidade do Ar', category: 'airMoisture' },
  ];

  const recommendationItems = [
    { name: 'Umidade do Solo', category: 'soilMoistureRecommendations' },
    { name: 'Temperatura do Solo', category: 'soilTemperatureRecommendations' },
    { name: 'Luminosidade', category: 'brightnessRecommendations' },
    { name: 'Temperatura do Ar', category: 'airTemperatureRecommendations' },
    { name: 'Umidade do Ar', category: 'airMoistureRecommendations' },
  ];

  const renderMenuItem = (item: any, isSubItem: boolean = false) => (
    <li 
      key={item.name}
      className={`cursor-pointer p-2 mb-2 rounded flex items-center justify-between ${
        activeCategory === item.category
          ? 'bg-white text-black' 
          : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
      onClick={() => {
        if (item.category) {
          setActiveCategory(item.category as any);
          setShowTasks(item.category.indexOf('Recommendations') === -1);
        }
      }}
    >
      <span>{item.name}</span>
    </li>
  );

  const renderExpandableMenu = (title: string, items: any[], isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
    <>
      <li 
        className="cursor-pointer p-2 mb-2 rounded flex items-center justify-between bg-black text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <SparklesIcon className="w-5 h-5 mr-2" />
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
      </li>
      {isOpen && (
        <ul className="ml-4">
          {items.map(item => renderMenuItem(item, true))}
        </ul>
      )}
    </>
  );

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 h-screen p-4 -mt-20 rounded-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Categorias</h2>
      <ul>
        {renderExpandableMenu('Tarefas', taskItems, isTasksOpen, setIsTasksOpen)}
        {renderExpandableMenu('Recomendações', recommendationItems, isRecommendationsOpen, setIsRecommendationsOpen)}
      </ul>
    </div>
  );
};

export default Sidebar;