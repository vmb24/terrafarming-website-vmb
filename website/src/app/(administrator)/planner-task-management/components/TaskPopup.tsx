// components/TaskPopup.tsx
'use client'

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { XMarkIcon, CalendarIcon, ClipboardDocumentIcon, CloudIcon, PencilSquareIcon, QuestionMarkCircleIcon, MapPinIcon, TrophyIcon } from '@heroicons/react/24/outline';

interface TaskPopupProps {
  task: string;
  value: number;
  category: 'soilMoisture' | 'soilTemperature' | 'brightness' | 'airTemperature' | 'airMoisture';
  week: 1 | 2 | 3 | 4;
  taskImagePath: string;
  plantingImagePath: string;
  predictiveAnalysis?: string;
  onClose: () => void;
  createdAt: string;
  priority: string;
}

const TaskPopup: React.FC<TaskPopupProps> = ({   
  task,
  value,
  category,
  week,
  taskImagePath,
  plantingImagePath,
  predictiveAnalysis,
  onClose,
  createdAt,
  priority
}) => {
  const [note, setNote] = useState('');
  const [question, setQuestion] = useState('');
  const { theme } = useTheme();

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pergunta enviada:', question);
    setQuestion('');
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case 'alto': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'médio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'baixo': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Detalhes da Tarefa</h2>
        
        <div className="flex items-center mb-4">
          <CalendarIcon className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{formattedDate}</span>
        </div>
        
        <div className="mb-4 mt-6">
          <p className="flex items-center mb-2">
            <CloudIcon className="h-5 w-5 text-blue-500 mr-2" />
            <strong className="dark:text-white">{category === 'soilMoisture' ? 'Umidade:' : 'Temperatura:'}</strong> 
            <span className="ml-2 dark:text-gray-300">{value.toFixed(2)}{category === 'soilMoisture' ? '%' : '°C'}</span>
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded">Componentes Físicos</span>
            <span className={`${getPriorityColor(priority)} text-xs font-medium px-2.5 py-0.5 rounded`}>{priority}</span>
          </div>
        </div>

        <div className="mb-4 mt-6">
          <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-600 dark:text-gray-300">
            <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
            Descrição
          </h3>
          <p className="text-gray-800 dark:text-gray-200">{task}</p>
        </div>

        <div className="mb-4 mt-6">
          <p className="mb-2 dark:text-gray-300"><strong>Semana:</strong> {week}</p>
          <p className="mb-2 dark:text-gray-300"><strong>Tarefa:</strong> {task}</p>
        </div>
        
        <div className="mb-4 mt-6">
          <h3 className="flex items-center text-lg font-semibold mb-2 dark:text-white">
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Anotações
          </h3>
          <textarea
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Adicione suas anotações aqui..."
          />
        </div>
        
        <div className="mb-4 mt-6">
          <h3 className="flex items-center text-lg font-semibold mb-2 dark:text-white">
            <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
            Pergunte ao Assistente
          </h3>
          <form onSubmit={handleSubmitQuestion} className="flex">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Digite sua pergunta..."
            />
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-r hover:bg-green-600">
              Enviar
            </button>
          </form>
        </div>
        
        <div className="mb-4 mt-8">
          <h3 className="flex items-center text-lg font-semibold mb-2 dark:text-white">
            <MapPinIcon className="h-5 w-5 mr-2" />
            Mapa de Locais de Compra
          </h3>
          <p className="dark:text-gray-300">Link para o mapa: [Implementar link para o mapa]</p>
        </div>
        
        <div className="mb-4 mt-8">
          <h3 className="flex items-center text-lg font-semibold mb-2 dark:text-white">
            <TrophyIcon className="h-5 w-5 mr-2" />
            Gamificação
          </h3>
          <p className="dark:text-gray-300">[Informações sobre gamificação virão aqui]</p>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;