import React, { useState, useEffect } from 'react';

const IOTDeviceLogs: React.FC = () => {
  const [logs, setLogs] = useState<{ id: number; date: string; message: string }[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Estabelecer conexão WebSocket
    const ws = new WebSocket('wss://192.168.1.18/logs'); // Substitua pelo IP correto da sua placa ESP32

    ws.onopen = () => {
      console.log('Conexão WebSocket estabelecida');
      // Você pode enviar uma mensagem para solicitar logs iniciais, se necessário
      // ws.send('REQUEST_LOGS');
    };

    ws.onmessage = (event) => {
      const logData = JSON.parse(event.data);
      setLogs((prevLogs) => [...prevLogs, {
        id: prevLogs.length + 1,
        date: new Date().toISOString(),
        message: logData.message
      }]);
    };

    ws.onerror = (error) => {
      console.error('Erro na conexão WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('Conexão WebSocket fechada');
    };

    setSocket(ws);

    // Limpar a conexão WebSocket quando o componente for desmontado
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Logs do Dispositivo</h2>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mensagem</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{log.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IOTDeviceLogs;