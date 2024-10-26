import { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import { FaSeedling, FaThermometerHalf, FaSun, FaCloudSun, FaWater } from 'react-icons/fa';

interface Task {
  date: string;
  time: string;
  task: string;
  recommendation?: string;
}

interface WeekTasks {
  [week: string]: Task[];
}

interface Plan {
  planId: string;
  moisture?: number;
  temperature?: number;
  brightness?: number;
  airMoisture?: number;
  airTemperature?: number;
  tasks_by_week: WeekTasks;
}

interface ApiResponse {
  plan: Plan;
}

export default function MetricsComponent() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('Umidade do Solo');
  const metrics = ['Umidade do Solo', 'Temperatura do Solo', 'Luminosidade', 'Umidade do Ar', 'Temperatura do Ar'];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const responses = await Promise.all([
          axios.get<ApiResponse>('https://2rxtztbyl5.execute-api.us-east-1.amazonaws.com/prod/task-plan'),
          axios.get<ApiResponse>('https://n3wry4fh5h.execute-api.us-east-1.amazonaws.com/prod/task-plan'),

          axios.get<ApiResponse>('https://vz7vgmwvne.execute-api.us-east-1.amazonaws.com/prod/task-plan'),

          axios.get<ApiResponse>('https://jf5uy84p79.execute-api.us-east-1.amazonaws.com/prod/task-plan'),
          axios.get<ApiResponse>('https://ab394xdjtk.execute-api.us-east-1.amazonaws.com/prod/task-plan'),
        ]);
        setPlans(responses.map((response) => response.data.plan));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPlans();
  }, []);

  const renderTasks = (tasksByWeek: WeekTasks) => (
    <div className="space-y-4">
      {Object.entries(tasksByWeek).map(([week, tasks]) => (
        <div key={week}>
          <h3 className="text-lg font-semibold text-gray-700">{week}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task, idx) => (
              <div key={idx} className="bg-white shadow-md p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold">{task.date}</h4>
                <p className="text-gray-600">{task.time}</p>
                <p className="text-gray-800 font-medium">{task.task}</p>
                {task.recommendation && <p className="mt-2 text-green-700 font-light">{task.recommendation}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const getMetricPlan = (metric: string) => {
    switch (metric) {
      case 'Umidade do Solo': return plans.find((plan) => plan.tasks_by_week.recommendations !== undefined);
      case 'Temperatura do Solo': return plans.find((plan) => plan.temperature !== undefined);
      case 'Luminosidade': return plans.find((plan) => plan.brightness !== undefined);
      case 'Umidade do Ar': return plans.find((plan) => plan.airMoisture !== undefined);
      case 'Temperatura do Ar': return plans.find((plan) => plan.airTemperature !== undefined);
      default: return null;
    }
  };

  const selectedPlan = getMetricPlan(selectedMetric);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Plano de Tarefas</h1>
      <TabGroup>
        <TabList className="flex justify-center space-x-4 mb-6">
          {metrics.map((metric) => (
            <Tab key={metric} onClick={() => setSelectedMetric(metric)} className={({ selected }) =>
              `px-4 py-2 rounded-lg font-semibold ${selected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`
            }>
              {metric}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {selectedPlan ? (
            <div>
              <div className="mb-6">
                {selectedMetric === 'Umidade do Solo' && selectedPlan.moisture !== undefined && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <FaWater size={24} />
                    <span className="text-xl font-semibold">Umidade do Solo: {selectedPlan.moisture}%</span>
                  </div>
                )}
                {selectedMetric === 'Temperatura do Solo' && selectedPlan.temperature !== undefined && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <FaThermometerHalf size={24} />
                    <span className="text-xl font-semibold">Temperatura do Solo: {selectedPlan.temperature}°C</span>
                  </div>
                )}
                {selectedMetric === 'Luminosidade' && selectedPlan.brightness !== undefined && (
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <FaSun size={24} />
                    <span className="text-xl font-semibold">Luminosidade: {selectedPlan.brightness} Lux</span>
                  </div>
                )}
                {selectedMetric === 'Umidade do Ar' && selectedPlan.airMoisture !== undefined && (
                  <div className="flex items-center space-x-2 text-blue-400">
                    <FaCloudSun size={24} />
                    <span className="text-xl font-semibold">Umidade do Ar: {selectedPlan.airMoisture}%</span>
                  </div>
                )}
                {selectedMetric === 'Temperatura do Ar' && selectedPlan.airTemperature !== undefined && (
                  <div className="flex items-center space-x-2 text-orange-600">
                    <FaThermometerHalf size={24} />
                    <span className="text-xl font-semibold">Temperatura do Ar: {selectedPlan.airTemperature}°C</span>
                  </div>
                )}
              </div>
              {renderTasks(selectedPlan.tasks_by_week)}
            </div>
          ) : (
            <p className="text-center text-gray-500">Não há dados disponíveis para {selectedMetric}</p>
          )}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
