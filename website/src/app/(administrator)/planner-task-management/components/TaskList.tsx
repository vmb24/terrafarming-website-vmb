// components/TaskList.tsx

import React from 'react';

interface TaskListProps {
  title: string;
  tasks: string[] | null;
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {tasks && tasks.length > 0 ? (
        <ul className="list-disc pl-6">
          {tasks.map((task, index) => (
            <li key={index} className="mb-2">{task}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">Nenhuma tarefa ou recomendação disponível</p>
      )}
    </div>
  );
};

export default TaskList;