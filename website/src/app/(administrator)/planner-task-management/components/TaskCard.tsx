// components/TaskCard.tsx
import React from 'react';

interface TaskCardProps {
  task: string;
  value: number;
  category: 'moisture' | 'temperature';
}

const TaskCard: React.FC<TaskCardProps> = ({ task, value, category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <p className="text-sm text-gray-600 mb-2">
        {category === 'moisture' ? 'Umidade:' : 'Temperatura:'} {value.toFixed(2)}
        {category === 'moisture' ? '%' : '°C'}
      </p>
      <p className="text-sm">{task}</p>
    </div>
  );
};

export default TaskCard;