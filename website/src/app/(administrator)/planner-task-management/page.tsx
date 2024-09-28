// pages/PlannerTaskManagement.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/SideBar';
import TaskBoard from './components/TaskBoard';
import { MoisturePlan, TemperaturePlan } from './types/soil';

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
  const [activeCategory, setActiveCategory] = useState<'moisture' | 'temperature'>('moisture');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moistureResponse = await axios.get('https://lp8vj9qov4.execute-api.us-east-1.amazonaws.com/prod/task-plan');
        setMoisturePlans(processMoisturePlans(moistureResponse.data));

        const temperatureResponse = await axios.get('https://3qcils9mbk.execute-api.us-east-1.amazonaws.com/prod/task-plan');
        setTemperaturePlans(processTemperaturePlans(temperatureResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Usando dados de exemplo em caso de falha na API
        setMoisturePlans(sampleMoisturePlans);
        setTemperaturePlans(sampleTemperaturePlans);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Gerenciamento de Tarefas do Planejador</h1>
          <TaskBoard
            plans={activeCategory === 'moisture' ? moisturePlans : temperaturePlans}
            category={activeCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default PlannerTaskManagement;