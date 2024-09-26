// pages/planner.tsx
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import { MoisturePlan, TemperaturePlan, MoistureRecommendations, TemperatureRecommendations } from './types/soil';

const Planner: React.FC = () => {
  const [moisturePlan, setMoisturePlan] = useState<MoisturePlan | null>(null);
  const [temperaturePlan, setTemperaturePlan] = useState<TemperaturePlan | null>(null);
  const [moistureRecommendations, setMoistureRecommendations] = useState<MoistureRecommendations | null>(null);
  const [temperatureRecommendations, setTemperatureRecommendations] = useState<TemperatureRecommendations | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moisturePlanResponse = await axios.get<MoisturePlan[]>('https://lp8vj9qov4.execute-api.us-east-1.amazonaws.com/prod/task-plan');
        setMoisturePlan(moisturePlanResponse.data[0] || null);

        const temperaturePlanResponse = await axios.get<TemperaturePlan[]>('https://3qcils9mbk.execute-api.us-east-1.amazonaws.com/prod/task-plan');
        setTemperaturePlan(temperaturePlanResponse.data[0] || null);

        const moistureRecommendationsResponse = await axios.get<{ 'agriculture/soil/moisture': string }>('https://81dkc5z9yd.execute-api.us-east-1.amazonaws.com/prod/recommendations');
        setMoistureRecommendations(JSON.parse(moistureRecommendationsResponse.data['agriculture/soil/moisture'] || 'null'));

        const temperatureRecommendationsResponse = await axios.get<{ type: string; completion: string }>('https://uphc1w9gfc.execute-api.us-east-1.amazonaws.com/prod/recommendations');
        setTemperatureRecommendations(JSON.parse(temperatureRecommendationsResponse.data.completion || 'null'));
      } catch (error) {
        console.error('Error fetching data:', error);
        setMoisturePlan(null);
        setTemperaturePlan(null);
        setMoistureRecommendations(null);
        setTemperatureRecommendations(null);
      }
    };

    fetchData();
  }, []);

  const parseTasks = (plan: string | null): { [key: string]: string[] } => {
    if (!plan) return {};
    const weeks: { [key: string]: string[] } = {};
    const lines = plan.split('\n');
    let currentWeek = '';

    lines.forEach(line => {
      if (line.startsWith('Semana')) {
        currentWeek = line.trim();
        weeks[currentWeek] = [];
      } else if (currentWeek && line.trim().startsWith('-')) {
        weeks[currentWeek].push(line.trim().substring(2));
      }
    });

    return weeks;
  };

  return (
    <div>
      <div className="px-4 mt-[-80px]">
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4 text-white">Tarefas - Umidade e Temperatura do Solo</h2>
          <TaskList
            title="Moisture Recommendations"
            tasks={moisturePlan?.plan.recommendations.split('\n\n').filter(t => t.trim() !== '') || null}
          />

          <h2 className="text-2xl font-bold mb-4 mt-8">Temperature Tasks</h2>
          {temperaturePlan ? (
            Object.entries(parseTasks(temperaturePlan.plan)).map(([week, tasks]) => (
              <TaskList key={week} title={week} tasks={tasks} />
            ))
          ) : (
            <TaskList title="Temperature Tasks" tasks={null} />
          )}

          <h2 className="text-2xl font-bold mb-4 mt-8">Recommendations</h2>
          <TaskList
            title="Moisture Recommendations"
            tasks={moistureRecommendations ? Object.entries(moistureRecommendations).map(([key, value]) => `${key}: ${value}`) : null}
          />
          <TaskList
            title="Temperature Recommendations"
            tasks={temperatureRecommendations ? Object.entries(temperatureRecommendations).map(([key, value]) => `${key}: ${value}`) : null}
          />
        </div>
      </div>
    </div>
  );
};

export default Planner;