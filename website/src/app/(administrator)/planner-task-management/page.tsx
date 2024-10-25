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

interface Recommendations {
  [key: string]: string;
}

const PlannerTaskManagement: React.FC = () => {
  const [plans, setPlans] = useState<Record<Category, Plan[]>>({
    soilMoisture: [],
    soilTemperature: [],
    brightness: [],
    airTemperature: [],
    airMoisture: []
  });
  const [recommendations, setRecommendations] = useState<Record<Category, Recommendations | null>>({
    soilMoisture: null,
    soilTemperature: null,
    brightness: null,
    airTemperature: null,
    airMoisture: null
  });
  const [activeCategory, setActiveCategory] = useState<AllCategories>('soilMoisture');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch plans for all categories
        const planCategories: Category[] = ['soilMoisture', 'soilTemperature', 'brightness', 'airTemperature', 'airMoisture'];
        const planUrls: Record<Category, string> = {
          soilMoisture: 'https://lp8vj9qov4.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          soilTemperature: 'https://3qcils9mbk.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          brightness: '',
          airTemperature: '',
          airMoisture: ''
        };

        const planPromises = planCategories.map(category => 
          axios.get(planUrls[category]).then(response => ({ category, data: response.data }))
        );

        const planResults = await Promise.all(planPromises);
        
        const newPlans: Record<Category, Plan[]> = { ...plans };
        planResults.forEach(({ category, data }) => {
          if (Array.isArray(data)) {
            newPlans[category] = data.map(plan => ({
              ...plan,
              status: plan.status || 'todo'
            }));
          } else {
            console.error(`Invalid ${category} data:`, data);
            newPlans[category] = [];
          }
        });
        setPlans(newPlans);

        // Fetch recommendations for all categories
        const recommendationCategories: RecommendationCategory[] = [
          'soilMoistureRecommendations', 'soilTemperatureRecommendations', 
          'brightnessRecommendations', 'airTemperatureRecommendations', 'airMoistureRecommendations'
        ];
        const recommendationUrls: Record<RecommendationCategory, string> = {
          soilMoistureRecommendations: 'https://i5rquoloa9.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          soilTemperatureRecommendations: 'https://7yz5zq6a2b.execute-api.us-east-1.amazonaws.com/prod/recommendations',
          brightnessRecommendations: '',
          airTemperatureRecommendations: '',
          airMoistureRecommendations: ''
        };

        const recommendationPromises = recommendationCategories.map(category => 
          axios.get(recommendationUrls[category]).then(response => ({ category, data: response.data }))
        );

        const recommendationResults = await Promise.all(recommendationPromises);
        
        const newRecommendations: Record<Category, Recommendations | null> = { ...recommendations };
        recommendationResults.forEach(({ category, data }) => {
          try {
            let parsedData: Recommendations;
            if (category === 'soilMoistureRecommendations' && data['agriculture/soil/moisture']) {
              parsedData = JSON.parse(data['agriculture/soil/moisture']);
            } else if (category === 'soilTemperatureRecommendations' && data.completion) {
              parsedData = JSON.parse(data.completion);
            } else {
              parsedData = data;
            }
            newRecommendations[category.replace('Recommendations', '') as Category] = parsedData;
          } catch (error) {
            console.error(`Error parsing ${category} recommendations:`, error);
            newRecommendations[category.replace('Recommendations', '') as Category] = null;
          }
        });
        setRecommendations(newRecommendations);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
              recommendations={recommendations[getBaseCategory(activeCategory)]}
              category={getBaseCategory(activeCategory)}
            />
          ) : (
            <TaskBoard
              plans={plans[activeCategory] as Plan[]} // Assegure-se que isso está correto
              category={activeCategory}
            />
          )}
        </div>
      </div>
      <IAgrixiAssistant />
    </div>
  );
};

export default PlannerTaskManagement;