import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: 'moisture' | 'temperature';
  createdAt: string;
  activity: string;
  priority: 'Alto' | 'Médio' | 'Baixo' | 'Planejado';
}

const priorityColors = {
  Alto: 'bg-red-500',
  Médio: 'bg-yellow-500',
  Baixo: 'bg-green-500',
  Planejado: 'bg-blue-500',
};

const WeeklyTasksOverview: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const moistureResponse = await axios.get('https://lp8vj9qov4.execute-api.us-east-1.amazonaws.com/prod/task-plan');
        const temperatureResponse = await axios.get('https://3qcils9mbk.execute-api.us-east-1.amazonaws.com/prod/task-plan');
        
        const moistureTasks = processTasks(moistureResponse.data, 'moisture');
        const temperatureTasks = processTasks(temperatureResponse.data, 'temperature');
        
        const allTasks = [...moistureTasks, ...temperatureTasks];
        const firstWeekTasks = filterFirstWeekTasks(allTasks);
        setTasks(firstWeekTasks);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const extractFirstActivity = (content: string): string => {
    const match = content.match(/\n-(.*?)(?=\n-|$)/s);
    return match ? match[1].trim() : '';
  };

  const processTasks = (data: any[], category: 'moisture' | 'temperature'): Task[] => {
    return data.map((item) => {
      const content = category === 'moisture' ? item.plan.recommendations : item.plan;
      const activity = extractFirstActivity(content);
      return {
        id: item.planId || Math.random().toString(36).substr(2, 9),
        title: `${category === 'moisture' ? 'Umidade' : 'Temperatura'} Task`,
        description: category === 'moisture' 
          ? `Monitorar umidade: ${item.moisture}%`
          : `Controlar temperatura: ${item.temperature}°C`,
        progress: Math.floor(Math.random() * 100),
        category: category,
        createdAt: item.createdAt,
        activity: activity,
        priority: ['Alto', 'Médio', 'Baixo', 'Planejado'][Math.floor(Math.random() * 4)] as Task['priority'],
      };
    });
  };

  const filterFirstWeekTasks = (allTasks: Task[]): Task[] => {
    if (allTasks.length === 0) return [];
    
    const sortedTasks = allTasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const firstTaskDate = new Date(sortedTasks[0].createdAt);
    const oneWeekLater = new Date(firstTaskDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return sortedTasks.filter(task => new Date(task.createdAt) < oneWeekLater);
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Tarefas da Primeira Semana
        </h2>
        <button className="text-xs text-gray-500 flex items-center">
          Veja Tudo
          <ChevronRightIcon className="w-3 h-3 ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-50 rounded-lg shadow overflow-hidden flex">
            <div className={`w-1 ${priorityColors[task.priority]}`}></div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-sm mb-1">{task.title}</h3>
                  <p className="text-xs text-gray-600">{task.description}</p>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]} text-white mr-2`}>
                    {task.priority}
                  </span>
                  <button className="text-gray-400">
                    <EllipsisHorizontalIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-700 mb-4 line-clamp-2">{task.activity}</p>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex -space-x-1">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full overflow-hidden border-2 border-white">
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
                  <div className="text-xs font-semibold">{task.progress}%</div>
                </div>
                <div className="bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTasksOverview;