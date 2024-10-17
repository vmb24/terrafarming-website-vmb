import React from 'react';

const AlexaIntegration: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Integração Alexa</h2>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Conecte sua conta à Alexa para controlar seu sistema de irrigação por voz.
        </p>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="alexa-enabled"
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="alexa-enabled" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Habilitar integração com Alexa
            </label>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Conectar à Alexa
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Comandos disponíveis:</h3>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li>"Alexa, pergunte ao meu sistema de irrigação para ligar a zona 1"</li>
            <li>"Alexa, pergunte ao meu sistema de irrigação o status da umidade do solo"</li>
            <li>"Alexa, pergunte ao meu sistema de irrigação para programar rega para amanhã às 6h"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlexaIntegration;