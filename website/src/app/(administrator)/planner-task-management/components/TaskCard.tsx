// components/TaskCard.tsx
import React, { useState } from 'react';
import TaskPopup from './TaskPopup';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface TaskCardProps {
  task: string;
  value: number;
  category: 'moisture' | 'temperature';
  week: 1 | 2 | 3 | 4;
  taskImagePath: string;
  plantingImagePath: string;
  predictiveAnalysis?: string;
  createdAt: string;
}

const getPriority = (week: number): string => {
  switch (week) {
    case 1: return 'Alto';
    case 2: return 'Médio';
    case 3: return 'Baixo';
    default: return 'Planejado';
  }
};

const getPriorityColor = (week: number): string => {
  switch (week) {
    case 1: return 'bg-red-500';
    case 2: return 'bg-yellow-500';
    case 3: return 'bg-green-500';
    default: return 'bg-blue-500';
  }
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  value,
  category,
  week,
  taskImagePath,
  plantingImagePath,
  predictiveAnalysis,
  createdAt
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="mb-4" onClick={handleCardClick}>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden flex`}>
        <div className={`w-1 ${getPriorityColor(week)}`}></div>
        <div className="flex-1 p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-sm">{category === 'moisture' ? 'Umidade Task' : 'Temperatura Task'}</h3>
              <p className="text-xs text-gray-600">
                {category === 'moisture' ? 'Monitorar umidade: ' : 'Controlar temperatura: '}
                {typeof value === 'number' ? value.toFixed(1) : 'N/A'}
                {category === 'moisture' ? '%' : '°C'}
              </p>
            </div>
            <div className="flex items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(week)} text-white mr-2`}>
                {getPriority(week)}
              </span>
              <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <p className="text-xs text-gray-700 mb-3 line-clamp-2">{task}</p>
          
          <div className="border-t pt-2">
            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                    <Image
                      src={i % 2 === 0 ? taskImagePath : plantingImagePath}
                      alt={i % 2 === 0 ? "Task image" : "Planting image"}
                      width={24}
                      height={24}
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs font-semibold">14%</div>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full"
                style={{ width: '14%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <TaskPopup
          task={task}
          value={value}
          category={category}
          week={week}
          taskImagePath={taskImagePath}
          plantingImagePath={plantingImagePath}
          predictiveAnalysis={predictiveAnalysis}
          onClose={handlePopupClose}
          createdAt={createdAt}
        />
      )}
    </div>
  );
};

export default TaskCard;