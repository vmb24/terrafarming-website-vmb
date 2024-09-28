// components/TaskBoard.tsx
import React from 'react';
import { MoisturePlan, TemperaturePlan } from '../types/soil';
import TaskCard from './TaskCard';

interface TaskBoardProps {
  plans: MoisturePlan[] | TemperaturePlan[];
  category: 'moisture' | 'temperature';
}

const TaskBoard: React.FC<TaskBoardProps> = ({ plans, category }) => {
  const columns = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];

  const extractTasksFromPlan = (plan: MoisturePlan | TemperaturePlan) => {
    const content = category === 'moisture' 
      ? (plan as MoisturePlan).plan.recommendations 
      : (plan as TemperaturePlan).plan;
  
    console.log("Conteúdo do plano:", content);
  
    const weeklyTasks: { [key: string]: string[] } = {};
    columns.forEach(week => {
      weeklyTasks[week] = [];
    });
  
    const weekRegex = /Semana \d+([\s\S]*?)(?=Semana \d+|$)/g;
    let match = content.match(weekRegex);
  
    if (match) {
      // Caso 1: O plano está dividido por semanas
      while ((match = weekRegex.exec(content)) !== null) {
        const weekContent = match[0];
        const weekNumber = weekContent.match(/Semana (\d+)/)?.[1];
        if (weekNumber) {
          const weekKey = `Semana ${weekNumber}`;
          const tasks = weekContent
            .split('\n-')
            .slice(1)
            .map(task => task.trim())
            .filter(task => task.length > 0);
          
          weeklyTasks[weekKey] = tasks;
        }
      }
    } else {
      // Caso 2: O plano não está dividido por semanas
      const tasks = content
        .split('\n-')
        .slice(1)
        .map(task => task.trim())
        .filter(task => task.length > 0);
  
      // Distribuir tarefas igualmente entre as semanas
      const tasksPerWeek = Math.ceil(tasks.length / columns.length);
      columns.forEach((week, index) => {
        const start = index * tasksPerWeek;
        const end = start + tasksPerWeek;
        weeklyTasks[week] = tasks.slice(start, end);
      });
    }
  
    console.log("Tarefas extraídas:", weeklyTasks);
    return weeklyTasks;
  };

  const distributePlans = () => {
    const distribution: { [key: string]: string[] } = {
      'Semana 1': [],
      'Semana 2': [],
      'Semana 3': [],
      'Semana 4': [],
    };
  
    plans.forEach((plan) => {
      const weeklyTasks = extractTasksFromPlan(plan);
      columns.forEach(week => {
        if (weeklyTasks[week]) {
          distribution[week].push(...weeklyTasks[week]);
        }
      });
    });
  
    console.log("Tarefas distribuídas:", distribution);
    return distribution;
  };

  const distributedTasks = distributePlans();

  return (
    <div className="flex overflow-x-auto">
      {columns.map((column) => (
        <div key={column} className="flex-shrink-0 w-80 bg-gray-200 rounded-lg p-4 mr-4">
          <h3 className="text-lg font-semibold mb-4">{column}</h3>
          <div className="space-y-4">
            {distributedTasks[column].length > 0 ? (
              distributedTasks[column].map((task, index) => (
                <TaskCard key={`${column}-${index}`} task={task} />
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhuma tarefa para esta semana</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;