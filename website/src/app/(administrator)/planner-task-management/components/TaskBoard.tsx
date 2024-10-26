'use client';

import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: string;
  createdAt: string;
  activity: string;
  priority: string;
  week: string;
  date: string;
  time: string;
}

type Category = 'soilMoisture' | 'soilTemperature' | 'brightness' | 'airTemperature' | 'airMoisture';

interface TaskBoardProps {
  tasks: Task[];
  category: Category;
  isLoading: boolean;
  error: string | null;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, category, isLoading, error }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

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

  const daysInWeek = getDaysInWeek(selectedWeek);
  const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8); // 8:00 to 23:00

  const getTaskPosition = (startTime: Date) => {
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const totalMinutes = (startHour - 8) * 60 + startMinute;
    return (totalMinutes / (16 * 60)) * 100;
  };

  const filteredTasks = tasks.filter(task =>
    new Date(task.date).toDateString() === selectedDate.toDateString()
  );

  const weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center p-4">Carregando tarefas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center p-4 text-red-500">{error}</div>
      </div>
    );
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

          {filteredTasks.map((task) => {
            const taskPosition = getTaskPosition(new Date(task.date + ' ' + task.time));
            return (
              <div
                key={task.id}
                className="absolute"
                style={{
                  left: `${taskPosition}%`,
                  top: '0',
                  width: '200px',
                  height: '150px',
                }}
              >
                <TaskCard
                  key={task.id}
                  task={task.activity}
                  value={task.progress}
                  category={category}
                  week={parseInt(task.week) as 1 | 2 | 3 | 4}
                  createdAt={task.createdAt}
                  startTime={new Date(task.date + ' ' + task.time)}
                  duration={60}
                  taskImagePath="/images/task-agriculture.png"
                  plantingImagePath="/images/generic-fruits.png"
                />
              </div>
            );
          })}
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