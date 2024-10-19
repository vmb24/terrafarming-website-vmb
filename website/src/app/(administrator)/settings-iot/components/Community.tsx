'use client'

import React from 'react';
import { useTheme } from 'next-themes';
import { FaUsers, FaLeaf, FaWater, FaSeedling, FaComments, FaPlus } from 'react-icons/fa';

const Community: React.FC = () => {
  const { theme } = useTheme();

  const forumTopics = [
    { id: 1, title: 'Dicas para economizar água na irrigação', replies: 15, lastActivity: '2 horas atrás', icon: <FaWater /> },
    { id: 2, title: 'Melhor momento para irrigar?', replies: 8, lastActivity: '1 dia atrás', icon: <FaLeaf /> },
    { id: 3, title: 'Compartilhe suas experiências com o sistema', replies: 22, lastActivity: '3 dias atrás', icon: <FaSeedling /> },
  ];

  const communityFeatures = [
    { title: 'Fórum de Discussão', description: 'Compartilhe experiências e tire dúvidas', icon: <FaComments /> },
    { title: 'Grupos de Interesse', description: 'Junte-se a grupos específicos de cultivo', icon: <FaUsers /> },
    { title: 'Eventos Virtuais', description: 'Participe de webinars e workshops online', icon: <FaLeaf /> },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Comunidade de Irrigação Inteligente</h2>
      
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {communityFeatures.map((feature, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="text-blue-100 dark:text-blue-200">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 px-6 py-4">
          <h3 className="text-2xl font-semibold text-white">Fórum de Discussão</h3>
          <p className="text-blue-100 dark:text-blue-200">Conecte-se com outros agricultores e compartilhe experiências.</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {forumTopics.map((topic) => (
            <li key={topic.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-blue-500 dark:text-blue-400 mr-4">{topic.icon}</div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{topic.title}</p>
                  <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{topic.replies} respostas</span>
                    <span className="mx-2">•</span>
                    <span>Última atividade: {topic.lastActivity}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 dark:from-green-600 dark:to-blue-700 dark:hover:from-green-700 dark:hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <FaPlus className="mr-2" />
          Criar Novo Tópico
        </button>
      </div>

      <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">Recomendações para Participação na Comunidade</h3>
        <ul className="space-y-2 text-blue-700 dark:text-blue-200">
          <li>• Participe ativamente das discussões e compartilhe suas experiências</li>
          <li>• Faça perguntas e ofereça ajuda a outros membros da comunidade</li>
          <li>• Compartilhe dicas de economia de água e técnicas de irrigação eficientes</li>
          <li>• Participe dos eventos virtuais para aprender com especialistas e outros agricultores</li>
          <li>• Utilize o fórum para resolver problemas técnicos e trocar ideias inovadoras</li>
        </ul>
      </div>
    </div>
  );
};

export default Community;