import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SERVICE_UUID = "4fafc201-1fb5-459e-8d40-b6b0e6e9b6b2";
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

const IOTConfig: React.FC = () => {
  const [uuid, setUuid] = useState('');
  const [crops, setCrops] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    generateUUID();
    connectWebSocket(); // Conectar ao WebSocket quando o componente for montado
  }, []);

  const generateUUID = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
    setStatus('');
  };

  const connectToBluetooth = async () => {
    try {
      setStatus('Procurando dispositivo Bluetooth...');
      const selectedDevice = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'ESP32_WiFi_Credentials' }],
        optionalServices: [SERVICE_UUID]
      });

      setStatus('Dispositivo encontrado! Conectando...');
      const server = await selectedDevice.gatt?.connect();
      if (!server) {
        setStatus('Erro ao conectar ao dispositivo BLE.');
        return;
      }

      const service = await server.getPrimaryService(SERVICE_UUID);
      const char = await service.getCharacteristic(CHARACTERISTIC_UUID);
      setCharacteristic(char);
      setStatus('Conectado ao dispositivo!');
    } catch (error: any) {
      if (error.name === 'NotFoundError') {
        setStatus('Conexão Bluetooth cancelada pelo usuário. Tente novamente.');
      } else {
        console.error('Erro ao conectar ao Bluetooth:', error);
        setStatus('Erro ao conectar ao Bluetooth. Verifique se o dispositivo está visível.');
      }
    }
  };

  const sendConfigData = async () => {
    if (!characteristic || crops.length === 0) {
      setStatus('Conecte a um dispositivo Bluetooth e defina as culturas.');
      return;
    }

    try {
      setStatus('Enviando UUID e culturas via Bluetooth...');
      const configData = JSON.stringify({ uuid, crops });
      const encoder = new TextEncoder();
      await characteristic.writeValue(encoder.encode(configData));
      setStatus('UUID e culturas enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar UUID e culturas via Bluetooth:', error);
      setStatus('Erro ao enviar configuração. Tente novamente.');
    }
  };

  const handleCropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cropArray = value.split(',').map(crop => crop.trim()).filter(crop => crop !== '');
    setCrops(cropArray);
  };

  const connectWebSocket = () => {
    const socket = new WebSocket('ws://192.168.1.18/logs'); // Use ws se não estiver usando SSL

    socket.onopen = () => {
      console.log('Conectado ao WebSocket');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setLogs((prevLogs) => [...prevLogs, message]);
    };

    socket.onclose = () => {
      console.log('Conexão WebSocket fechada');
      // Aqui você pode tentar reconectar se desejar
    };

    socket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Configuração IOT</h2>

      <button 
        onClick={connectToBluetooth}
        className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded"
      >
        Conectar ao Dispositivo Bluetooth
      </button>
      <div className="text-gray-600 dark:text-gray-300 mt-8 mb-8">
        <p>Status: {status}</p>
      </div>

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
            className="ml-2 bg-green-500 hover:bg-green-600 text-white font-normal py-2 px-4 rounded"
          >
            Gerar Novo UUID
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Culturas</h3>
        <input
          type="text"
          onChange={handleCropChange}
          placeholder="Digite as culturas separadas por vírgulas"
          className="w-full p-3 mb-4 dark:bg-gray-800 dark:text-white rounded"
        />

        <button 
          onClick={sendConfigData}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-normal py-2 px-4 rounded"
        >
          Enviar UUID e Culturas
        </button>
      </div>

      <div className="mb-8 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Logs</h3>
        <div className="h-48 overflow-y-scroll border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800 rounded">
          {logs.map((log, index) => (
            <div key={index} className="text-gray-800 dark:text-white">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IOTConfig;
