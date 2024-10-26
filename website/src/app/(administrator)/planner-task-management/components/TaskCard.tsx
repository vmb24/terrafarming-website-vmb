import React, { useState } from 'react';
import TaskPopup from './TaskPopup';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface TaskCardProps {
  task: string;
  value: number;
  category: 'soilMoisture' | 'soilTemperature' | 'brightness' | 'airTemperature' | 'airMoisture';
  week: 1 | 2 | 3 | 4;
  taskImagePath: string;
  plantingImagePath: string;
  predictiveAnalysis?: string;
  createdAt: string;
  startTime?: Date;
  duration: number;
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
    case 1: return '#EF4444'; // Vermelho
    case 2: return '#F59E0B'; // Amarelo
    case 3: return '#10B981'; // Verde
    default: return '#3B82F6'; // Azul
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
  createdAt,
  startTime,
  duration
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { theme } = useTheme();

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const priority = getPriority(week);
  const priorityColor = getPriorityColor(week);

  const formatTime = (date?: Date) => {
    if (!date) return "00:00";
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex h-full cursor-pointer"
      onClick={handleCardClick}
      style={{ borderLeft: `4px solid ${priorityColor}` }}
    >
      <div className="flex-1 p-2 hover:shadow-lg transition-shadow overflow-hidden">
        <div className="flex justify-between items-start mb-1">
          <div className="overflow-hidden">
            <h3 className="font-semibold text-sm truncate text-gray-800 dark:text-gray-100">
              {category === 'soilMoisture' ? 'Umidade Task' : 'Temperatura Task'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {formatTime(startTime)} - {duration * 60}min
            </p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <span className={`text-xs px-2 py-1 rounded-full text-white mr-1`} style={{ backgroundColor: priorityColor }}>
              {priority}
            </span>
            <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" />
          </div>
        </div>
        
        <p className="text-sm text-gray-700 dark:text-gray-200 mb-1 line-clamp-2">{task}</p>
        
        <div className="mt-1">
          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-500 border-2 border-white dark:border-gray-700 overflow-hidden">
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
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">14%</div>
          </div>
          <div className="mt-1 bg-gray-200 dark:bg-gray-500 rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full"
              style={{ width: '14%' }}
            />
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
          priority={priority}
        />
      )}
    </div>
  );
};

export default TaskCard;