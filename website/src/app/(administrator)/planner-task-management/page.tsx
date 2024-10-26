'use client';
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

interface WeeklyTask {
  date: string;
  recommendation?: string;
  time: string;
  task: string;
}

interface TasksByWeek {
  [key: string]: WeeklyTask[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: Category;
  createdAt: string;
  activity: string;
  priority: 'Alto' | 'Médio' | 'Baixo' | 'Planejado';
  week: string;
  date: string;
  time: string;
}

const PlannerTaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, Record<string, string>>>({});
  const [activeCategory, setActiveCategory] = useState<AllCategories>('soilMoisture');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

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

        const recommendationUrls = {
          soilMoisture: 'https://i5rquoloa9.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          soilTemperature: 'https://7yz5zq6a2b.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          brightness: 'https://97j8ed04m3.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          airTemperature: 'https://kpb4zkkjhf.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          airMoisture: 'https://pbdjc21gnc.execute-api.us-east-1.amazonaws.com/prod/recommendations',
        };

        const taskResponses = await Promise.allSettled(
          Object.entries(apiUrls).map(([category, url]) => 
            axios.get(url).then(response => ({ category, data: response.data }))
          )
        );

        const recommendationResponses = await Promise.allSettled(
          Object.entries(recommendationUrls).map(([category, url]) => 
            axios.get(url).then(response => ({ category, data: response.data }))
          )
        );

        const allTasks: Task[] = [];
        const newRecommendations: Record<string, Record<string, string>> = {};

        taskResponses.forEach((result) => {
          if (result.status === 'fulfilled') {
            const { category, data } = result.value;
            console.log(`Tasks for ${category}:`, data);
            data.forEach((item: any) => {
              const tasksByWeek: TasksByWeek = item.plan.tasks_by_week;
              Object.entries(tasksByWeek).forEach(([week, weekTasks]) => {
                weekTasks.forEach((weekTask: WeeklyTask) => {
                  allTasks.push({
                    id: `${item.planId}-${weekTask.date}-${weekTask.time}`,
                    title: `${formatCategoryName(category)} Task`,
                    description: weekTask.task,
                    progress: Math.floor(Math.random() * 100),
                    category: category as Category,
                    createdAt: item.createdAt,
                    activity: weekTask.recommendation || weekTask.task,
                    priority: ['Alto', 'Médio', 'Baixo', 'Planejado'][Math.floor(Math.random() * 4)] as Task['priority'],
                    week,
                    date: weekTask.date,
                    time: weekTask.time
                  });
                });
              });
            });
          } else {
            console.error(`Failed to fetch tasks for ${result.reason}`);
          }
        });

        recommendationResponses.forEach((result) => {
          if (result.status === 'fulfilled') {
            const { category, data } = result.value;
            try {
              const mapping: Record<Category, string> = {
                soilMoisture: 'agriculture/soil/moisture',
                soilTemperature: 'agriculture/soil/temperature',
                brightness: 'agriculture/brightness',
                airMoisture: 'agriculture/air/moisture',
                airTemperature: 'agriculture/air/temperature',
              };

              const key = mapping[category as Category];
              const parsedData = JSON.parse(data[key]);

              console.log(`Recommendations for ${category}:`, parsedData);

              newRecommendations[category] = Object.entries(parsedData).reduce((acc, [week, details]) => {
                if (typeof details === 'object' && details !== null && 'recomendações' in details) {
                  acc[week as string] = (details as { recomendações: string }).recomendações;
                }
                return acc;
              }, {} as Record<string, string>);
            } catch (error) {
              console.error('Error processing recommendations:', error);
            }
          } else {
            console.error(`Failed to fetch recommendations for ${result.reason}`);
          }
        });

        setTasks(allTasks.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        ));
        setRecommendations(newRecommendations);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Falha ao carregar as tarefas. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isMounted]);

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
    const baseCategory = getBaseCategory(activeCategory);
    return tasks.filter(task => task.category === baseCategory);
  };

  console.log('Active Category:', activeCategory);
  console.log('Base Category:', getBaseCategory(activeCategory));
  console.log('Recommendations:', recommendations);
  console.log('Current Recommendations:', recommendations[getBaseCategory(activeCategory)]);

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
              recommendations={recommendations[getBaseCategory(activeCategory)]}
            />
          ) : (
            <TaskBoard
              tasks={getFilteredTasks()}
              category={getBaseCategory(activeCategory)}
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