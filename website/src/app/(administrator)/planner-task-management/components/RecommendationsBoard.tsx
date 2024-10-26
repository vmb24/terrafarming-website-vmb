// components/RecommendationsBoard.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import axios from 'axios';

interface PlanRecommendation {
  plan: {
    tasks_by_week: any;
    generatedAt: string;
    planId: string;
    moisture: number;
    crops: string[];
    recommendations: string;
    status: string;
  };
  planId: string;
  moisture: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

interface RecommendationsBoardProps {
  category: 'soilMoisture' | 'soilTemperature' | 'brightness' | 'airTemperature' | 'airMoisture';
}

// Move as URLs para fora do componente
const recommendationUrls = {
  soilMoisture: 'https://i5rquoloa9.execute-api.us-east-1.amazonaws.com/prod/recommendations',
  soilTemperature: 'https://7yz5zq6a2b.execute-api.us-east-1.amazonaws.com/prod/recommendations',
  brightness: 'https://97j8ed04m3.execute-api.us-east-1.amazonaws.com/prod/recommendations',
  airMoisture: 'https://pbdjc21gnc.execute-api.us-east-1.amazonaws.com/prod/recommendations',
  airTemperature: 'https://kpb4zkkjhf.execute-api.us-east-1.amazonaws.com/prod/recommendations',
};

// Move a função de parsing para fora do componente
const parseWeeks = (recommendationsText: string) => {
  const weeks: { [key: string]: Array<{ date: string; time: string; task: string }> } = {};
  
  const weekSections = recommendationsText.split('\n\n');
  weekSections.forEach(section => {
    if (section.startsWith('Semana')) {
      const [weekHeader, ...tasks] = section.split('\n');
      const weekNumber = weekHeader.split(' ')[1];
      
      weeks[weekNumber] = tasks
        .filter(task => task.startsWith('-'))
        .map(task => {
          const [dateTime, ...taskDescription] = task.substring(2).split(' - ');
          const [weekday, date, time] = dateTime.split(', ')[1].split(' às ');
          return {
            date,
            time,
            task: taskDescription.join(' - ').trim()
          };
        });
    }
  });
  
  return weeks;
};

const RecommendationsBoard: React.FC<RecommendationsBoardProps> = ({ category }) => {
  const { theme } = useTheme();
  const [recommendations, setRecommendations] = useState<PlanRecommendation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCategoryTitle = useCallback(() => {
    switch (category) {
      case 'soilMoisture':
        return 'Recomendações de Umidade do Solo';
      case 'soilTemperature':
        return 'Recomendações de Temperatura do Solo';
      case 'brightness':
        return 'Recomendações de Luminosidade';
      case 'airTemperature':
        return 'Recomendações de Temperatura do Ar';
      case 'airMoisture':
        return 'Recomendações de Umidade do Ar';
      default:
        return 'Recomendações';
    }
  }, [category]);

  useEffect(() => {
    let isMounted = true;

    const fetchRecommendations = async () => {
      try {
        if (!isMounted) return;
        
        setLoading(true);
        setError(null);
        
        const url = recommendationUrls[category];
        const response = await axios.get(url);
        
        if (isMounted) {
          if (response.data && Array.isArray(response.data)) {
            setRecommendations(response.data);
          } else {
            throw new Error('Formato de dados inválido');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Erro ao carregar recomendações');
          console.error('Erro ao buscar recomendações:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecommendations();

    return () => {
      isMounted = false;
    };
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400">{error}</div>;
  }

  if (!recommendations || recommendations.length === 0) {
    return <div className="text-gray-800 dark:text-gray-200 text-xl">Não foram encontradas recomendações.</div>;
  }

  const recommendationText = recommendations[0]?.plan?.recommendations;
  const weeks = recommendationText ? parseWeeks(recommendationText) : {};

  return (
    <div>
      <h2 className="text-xl text-gray-800 dark:text-white font-bold mb-4 -mt-24">
        {getCategoryTitle()}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(weeks).map(([weekNumber, tasks]) => (
          <div key={weekNumber} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 dark:text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Semana {weekNumber}</h3>
            </div>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-2 last:border-0">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">{task.date} às {task.time}</span>
                    <br />
                    {task.task}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center text-xs mt-6 text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(recommendations[0].createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      {Object.keys(weeks).length === 0 && (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">Não há recomendações para esta métrica.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsBoard;