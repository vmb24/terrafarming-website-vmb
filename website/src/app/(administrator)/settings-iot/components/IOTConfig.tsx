import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const IOTConfig: React.FC = () => {
  const [uuid, setUuid] = useState('');
  const [crop, setCrop] = useState('');
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [isWifiConfigured, setIsWifiConfigured] = useState(false);
  const [isUUIDSent, setIsUUIDSent] = useState(false);

  useEffect(() => {
    generateUUID();
  }, []);

  const generateUUID = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
    setStatus('');
  };

  const connectToBluetooth = async () => {
    try {
      setStatus('Procurando dispositivo Bluetooth...');

      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'TerraFarmingAgriculture' }],
        optionalServices: ['12345678-1234-5678-1234-56789abcdef0']
      });

      setDevice(device);
      setDeviceName(device.name || 'Dispositivo desconhecido');
      setStatus('Dispositivo encontrado! Conectando...');

      const server = await device.gatt?.connect();

      if (!server) {
        setStatus('Erro ao conectar ao dispositivo BLE.');
        return;
      }

      setStatus('Conectado ao dispositivo!');
    } catch (error) {
      console.error('Erro ao conectar ao Bluetooth:', error);
      setStatus('Erro ao conectar ao Bluetooth. Verifique se o dispositivo está visível.');
    }
  };

  const sendWifiCredentials = async () => {
    if (!wifiSSID || !wifiPassword) {
      setStatus('Por favor, preencha as credenciais de Wi-Fi.');
      return;
    }

    try {
      if (!device) {
        setStatus('Conecte a um dispositivo Bluetooth primeiro.');
        return;
      }

      setStatus('Enviando credenciais de Wi-Fi via Bluetooth...');

      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService('12345678-1234-1234-1234-123456789abc');
      const characteristic = await service?.getCharacteristic('abcd1234-5678-9876-5432-1234567890ab');

      if (!characteristic) {
        setStatus('Característica BLE não encontrada.');
        return;
      }

      const wifiConfig = JSON.stringify({ ssid: wifiSSID, password: wifiPassword });
      const encoder = new TextEncoder();
      await characteristic.writeValue(encoder.encode(wifiConfig));

      setStatus('Credenciais Wi-Fi enviadas! Aguardando confirmação da conexão...');

      // Simulação de espera pela confirmação do Wi-Fi
      setTimeout(() => {
        setIsWifiConfigured(true);
        setStatus('Wi-Fi conectado! Pronto para enviar UUID e cultura.');
      }, 5000);
    } catch (error) {
      console.error('Erro ao enviar credenciais Wi-Fi via Bluetooth:', error);
      setStatus('Erro ao enviar credenciais Wi-Fi.');
    }
  };

  const sendConfigData = async () => {
    if (!isWifiConfigured || !crop) {
      setStatus('Wi-Fi não está configurado ou cultura não definida.');
      return;
    }

    try {
      setStatus('Enviando UUID e cultura via Bluetooth...');

      const server = await device?.gatt?.connect();
      const service = await server?.getPrimaryService('12345678-1234-1234-1234-123456789abc');
      const characteristic = await service?.getCharacteristic('abcd1234-5678-9876-5432-1234567890ab');

      const configData = JSON.stringify({ uuid, crop });
      const encoder = new TextEncoder();
      await characteristic?.writeValue(encoder.encode(configData));

      setStatus('UUID e cultura enviados com sucesso! Aguardando confirmação...');

      // Simulação de confirmação
      setTimeout(() => {
        setIsUUIDSent(true);
        setStatus('Configuração confirmada!');
      }, 5000);
    } catch (error) {
      console.error('Erro ao enviar UUID e cultura via Bluetooth:', error);
      setStatus('Erro ao enviar configuração.');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Configuração IOT</h2>

      <div className="mb-8 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Nome da Rede Wi-Fi (SSID)</h3>
        <input
          type="text"
          value={wifiSSID}
          onChange={(e) => setWifiSSID(e.target.value)}
          placeholder="Digite o nome da rede Wi-Fi"
          className="w-full p-3 mb-4 dark:bg-gray-800 dark:text-white rounded"
        />

        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Senha do Wi-Fi</h3>
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={wifiPassword}
            onChange={(e) => setWifiPassword(e.target.value)}
            placeholder="Digite a senha do Wi-Fi"
            className="w-full p-3 dark:bg-gray-800 dark:text-white rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button 
          onClick={sendWifiCredentials}
          className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white font-normal py-2 px-4 rounded"
        >
          Enviar Credenciais Wi-Fi
        </button>
      </div>

      {isWifiConfigured && (
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

          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Cultura</h3>
          <input
            type="text"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder="Digite o nome da cultura"
            className="w-full p-3 mb-4 dark:bg-gray-800 dark:text-white rounded"
          />

          <button 
            onClick={sendConfigData}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-normal py-2 px-4 rounded"
          >
            Enviar UUID e Cultura
          </button>
        </div>
      )}

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-4 text-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-2">Status:</h3>
        <p>{status}</p>
      </div>

      {!device && (
        <button 
          onClick={connectToBluetooth}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded"
        >
          Conectar ao Bluetooth
        </button>
      )}

      {device && (
        <div className="mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
          <p>Dispositivo Conectado: {deviceName}</p>
        </div>
      )}
    </div>
  );
};

export default IOTConfig;
