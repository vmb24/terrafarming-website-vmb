// pages/PlannerTaskManagement.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/SideBar';
import TaskBoard from './components/TaskBoard';
import RecommendationsBoard from './components/RecommendationsBoard';
import { AirMoisturePlan, AirTemperaturePlan, BrightnessPlan, SoilMoisturePlan, SoilTemperaturePlan } from './types/types';
import IAgrixiAssistant from '@/components/ui/agrixi-assistant/IAgrixiAssistant';

type Category = 'soilMoisture' | 'soilTemperature' | 'brightness' | 'airTemperature' | 'airMoisture';
type RecommendationCategory = `${Category}Recommendations`;
type AllCategories = Category | RecommendationCategory;

type Plan = SoilMoisturePlan | SoilTemperaturePlan | BrightnessPlan | AirTemperaturePlan | AirMoisturePlan;

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: Category;
  createdAt: string;
  activity: string;
  priority: 'Alto' | 'Médio' | 'Baixo' | 'Planejado';
}

interface Recommendations {
  [key: string]: string;
}

const PlannerTaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recommendations, setRecommendations] = useState<Record<Category, Recommendations | null>>({
    soilMoisture: null,
    soilTemperature: null,
    brightness: null,
    airTemperature: null,
    airMoisture: null
  });
  const [activeCategory, setActiveCategory] = useState<AllCategories>('soilMoisture');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrls = {
          soilMoisture: 'https://2rxtztbyl5.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          soilTemperature: 'https://n3wry4fh5h.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          brightness: 'https://vz7vgmwvne.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          airTemperature: 'https://jf5uy84p79.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          airMoisture: 'https://ab394xdjtk.execute-api.us-east-1.amazonaws.com/prod/task-plan'
        };

        const responses = await Promise.allSettled(
          Object.entries(apiUrls).map(([category, url]) => 
            axios.get(url).then(response => ({ category, data: response.data }))
          )
        );

        const allTasks: Task[] = responses.flatMap((result) => {
          if (result.status === 'fulfilled') {
            const { category, data } = result.value;
            return data.map((item: any) => {
              const activity = extractFirstActivity(item.plan.recommendations);
              return {
                id: item.planId || Math.random().toString(36).substr(2, 9),
                title: `${formatCategoryName(category)} Task`,
                description: `Monitorar ${formatCategoryName(category)}: ${
                  category.includes('Moisture') ? item.moisture : item.temperature
                } ${category.includes('Moisture') ? '%' : '°C'}`,
                progress: Math.floor(Math.random() * 100),
                category: category as Category,
                createdAt: item.createdAt,
                activity: activity,
                priority: ['Alto', 'Médio', 'Baixo', 'Planejado'][Math.floor(Math.random() * 4)] as Task['priority'],
              };
            });
          }
          return [];
        });

        setTasks(allTasks);

        // Fetch recommendations
        const recommendationUrls = {
          soilMoisture: 'https://i5rquoloa9.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          soilTemperature: 'https://7yz5zq6a2b.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          brightness: 'https://i5rquoloa9.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          airMoisture: 'https://i5rquoloa9.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          airTemperature: 'https://7yz5zq6a2b.execute-api.us-east-1.amazonaws.com/prod/recommendations',
        };

        const recommendationResponses = await Promise.allSettled(
          Object.entries(recommendationUrls).map(([category, url]) =>
            axios.get(url).then(response => ({ category, data: response.data }))
          )
        );

        const newRecommendations: Record<Category, Recommendations | null> = { ...recommendations };
        recommendationResponses.forEach((result) => {
          if (result.status === 'fulfilled') {
            const { category, data } = result.value;
            try {
              let parsedData: Recommendations;
              if (category === 'soilMoisture' && data['agriculture/soil/moisture']) {
                parsedData = JSON.parse(data['agriculture/soil/moisture']);
              } else if (category === 'soilTemperature' && data.completion) {
                parsedData = JSON.parse(data.completion);
              } else {
                parsedData = data;
              }
              newRecommendations[category as Category] = parsedData;
            } catch (error) {
              console.error(`Error parsing ${category} recommendations:`, error);
              newRecommendations[category as Category] = null;
            }
          }
        });

        setRecommendations(newRecommendations);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Falha ao carregar as tarefas. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const extractFirstActivity = (content: string): string => {
    const match = content.match(/\n-(.*?)(?=\n-|$)/);
    return match ? match[1].trim() : '';
  };

  const formatCategoryName = (category: string): string => {
    return category
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleSetActiveCategory = (category: AllCategories) => {
    setActiveCategory(category);
  };

  const isRecommendationCategory = (category: AllCategories): category is RecommendationCategory => {
    return category.endsWith('Recommendations');
  };

  const getBaseCategory = (category: AllCategories): Category => {
    return isRecommendationCategory(category) 
      ? category.replace('Recommendations', '') as Category 
      : category as Category;
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => task.category === activeCategory);
  };

  return (
    <div className="flex-1">
      <div className="flex h-full">
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={handleSetActiveCategory}
        />
        <div className="flex-1 p-4">
          {isRecommendationCategory(activeCategory) ? (
            <RecommendationsBoard
              category={getBaseCategory(activeCategory)}
            />
          ) : (
            <TaskBoard
              tasks={getFilteredTasks()}
              category={activeCategory as Category}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </div>
      <IAgrixiAssistant />
    </div>
  );
};

export default PlannerTaskManagement;