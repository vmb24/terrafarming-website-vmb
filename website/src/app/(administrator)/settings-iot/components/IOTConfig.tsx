'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const IOTConfig: React.FC = () => {
  const [uuid, setUuid] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    generateUUID();
  }, []);

  const generateUUID = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
    setStatus(''); // Limpa o status ao gerar um novo UUID
  };

  const sendUUID = async () => {
    if (!uuid) {
      setStatus('Por favor, gere um UUID antes de enviar');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.19/config-uuid', { uuid }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      // Assumindo que o servidor retorna uma mensagem de sucesso
      setStatus('UUID enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar UUID:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setStatus(`Erro do servidor: ${error.response.status} - ${error.response.data.message || 'Erro desconhecido'}`);
        } else if (error.request) {
          setStatus('Não houve resposta do servidor. Verifique a conexão.');
        } else {
          setStatus(`Erro na configuração da requisição: ${error.message}`);
        }
      } else {
        setStatus('Erro desconhecido ao enviar UUID');
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Configuração IOT</h2>

      <div className="mb-8 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">UUID</h3>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={uuid}
            readOnly
            className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button 
            onClick={generateUUID}
            className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Gerar Novo UUID
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Use este UUID para configurar seu dispositivo IoT
        </p>
        <button 
          onClick={sendUUID}
          className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Enviar UUID
        </button>
      </div>

      {status && (
        <p className={`text-sm mt-2 ${
          status.includes('sucesso') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default IOTConfig;