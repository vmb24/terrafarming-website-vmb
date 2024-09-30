// components/TaskCard.tsx
import React, { useState } from 'react';
import TaskPopup from './TaskPopup';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface TaskCardProps {
  task: string;
  value: number;
  category: 'moisture' | 'temperature';
}

const TaskCard: React.FC<TaskCardProps> = ({ task, value, category }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow flex justify-between items-center"
        onClick={() => setIsPopupOpen(true)}
      >
        <div>
          <p className="text-sm text-gray-600 mb-2">
            {category === 'moisture' ? 'Umidade:' : 'Temperatura:'} {value.toFixed(2)}
            {category === 'moisture' ? '%' : '°C'}
          </p>
          <p className="text-sm">{task}</p>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
      </div>
      {isPopupOpen && (
        <TaskPopup
          task={task}
          value={value}
          category={category}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};

export default TaskCard;