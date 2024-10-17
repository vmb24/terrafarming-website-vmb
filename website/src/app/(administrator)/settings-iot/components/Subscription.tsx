import React from 'react';

const Subscription: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Plano de Assinatura</h2>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Seu plano atual: Básico</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Aproveite recursos adicionais fazendo upgrade para um plano superior.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Plano Básico</h4>
              <p className="text-gray-600 dark:text-gray-300">Recursos essenciais para começar</p>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md" disabled>
              Plano Atual
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Plano Pro</h4>
              <p className="text-gray-600 dark:text-gray-300">Recursos avançados para produtores experientes</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Fazer Upgrade
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Plano Enterprise</h4>
              <p className="text-gray-600 dark:text-gray-300">Soluções personalizadas para grandes fazendas</p>
            </div>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md">
              Contate-nos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;