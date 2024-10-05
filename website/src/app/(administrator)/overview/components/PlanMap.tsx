import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EllipsisHorizontalIcon, CheckIcon, LockClosedIcon, PlayIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'upcoming' | 'in_progress';
  icon: string;
  recommendations: string[];
  temperature?: string;
  moisture?: string;
}

type Metric = 'Umidade do Solo' | 'Temperatura do Solo' | 'Luminosidade' | 'Umidade do Ar' | 'Temperatura do Ar';

const PlanMap: React.FC = () => {
  const [tasks, setTasks] = useState<{ [key in Metric]: Task[] }>({
    'Umidade do Solo': [],
    'Temperatura do Solo': [],
    'Luminosidade': [],
    'Umidade do Ar': [],
    'Temperatura do Ar': []
  });
  const [selectedMetric, setSelectedMetric] = useState<Metric>('Umidade do Solo');
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
        
        setTasks({
          'Umidade do Solo': moistureTasks,
          'Temperatura do Solo': temperatureTasks,
          'Luminosidade': [],
          'Umidade do Ar': [],
          'Temperatura do Ar': []
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processTasks = (data: any[], category: 'moisture' | 'temperature'): Task[] => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return [];
    }
    return data.reduce((acc: Task[], item, index) => {
      const content = category === 'moisture' ? item.plan.recommendations : item.plan;
      const activities = extractActivities(content);
      const newTasks = activities.map((activity, activityIndex) => ({
        id: `${item.planId || category}-${index}-${activityIndex}`,
        title: `${category === 'moisture' ? 'Moisture' : 'Temperature'} Management`,
        description: activity,
        status: index === 0 && activityIndex === 0 ? 'in_progress' : 'upcoming',
        icon: category === 'moisture' ? '💧' : '🌡️',
        temperature: category === 'temperature' ? extractTemperature(activity) : undefined,
        moisture: category === 'moisture' ? extractMoisture(activity) : undefined,
        recommendations: [`Recomendação padrão para ${activity}`],
      }));
      return [...acc, ...newTasks];
    }, []);
  };

  const extractTemperature = (activity: string): string | undefined => {
    const temperatureMatch = activity.match(/(\d+([.,]\d+)?)\s*°C/);
    return temperatureMatch ? temperatureMatch[0] : undefined;
  };

  const extractMoisture = (activity: string): string | undefined => {
    const moistureMatch = activity.match(/(\d+([.,]\d+)?)\s*%/);
    return moistureMatch ? moistureMatch[0] : undefined;
  };

  const extractActivities = (content: string | string[]): string[] => {
    if (Array.isArray(content)) {
      return content.filter(activity => activity !== '');
    }
    return content.split('\n-').slice(1).map(activity => activity.trim()).filter(activity => activity !== '');
  };

  const renderTaskMap = (tasks: Task[], title: string) => {
    if (tasks.length === 0) {
      return <p className="text-center p-4">Tarefas e recomendações não encontradas para gerar um plano agrícola.</p>;
    }

    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {tasks.map((task, index) => (
            <div key={task.id} className="relative">
              <TaskCard task={task} />
              {index % 3 < 2 && index < tasks.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-500">
                  <ArrowRightIcon className="w-4 h-4 text-green-500 absolute -right-1 -top-1.5" />
                </div>
              )}
              {index < tasks.length - 3 && (
                <div className="hidden lg:block absolute -bottom-4 left-1/2 w-0.5 h-8 bg-green-500">
                  <ArrowRightIcon className="w-4 h-4 text-green-500 absolute -bottom-1 -left-1.5 transform rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center p-4">Carregando tarefas...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  const allTasks = Object.values(tasks).flat();
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(task => task.status === 'completed').length;
  const upcomingTasks = allTasks.filter(task => task.status === 'upcoming').length;
  const inProgressTasks = allTasks.filter(task => task.status === 'in_progress').length;

  return (
    <div className="bg-white shadow-md p-4 min-h-screen rounded-md mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-xl font-semibold mb-4 md:mb-0">Plano de tarefas Agrícola</h1>
        <div className="flex space-x-4">
          <div className="bg-blue-100 rounded-lg p-2">
            <span className="block text-2xl font-bold text-center">{totalTasks}</span>
            <span className="text-sm text-gray-600">Total</span>
          </div>
          <div className="bg-green-100 rounded-lg p-2">
            <span className="block text-2xl font-bold text-center">{completedTasks}</span>
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="bg-yellow-100 rounded-lg p-2">
            <span className="block text-2xl font-bold text-center">{upcomingTasks}</span>
            <span className="text-sm text-gray-600">Upcoming</span>
          </div>
          <div className="bg-purple-100 rounded-lg p-2">
            <span className="block text-2xl font-bold text-center">{inProgressTasks}</span>
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <div className="flex space-x-2 overflow-x-auto">
          {Object.keys(tasks).map((metric) => (
            <button
              key={metric}
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                selectedMetric === metric
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedMetric(metric as Metric)}
            >
              {metric}
            </button>
          ))}
        </div>
      </div>
      
      {renderTaskMap(tasks[selectedMetric], `Tarefas & Recomendações de ${selectedMetric}`)}
    </div>
  );
};

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow mt-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xl">
          {task.icon}
        </div>
        <div className="ml-3 flex-grow">
          <h2 className="text-md font-semibold">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.description}</p>
          {task.temperature && (
            <p className="text-sm font-semibold text-red-500 mt-1">Temperatura: {task.temperature}</p>
          )}
          {task.moisture && (
            <p className="text-sm font-semibold text-blue-500 mt-1">Umidade: {task.moisture}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            task.status === 'completed' ? 'bg-green-100 text-green-800' :
            task.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {task.status === 'completed' ? 'Completed' :
             task.status === 'upcoming' ? 'Upcoming' :
             'In Progress'}
          </span>
          <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400" />
          {task.status === 'completed' ? (
            <CheckIcon className="w-5 h-5 text-green-500" />
          ) : task.status === 'upcoming' ? (
            <LockClosedIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <CheckIcon className="w-5 h-5 text-green-500" />
          )}
        </div>
      </div>
      {task.status === 'in_progress' && (
        <div className="mt-2 bg-purple-100 rounded-lg p-2 flex items-center">
          <PlayIcon className="w-5 h-5 text-purple-500 mr-2" />
          <span className="text-xs font-medium">Implementing task</span>
        </div>
      )}
      {task.recommendations && task.recommendations.length > 0 && (
        <div className="mt-2 bg-blue-100 rounded-lg p-2">
          <h3 className="text-sm font-semibold mb-1">Recomendação:</h3>
          <p className="text-xs">{task.recommendations[0]}</p>
        </div>
      )}
    </div>
  );
};

export default PlanMap;