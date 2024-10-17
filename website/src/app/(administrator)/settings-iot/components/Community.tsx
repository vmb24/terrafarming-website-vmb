import React from 'react';

const Community: React.FC = () => {
  const forumTopics = [
    { id: 1, title: 'Dicas para economizar água na irrigação', replies: 15, lastActivity: '2 horas atrás' },
    { id: 2, title: 'Melhor momento para irrigar?', replies: 8, lastActivity: '1 dia atrás' },
    { id: 3, title: 'Compartilhe suas experiências com o sistema', replies: 22, lastActivity: '3 dias atrás' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Comunidade</h2>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Fórum de Discussão
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
            Conecte-se com outros agricultores e compartilhe experiências.
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {forumTopics.map((topic) => (
              <li key={topic.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-green-600 truncate">{topic.title}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {topic.replies} respostas
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                      Última atividade: {topic.lastActivity}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Criar Novo Tópico
        </button>
      </div>
    </div>
  );
};

export default Community;