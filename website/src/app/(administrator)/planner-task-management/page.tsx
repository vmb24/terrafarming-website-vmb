// pages/PlannerTaskManagement.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/SideBar';
import TaskBoard from './components/TaskBoard';
import RecommendationsBoard from './components/RecommendationsBoard';
import { MoisturePlan, TemperaturePlan, MoistureRecommendations, TemperatureRecommendations } from './types/soil';

const sampleMoisturePlans: MoisturePlan[] = [
  {
    planId: '1',
    moisture: 30,
    status: 'Crítico',
    createdAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    plan: {
      createdAt: Date.now(),
      planId: '1',
      moisture: 30,
      recommendations: 'Irrigar imediatamente',
      status: 'Crítico',
      timestamp: Date.now()
    }
  },
  // Adicione mais exemplos conforme necessário
];

const sampleTemperaturePlans: TemperaturePlan[] = [
  {
    planId: '1',
    temperature: 25,
    status: 'Normal',
    createdAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    plan: 'Manter monitoramento'
  },
  // Adicione mais exemplos conforme necessário
];

const processMoisturePlans = (apiData: any[]): MoisturePlan[] => {
  return apiData.map(item => ({
    planId: item.planId,
    moisture: item.moisture,
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    plan: {
      createdAt: item.plan.createdAt,
      planId: item.plan.planId,
      moisture: item.plan.moisture,
      recommendations: item.plan.recommendations,
      status: item.plan.status,
      timestamp: item.plan.timestamp
    }
  }));
};

const processTemperaturePlans = (apiData: any[]): TemperaturePlan[] => {
  return apiData.map(item => ({
    planId: item.planId,
    temperature: item.temperature,
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    plan: item.plan
  }));
};

const PlannerTaskManagement: React.FC = () => {
  const [moisturePlans, setMoisturePlans] = useState<MoisturePlan[]>(sampleMoisturePlans);
  const [temperaturePlans, setTemperaturePlans] = useState<TemperaturePlan[]>(sampleTemperaturePlans);
  const [moistureRecommendations, setMoistureRecommendations] = useState<MoistureRecommendations | null>(null);
  const [temperatureRecommendations, setTemperatureRecommendations] = useState<TemperatureRecommendations | null>(null);
  const [activeCategory, setActiveCategory] = useState<'moisture' | 'temperature' | 'moistureRecommendations' | 'temperatureRecommendations'>('moisture');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Moisture Plans
        const moistureResponse = await axios.get('https://lp8vj9qov4.execute-api.us-east-1.amazonaws.com/prod/task-plan');
        if (moistureResponse.data && Array.isArray(moistureResponse.data)) {
          setMoisturePlans(processMoisturePlans(moistureResponse.data));
        } else {
          console.error('Invalid moisture data:', moistureResponse.data);
          setMoisturePlans(sampleMoisturePlans);
        }
  
        // Temperature Plans
        const temperatureResponse = await axios.get('https://3qcils9mbk.execute-api.us-east-1.amazonaws.com/prod/task-plan');
        if (temperatureResponse.data && Array.isArray(temperatureResponse.data)) {
          setTemperaturePlans(processTemperaturePlans(temperatureResponse.data));
        } else {
          console.error('Invalid temperature data:', temperatureResponse.data);
          setTemperaturePlans(sampleTemperaturePlans);
        }
  
        // Moisture Recommendations
        const moistureRecommendationsResponse = await axios.get('https://81dkc5z9yd.execute-api.us-east-1.amazonaws.com/prod/recommendations');
        if (moistureRecommendationsResponse.data) {
          try {
            let parsedData;
            if (typeof moistureRecommendationsResponse.data === 'string') {
              // Se a resposta for uma string, tenta fazer o parse
              parsedData = JSON.parse(moistureRecommendationsResponse.data);
            } else if (typeof moistureRecommendationsResponse.data === 'object') {
              // Se já for um objeto, usa diretamente
              parsedData = moistureRecommendationsResponse.data;
            }

            if (parsedData && parsedData['agriculture/soil/moisture']) {
              // Se o campo esperado existe, tenta fazer o parse dele
              const moistureData = JSON.parse(parsedData['agriculture/soil/moisture']);
              setMoistureRecommendations(moistureData);
            } else {
              throw new Error('Dados de recomendação de umidade não encontrados na resposta');
            }
          } catch (parseError) {
            console.error('Erro ao analisar as recomendações de umidade:', parseError);
            console.log('Dados brutos de recomendações de umidade:', moistureRecommendationsResponse.data);
            setMoistureRecommendations(null);
          }
        } else {
          console.error('Dados de recomendações de umidade inválidos:', moistureRecommendationsResponse);
          setMoistureRecommendations(null);
        }
  
        // Temperature Recommendations
        const temperatureRecommendationsResponse = await axios.get('https://uphc1w9gfc.execute-api.us-east-1.amazonaws.com/prod/recommendations');
        if (temperatureRecommendationsResponse.data && temperatureRecommendationsResponse.data.completion) {
          try {
            const parsedTemperatureRecommendations = JSON.parse(temperatureRecommendationsResponse.data.completion);
            setTemperatureRecommendations(parsedTemperatureRecommendations);
          } catch (parseError) {
            console.error('Error parsing temperature recommendations:', parseError);
            setTemperatureRecommendations(null);
          }
        } else {
          console.error('Invalid temperature recommendations data:', temperatureRecommendationsResponse.data);
          setTemperatureRecommendations(null);
        }
  
      } catch (error) {
        console.error('Error fetching data:', error);
        setMoisturePlans(sampleMoisturePlans);
        setTemperaturePlans(sampleTemperaturePlans);
        setMoistureRecommendations(null);
        setTemperatureRecommendations(null);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden -mt-20">
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-4 overflow-y-auto">
          {(activeCategory === 'moisture' || activeCategory === 'temperature') && (
            <TaskBoard
              plans={activeCategory === 'moisture' ? moisturePlans : temperaturePlans}
              category={activeCategory}
            />
          )}
          {(activeCategory === 'moistureRecommendations' || activeCategory === 'temperatureRecommendations') && (
            <RecommendationsBoard
              recommendations={activeCategory === 'moistureRecommendations' ? moistureRecommendations : temperatureRecommendations}
              category={activeCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlannerTaskManagement;