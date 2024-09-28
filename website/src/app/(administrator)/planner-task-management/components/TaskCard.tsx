// components/TaskCard.tsx
import React from 'react';

interface TaskCardProps {
  task: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <p className="text-sm">{task}</p>
    </div>
  );
};

export default TaskCard;