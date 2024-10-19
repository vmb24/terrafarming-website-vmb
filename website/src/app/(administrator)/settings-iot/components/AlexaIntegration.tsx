import React, { useState } from 'react';
import { FaAmazon, FaMicrophone, FaWater, FaCloudSun } from 'react-icons/fa';

const AlexaIntegration: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">Integração Alexa</h2>
      
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Conectar à Alexa</h3>
            <FaAmazon className="text-3xl text-white" />
          </div>
          <p className="text-blue-100 mb-6">
            Conecte sua conta à Alexa para controlar seu sistema de irrigação por voz.
          </p>
          <div className="flex items-center mb-4">
            <input
              id="alexa-enabled"
              type="checkbox"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
              className="h-5 w-5 text-blue-300 focus:ring-blue-400 border-blue-300 rounded"
            />
            <label htmlFor="alexa-enabled" className="ml-3 text-sm text-blue-100">
              Habilitar integração com Alexa
            </label>
          </div>
          <button 
            className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
              isEnabled 
                ? 'bg-blue-400 hover:bg-blue-300 text-blue-900' 
                : 'bg-blue-700 text-blue-300 cursor-not-allowed'
            }`}
            disabled={!isEnabled}
          >
            Conectar à Alexa
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Comandos Disponíveis</h3>
          <ul className="space-y-3 text-blue-100">
            <li className="flex items-start">
              <FaMicrophone className="flex-shrink-0 mt-1 mr-2" />
              "Alexa, pergunte ao meu sistema de irrigação para ligar a zona 1"
            </li>
            <li className="flex items-start">
              <FaWater className="flex-shrink-0 mt-1 mr-2" />
              "Alexa, pergunte ao meu sistema de irrigação o status da umidade do solo"
            </li>
            <li className="flex items-start">
              <FaCloudSun className="flex-shrink-0 mt-1 mr-2" />
              "Alexa, pergunte ao meu sistema de irrigação para programar rega para amanhã às 6h"
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 max-w-4xl mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recomendações</h3>
        <ul className="space-y-2 text-blue-100">
          <li>• Configure rotinas na Alexa para automatizar tarefas comuns de irrigação.</li>
          <li>• Use a Alexa para obter relatórios diários sobre o estado do seu sistema de irrigação.</li>
          <li>• Experimente controlar zonas específicas do seu jardim usando comandos de voz.</li>
          <li>• Peça à Alexa para ajustar a programação de irrigação com base nas previsões meteorológicas.</li>
        </ul>
      </div>
    </div>
  );
};

export default AlexaIntegration;