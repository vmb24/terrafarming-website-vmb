import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CloudIcon, BeakerIcon, WrenchIcon, SunIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'upcoming' | 'in_progress';
  icon: React.ElementType;
  recommendations: string[];
}

type TabType = 'all' | 'soil_moisture' | 'soil_temperature' | 'brightness' | 'air_temperature' | 'air_humidity';

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

interface StatusBarProps {
  tasks: Task[];
}


const PlanMap: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://lp8vj9qov4.execute-api.us-east-1.amazonaws.com/prod/task-plan');
        const processedTasks = processTasks(response.data);
        setTasks(processedTasks);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processTasks = (data: any[]): Task[] => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return [];
    }
    const icons = [CloudIcon, BeakerIcon, WrenchIcon, SunIcon, ArrowPathIcon];
    return data.reduce((acc: Task[], item, index) => {
      const content = item.plan.recommendations;
      const activities = extractActivities(content);
      const newTasks = activities.map((activity, activityIndex) => ({
        id: `task-${index}-${activityIndex}`,
        title: 'Moisture Management',
        description: activity,
        status: index === 0 && activityIndex === 0 ? 'in_progress' : 'upcoming',
        icon: icons[index % icons.length],
        recommendations: [`Recomendação padrão para ${activity}`],
      }));
      return [...acc, ...newTasks];
    }, []);
  };

  const extractActivities = (content: string | string[]): string[] => {
    if (Array.isArray(content)) {
      return content.filter(activity => activity !== '');
    }
    return content.split('\n-').slice(1).map(activity => activity.trim()).filter(activity => activity !== '');
  };

  if (isLoading) return <div className="text-center p-4">Carregando tarefas...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  const TabButton: React.FC<TabButtonProps> = ({ children, active = false, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 
        ${active 
          ? 'bg-blue-500 text-white' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Plano de tarefas Agrícola</h1>
      <StatusBar tasks={tasks} />
      <div className="relative mt-8 bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center">
          <StartNode />
          <VerticalArrow />
          <WebhookNode />
          <VerticalArrow />
          <CheckSubmitNode />
          <VerticalArrow />
          <div className="flex flex-col items-center space-y-4">
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <TaskNode task={task} />
                {index < tasks.length - 1 && <VerticalArrow />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBar: React.FC<{ tasks: Task[] }> = ({ tasks }) => (
  <div className="flex justify-end space-x-4 mb-6">
    <StatusBox label="Total" value={tasks.length} color="bg-blue-100" />
    <StatusBox label="Completed" value={tasks.filter(t => t.status === 'completed').length} color="bg-green-100" />
    <StatusBox label="Upcoming" value={tasks.filter(t => t.status === 'upcoming').length} color="bg-yellow-100" />
    <StatusBox label="In Progress" value={tasks.filter(t => t.status === 'in_progress').length} color="bg-purple-100" />
  </div>
);

const StatusBox: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className={`${color} rounded-lg p-2 text-center`}>
    <span className="block text-2xl font-bold">{value}</span>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

const StartNode: React.FC = () => (
  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  </div>
);

const WebhookNode: React.FC = () => (
  <div className="bg-white border border-gray-300 rounded-lg p-4 flex items-center mb-2">
    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    <div>
      <h3 className="font-semibold">Webhook</h3>
      <p className="text-sm text-gray-600">Receive URLs</p>
    </div>
  </div>
);

const CheckSubmitNode: React.FC = () => (
  <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-2">
    <h3 className="font-semibold">Check submit</h3>
  </div>
);

const TaskNode: React.FC<{ task: Task }> = ({ task }) => {
  const IconComponent = task.icon;
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 w-full max-w-md">
      <div className="flex items-center mb-2">
        <IconComponent className="w-5 h-5 mr-2 text-blue-500" />
        <h3 className="font-semibold">{task.title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
      <div className="bg-blue-100 rounded p-2 mt-2">
        <h4 className="font-semibold text-xs mb-1">Recomendação:</h4>
        <p className="text-xs">{task.recommendations[0]}</p>
      </div>
      <div className={`mt-2 text-xs font-semibold ${getStatusColor(task.status)}`}>
        {getStatusText(task.status)}
      </div>
    </div>
  );
};

const VerticalArrow: React.FC = () => (
  <svg className="w-6 h-6 text-gray-400 my-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const ArrowIcon: React.FC = () => (
  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const getStatusColor = (status: Task['status']): string => {
  switch (status) {
    case 'completed': return 'text-green-500';
    case 'in_progress': return 'text-blue-500';
    case 'upcoming': return 'text-yellow-500';
    default: return 'text-gray-500';
  }
};

const getStatusText = (status: Task['status']): string => {
  switch (status) {
    case 'completed': return 'Concluído';
    case 'in_progress': return 'Em andamento';
    case 'upcoming': return 'Próxima tarefa';
    default: return 'Status desconhecido';
  }
};

export default PlanMap;