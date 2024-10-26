'use client';

import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import { useTheme } from 'next-themes';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: 'moisture' | 'temperature' | 'brightness' | 'air-moisture' | 'air-temperature';
  createdAt: string;
  activity: string;
  priority: 'Alto' | 'Médio' | 'Baixo' | 'Planejado';
  startTime: Date;
  duration: number;
}

const TaskBoard: React.FC = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
              const taskDate = new Date(item.createdAt);
              return {
                id: item.planId || Math.random().toString(36).substr(2, 9),
                title: `${category.charAt(0).toUpperCase() + category.slice(1)} Task`,
                description: `Monitorar ${category}: ${category === 'moisture' ? item.moisture : item.temperature} ${category === 'moisture' ? '%' : '°C'}`,
                progress: Math.floor(Math.random() * 100),
                category: category as Task['category'],
                createdAt: item.createdAt,
                activity: activity,
                priority: ['Alto', 'Médio', 'Baixo', 'Planejado'][Math.floor(Math.random() * 4)] as Task['priority'],
                startTime: new Date(taskDate.setHours(8 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60))),
                duration: 0.5 + Math.random() * 2,
              };
            });
          } else {
            console.error(`Erro ao buscar dados do endpoint ${apiUrls[index]}:`, result.reason);
            return [];
          }
        });

        const weekTasks = filterWeekTasks(allTasks, selectedWeek);
        setTasks(weekTasks);
      } catch (error) {
        console.error('Erro ao processar os dados:', error);
        setError('Falha ao carregar as tarefas. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isMounted, selectedWeek]);

  const extractFirstActivity = (content: string): string => {
    const match = content.match(/\n-(.*?)(?=\n-|$)/);
    return match ? match[1].trim() : '';
  };

  const filterWeekTasks = (allTasks: Task[], weekNumber: number): Task[] => {
    if (allTasks.length === 0) return [];
    
    const sortedTasks = allTasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const firstTaskDate = new Date(sortedTasks[0].createdAt);
    const weekStart = new Date(firstTaskDate.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return sortedTasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      return taskDate >= weekStart && taskDate < weekEnd;
    });
  };

  const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  const getDaysInWeek = (weekNumber: number) => {
    const today = new Date();
    const startOfCurrentWeek = getStartOfWeek(today);
    const startOfSelectedWeek = new Date(startOfCurrentWeek);
    startOfSelectedWeek.setDate(startOfCurrentWeek.getDate() + (weekNumber - 1) * 7);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfSelectedWeek);
      day.setDate(startOfSelectedWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8);
  const weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const daysInWeek = getDaysInWeek(selectedWeek);

  const getTaskPosition = (startTime: Date) => {
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const totalMinutes = (startHour - 8) * 60 + startMinute;
    return (totalMinutes / (16 * 60)) * 100;
  };

  const getTaskWidth = (duration: number, startTime: Date) => {
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);
    const startPosition = getTaskPosition(startTime);
    const endPosition = getTaskPosition(endTime);
    return Math.min(endPosition - startPosition, 100 - startPosition);
  };

  const filteredTasks = tasks.filter(task => 
    new Date(task.createdAt).toDateString() === selectedDate.toDateString()
  );

  if (isLoading) {
    return <div className="text-center p-4">Carregando tarefas...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-md -mt-24">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold mr-2">
            {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </h2>
          <button className="text-green-500 dark:text-green-400">▼</button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Você tem no total {filteredTasks.length} hoje
        </p>
      </div>

      <div className='flex flex-row justify-between mt-4'>
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {daysInWeek.map((day, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg ${
                day.toDateString() === selectedDate.toDateString() 
                  ? 'bg-green-500 dark:bg-green-600' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              onClick={() => setSelectedDate(day)}
            >
              <div className={`text-sm ${
                day.toDateString() === selectedDate.toDateString() 
                  ? 'text-white' 
                  : 'text-gray-800 dark:text-gray-200'
              }`}>
                {weekdays[day.getDay()]}
              </div>
              <div className={`font-bold ${
                day.toDateString() === selectedDate.toDateString() 
                  ? 'text-white' 
                  : 'text-gray-800 dark:text-gray-200'
              }`}>
                {day.getDate()}
              </div>
            </button>
          ))}
        </div>

        <div className="flex space-x-2 h-12 mt-4">
          {[1, 2, 3, 4].map((week) => (
            <button
              key={week}
              className={`px-4 py-2 rounded-lg ${
                selectedWeek === week 
                  ? 'bg-green-500 dark:bg-green-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setSelectedWeek(week)}
            >
              Semana {week}
            </button>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2 mt-6">Timeline</h3>
      <div className="flex-grow overflow-y-auto">
        <div className="relative" style={{ height: '600px' }}>
          <div className="flex border-b border-gray-300 dark:border-gray-600 mb-2">
            {timeSlots.map((hour) => (
              <div key={hour} className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">
                {hour}:00
              </div>
            ))}
          </div>
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className={`absolute rounded-lg border border-gray-400 dark:border-gray-500 bg-opacity-50 ${
                theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
              }`}
              style={{
                left: `${getTaskPosition(task.startTime)}%`,
                width: `${getTaskWidth(task.duration, task.startTime)}%`,
                top: `${(index + 1) * 50}px`,
              }}
            >
              <div className="p-2 text-sm text-white">
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-xs">{task.activity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;