import React, { useState, useEffect } from 'react';
import { SoilMoisturePlan, SoilTemperaturePlan, BrightnessPlan, AirTemperaturePlan, AirMoisturePlan } from '../types/types';
import TaskCard from './TaskCard';
import { useTheme } from 'next-themes';

interface TaskBoardProps {
  plans: Plan[];
  category: 'soilMoisture' | 'soilTemperature' | 'brightness' | 'airTemperature' | 'airMoisture';
}

interface Task {
  date: string;            // Data da tarefa
  recommendation: string;  // Recomendações associadas à tarefa
  time: string;            // Hora em que a tarefa deve ser executada
  task: string;            // Descrição da tarefa
}

interface Plan {
  name: string;                   // Nome do plano
  tasks_by_week: {                // Tarefas organizadas por semanas
    [key: string]: Task[];        // Chave é o nome da semana, valor é um array de tarefas
  };
}

interface ExtractedTask {
  task: string;                // Tarefa
  value: number;               // Algum valor associado à tarefa
  createdAt: Date;             // Data de criação da tarefa
  startTime: Date;             // Hora de início da tarefa
  duration: number;            // Duração da tarefa em horas
}

const TaskBoard: React.FC<TaskBoardProps> = ({ plans = [], category }) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [allTasks, setAllTasks] = useState<ExtractedTask[]>([]);

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

  const extractTasksFromPlan = (plan: Plan): ExtractedTask[] => {
    const tasks: Task[] = plan.tasks_by_week[`Semana ${selectedWeek}`] || [];
    
    const extractedTasks: ExtractedTask[] = tasks.map((task: Task) => {
      const createdAtDate = new Date(); // Ajuste conforme necessário para pegar a data correta
  
      return {
        task: task.task,
        value: 0, // Defina o valor apropriado conforme sua lógica
        createdAt: createdAtDate,
        startTime: new Date(`${task.date} ${task.time}`), // Certifique-se que o formato da data e hora esteja correto
        duration: 0.5 // Duração em horas (por exemplo, 30 minutos)
      };
    });
  
    return extractedTasks;
  };  
  
  useEffect(() => {
    if (plans && plans.length > 0) {
      const tasks = plans.flatMap(extractTasksFromPlan);
      const daysInSelectedWeek = getDaysInWeek(selectedWeek);
      
      const distributedTasks = tasks.map((task, index) => {
        const dayOfWeek = index % 7;
        const taskDate = new Date(daysInSelectedWeek[dayOfWeek]);
        
        return {
          ...task,
          startTime: new Date(taskDate.setHours(8 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60), 0, 0))
        };
      });
      
      setAllTasks(distributedTasks);
      setSelectedDate(daysInSelectedWeek[0]);
    } else {
      setAllTasks([]);
    }
  }, [plans, selectedWeek]);

  const daysInWeek = getDaysInWeek(selectedWeek);
  const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8); // 8:00 to 23:00

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

  const filteredTasks = allTasks.filter(task => 
    task.startTime.toDateString() === selectedDate.toDateString()
  );

  const groupOverlappingTasks = (tasks: any[]) => {
    const sortedTasks = [...tasks].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    const groups: any[][] = [];

    sortedTasks.forEach(task => {
      const overlappingGroup = groups.find(group => 
        group.some(groupTask => 
          (task.startTime < new Date(groupTask.startTime.getTime() + groupTask.duration * 60 * 60 * 1000)) &&
          (new Date(task.startTime.getTime() + task.duration * 60 * 60 * 1000) > groupTask.startTime)
        )
      );

      if (overlappingGroup) {
        overlappingGroup.push(task);
      } else {
        groups.push([task]);
      }
    });

    return groups;
  };

  const taskGroups = groupOverlappingTasks(filteredTasks);

  const weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-md -mt-24">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold mr-2">
            {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </h2>
          <button className="text-green-500 dark:text-green-400">▼</button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Você tem no total {filteredTasks.length} hoje</p>
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
              <div className={`text-sm ${day.toDateString() === selectedDate.toDateString() ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                {weekdays[day.getDay()]}
              </div>
              <div className={`font-bold ${day.toDateString() === selectedDate.toDateString() ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
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
          {taskGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="absolute inset-0 flex">
              {group.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className={`absolute rounded-lg border border-gray-400 dark:border-gray-500 bg-opacity-50 ${theme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}
                  style={{
                    left: `${getTaskPosition(task.startTime)}%`,
                    width: `${getTaskWidth(task.duration, task.startTime)}%`,
                    top: `${(groupIndex + 1) * 50}px`, // Ajuste a posição vertical
                  }}
                >
                  <TaskCard task={task.task} createdAt={task.createdAt} value={0} category={'soilMoisture'} week={2} taskImagePath={''} plantingImagePath={''} duration={0} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
