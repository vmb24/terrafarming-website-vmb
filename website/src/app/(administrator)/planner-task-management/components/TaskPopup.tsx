// components/TaskPopup.tsx
import React, { useState } from 'react';
import { XMarkIcon, CalendarIcon, ClipboardDocumentIcon, CloudIcon, PencilSquareIcon, QuestionMarkCircleIcon, MapPinIcon, TrophyIcon } from '@heroicons/react/24/outline';

interface TaskPopupProps {
  task: string;
  value: number;
  category: 'moisture' | 'temperature';
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
      case 'alto': return 'bg-red-100 text-red-800';
      case 'médio': return 'bg-yellow-100 text-yellow-800';
      case 'baixo': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleClose}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Detalhes da Tarefa</h2>
        
        <div className="flex items-center mb-4">
          <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{formattedDate}</span>
        </div>
        
        <div className="mb-4 mt-6">
          <p className="flex items-center mb-2">
            <CloudIcon className="h-5 w-5 text-blue-500 mr-2" />
            <strong>{category === 'moisture' ? 'Umidade:' : 'Temperatura:'}</strong> 
            <span className="ml-2">{value.toFixed(2)}{category === 'moisture' ? '%' : '°C'}</span>
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Componentes Físicos</span>
            <span className={`${getPriorityColor(priority)} text-xs font-medium px-2.5 py-0.5 rounded`}>{priority}</span>
          </div>
        </div>

        <div className="mb-4 mt-6">
          <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-600">
            <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
            Descrição
          </h3>
          <p className="text-gray-800">{task}</p>
        </div>

        <div className="mb-4 mt-6">
          <p className="mb-2"><strong>Semana:</strong> {week}</p>
          <p className="mb-2"><strong>Tarefa:</strong> {task}</p>
        </div>
        
        <div className="mb-4 mt-6">
          <h3 className="flex items-center text-lg font-semibold mb-2">
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Anotações
          </h3>
          <textarea
            className="w-full p-2 border rounded bg-gray-100"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Adicione suas anotações aqui..."
          />
        </div>
        
        <div className="mb-4 mt-6">
          <h3 className="flex items-center text-lg font-semibold mb-2">
            <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
            Pergunte ao Assistente
          </h3>
          <form onSubmit={handleSubmitQuestion} className="flex">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l bg-gray-100"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Digite sua pergunta..."
            />
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-r">
              Enviar
            </button>
          </form>
        </div>
        
        <div className="mb-4 mt-8">
          <h3 className="flex items-center text-lg font-semibold mb-2">
            <MapPinIcon className="h-5 w-5 mr-2" />
            Mapa de Locais de Compra
          </h3>
          <p>Link para o mapa: [Implementar link para o mapa]</p>
        </div>
        
        <div className="mb-4 mt-8">
          <h3 className="flex items-center text-lg font-semibold mb-2">
            <TrophyIcon className="h-5 w-5 mr-2" />
            Gamificação
          </h3>
          <p>[Informações sobre gamificação virão aqui]</p>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;