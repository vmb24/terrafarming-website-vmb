'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: 'moisture' | 'temperature' | 'brightness' | 'air-moisture' | 'air-temperature';
  createdAt: string;
  activity: string;
  priority: 'Alto' | 'Médio' | 'Baixo' | 'Planejado';
}

const priorityColors = {
  Alto: 'bg-red-500 dark:bg-red-400',
  Médio: 'bg-yellow-500 dark:bg-yellow-400',
  Baixo: 'bg-green-500 dark:bg-green-400',
  Planejado: 'bg-blue-500 dark:bg-blue-400',
};

const WeeklyTasksOverview: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrls = [
          'https://2rxtztbyl5.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          'https://n3wry4fh5h.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          'https://vz7vgmwvne.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          'https://jf5uy84p79.execute-api.us-east-1.amazonaws.com/prod/task-plan',
          'https://ab394xdjtk.execute-api.us-east-1.amazonaws.com/prod/task-plan',
        ];

        const responses = await Promise.allSettled(apiUrls.map(url => axios.get(url)));

        const allTasks: Task[] = responses.flatMap((result, index) => {
          if (result.status === 'fulfilled') {
            const category = ['moisture', 'temperature', 'brightness', 'air-moisture', 'air-temperature'][index];
            return result.value.data.map((item: any) => {
              const plan = item.plan;
              const activity = extractFirstActivity(plan.recommendations);
              return {
                id: item.planId || Math.random().toString(36).substr(2, 9),
                title: `${category.charAt(0).toUpperCase() + category.slice(1)} Task`,
                description: `Monitorar ${category}: ${category === 'moisture' ? item.moisture : item.temperature} ${category === 'moisture' ? '%' : '°C'}`,
                progress: Math.floor(Math.random() * 100),
                category: category as Task['category'],
                createdAt: item.createdAt,
                activity: activity,
                priority: ['Alto', 'Médio', 'Baixo', 'Planejado'][Math.floor(Math.random() * 4)] as Task['priority'],
              };
            });
          } else {
            console.error(`Erro ao buscar dados do endpoint ${apiUrls[index]}:`, result.reason);
            return [];
          }
        });

        const firstWeekTasks = filterFirstWeekTasks(allTasks).slice(0, 4);
        setTasks(firstWeekTasks);
      } catch (error) {
        console.error('Erro ao processar os dados:', error);
        setError('Falha ao carregar as tarefas. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isMounted]);

  const extractFirstActivity = (content: string): string => {
    const match = content.match(/\n-(.*?)(?=\n-|$)/);
    return match ? match[1].trim() : '';
  };  

  const filterFirstWeekTasks = (allTasks: Task[]): Task[] => {
    if (allTasks.length === 0) return [];
    
    const sortedTasks = allTasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const firstTaskDate = new Date(sortedTasks[0].createdAt);
    const oneWeekLater = new Date(firstTaskDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return sortedTasks.filter(task => new Date(task.createdAt) < oneWeekLater);
  };

  if (isLoading) {
    return <div className="text-center p-4">Carregando tarefas...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mt-12">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center text-gray-800 dark:text-gray-200">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Tarefas da Primeira Semana
        </h2>
        <button className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          Veja Tudo
          <ChevronRightIcon className="w-3 h-3 ml-1" />
        </button>
      </div>
      {tasks.length === 0 ? (
        <div className="text-center p-4 text-gray-500 dark:text-gray-400">
          Nenhuma tarefa encontrada para esta semana.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow overflow-hidden flex">
              <div className={`w-1 ${priorityColors[task.priority]}`}></div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-sm mb-1 text-gray-800 dark:text-gray-200">{task.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{task.description}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]} text-white mr-2`}>
                      {task.priority}
                    </span>
                    <button className="text-gray-400 dark:text-gray-500">
                      <EllipsisHorizontalIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{task.activity}</p>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex -space-x-1">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full overflow-hidden border-2 border-white dark:border-gray-800">
                          <Image
                            src={i === 0 ? "/images/task-agriculture.png" : "/images/generic-fruits.png"}
                            alt={i === 0 ? "Task image" : "Planting image"}
                            width={24}
                            height={24}
                            objectFit="cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">{task.progress}%</div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                    <div
                      className="bg-green-500 dark:bg-green-400 h-1.5 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyTasksOverview;