'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const IOTConfig: React.FC = () => {
  const [uuid, setUuid] = useState('');
  const [crop, setCrop] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    generateUUID();
  }, []);

  const generateUUID = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
    setStatus(''); // Limpa o status ao gerar um novo UUID
  };

  const sendConfiguration = async () => {
    if (!uuid) {
      setStatus('Por favor, gere um UUID antes de enviar');
      return;
    }

    if (!crop) {
      setStatus('Por favor, informe o que você planta antes de enviar');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.3/config', { uuid, crop }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      setStatus('Configuração enviada com sucesso');
    } catch (error) {
      console.error('Erro ao enviar configuração:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setStatus(`Erro do servidor: ${error.response.status} - ${error.response.data.message || 'Erro desconhecido'}`);
        } else if (error.request) {
          setStatus('Não houve resposta do servidor. Verifique a conexão.');
        } else {
          setStatus(`Erro na configuração da requisição: ${error.message}`);
        }
      } else {
        setStatus('Erro desconhecido ao enviar configuração');
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Configuração IOT</h2>

      <div className="mb-8 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">UUID</h3>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={uuid}
            readOnly
            className="w-full p-3 dark:bg-gray-800 dark:text-white rounded"
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

        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white mt-8">O que você planta?</h3>
        <input
          type="text"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          placeholder="Ex: Milho, Soja, Café..."
          className="w-full p-3 mb-4 dark:bg-gray-800 dark:text-white rounded"
        />

        <button 
          onClick={sendConfiguration}
          className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white font-normal py-2 px-4 rounded"
        >
          Enviar Configuração
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