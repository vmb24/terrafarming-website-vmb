import React, { useState, useEffect } from 'react';
import { MoisturePlan, TemperaturePlan } from '../types/soil';
import TaskCard from './TaskCard';
import { useTheme } from 'next-themes';

interface TaskBoardProps {
  plans: MoisturePlan[] | TemperaturePlan[];
  category: 'moisture' | 'temperature';
}

const TaskBoard: React.FC<TaskBoardProps> = ({ plans, category }) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [allTasks, setAllTasks] = useState<any[]>([]);

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

  const extractTasksFromPlan = (plan: MoisturePlan | TemperaturePlan) => {
    let content: string = '';
    
    if ('plan' in plan && typeof plan.plan === 'object' && plan.plan !== null) {
      content = plan.plan.recommendations || '';
    } else if (typeof plan.plan === 'string') {
      content = plan.plan;
    }
  
    if (typeof content !== 'string') {
      console.error('Conteúdo do plano não é uma string:', content);
      content = '';
    }
  
    const tasks = content
      .split('\n-')
      .slice(1)
      .map(task => task.trim())
      .filter(task => task.length > 0);
  
    return tasks.map(task => {
      const createdAtDate = new Date(plan.createdAt);
      
      return {
        task,
        value: 'moisture' in plan ? plan.moisture : (plan as TemperaturePlan).temperature,
        createdAt: createdAtDate,
        startTime: new Date(createdAtDate.getTime() + Math.random() * 24 * 60 * 60 * 1000),
        duration: 0.5 // 30 minutos
      };
    });
  };

  useEffect(() => {
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

  // Função para agrupar tarefas que se sobrepõem
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
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold mr-2">
            {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </h2>
          <button className="text-green-500 dark:text-green-400">▼</button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">You have total {filteredTasks.length} tasks today</p>
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
                {`${hour.toString().padStart(2, '0')}:00`}
              </div>
            ))}
          </div>
          
          {timeSlots.map((hour, index) => (
            <div 
              key={hour} 
              className="absolute top-0 bottom-0 border-l border-gray-300 dark:border-gray-600" 
              style={{ left: `${(index / timeSlots.length) * 100}%` }} 
            />
          ))}

          {taskGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="absolute left-0 right-0" style={{ top: `${getTaskPosition(group[0].startTime)}%` }}>
              {group.map((task, taskIndex) => {
                const taskWidth = getTaskWidth(task.duration, task.startTime);
                const taskPosition = getTaskPosition(task.startTime);
                
                return (
                  <div 
                    key={taskIndex}
                    className="absolute"
                    style={{
                      top: `${taskIndex * 110}px`,
                      left: `${taskPosition}%`,
                      width: `${taskWidth}%`,
                      maxWidth: `${100 - taskPosition}%`,
                      minWidth: '200px',
                      height: '150px',
                    }}
                  >
                    <TaskCard
                      task={task.task}
                      value={task.value}
                      category={category}
                      week={selectedWeek as 1 | 2 | 3 | 4}
                      createdAt={task.createdAt}
                      startTime={task.startTime}
                      duration={task.duration}
                      taskImagePath="/images/task-agriculture.png"
                      plantingImagePath="/images/generic-fruits.png"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {filteredTasks.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            Não há tarefas para exibir neste dia.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;