import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaArrowUp, FaArrowDown, FaEquals } from 'react-icons/fa';
import axios from 'axios';

interface MetricData {
  value: number | null;
  unit: string;
  status: string;
  trend: 'up' | 'down' | 'stable';
  prediction: string;
}

interface ApiResponse {
  moisture?: number;
  temperature?: number;
  status: string;
  timestamp: string;
}

const MetricsChartsHarvestForecast: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [data, setData] = useState<Record<string, MetricData>>({
    soilMoisture: { value: null, unit: '%', status: 'Sem dados', trend: 'stable', prediction: 'Dados insuficientes' },
    soilTemperature: { value: null, unit: '°C', status: 'Sem dados', trend: 'stable', prediction: 'Dados insuficientes' },
    luminosity: { value: null, unit: '', status: 'Sem dados', trend: 'stable', prediction: 'Dados insuficientes' },
    airTemperature: { value: null, unit: '', status: 'Sem dados', trend: 'stable', prediction: 'Dados insuficientes' },
    airHumidity: { value: null, unit: '', status: 'Sem dados', trend: 'stable', prediction: 'Dados insuficientes' },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moistureResponse = await axios.get<ApiResponse>('https://81dkc5z9yd.execute-api.us-east-1.amazonaws.com/prod/moisture');
        const temperatureResponse = await axios.get<ApiResponse>('https://uphc1w9gfc.execute-api.us-east-1.amazonaws.com/prod/temperature');

        setData(prevData => ({
          ...prevData,
          soilMoisture: {
            ...prevData.soilMoisture,
            value: moistureResponse.data.moisture || null,
            status: moistureResponse.data.status || 'Sem dados',
            trend: 'stable',
            prediction: moistureResponse.data.moisture ? 'Previsão baseada nos dados atuais' : 'Dados insuficientes'
          },
          soilTemperature: {
            ...prevData.soilTemperature,
            value: temperatureResponse.data.temperature || null,
            status: temperatureResponse.data.status || 'Sem dados',
            trend: 'stable',
            prediction: temperatureResponse.data.temperature ? 'Previsão baseada nos dados atuais' : 'Dados insuficientes'
          }
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(prevData => ({
          ...prevData,
          soilMoisture: { ...prevData.soilMoisture, value: null, status: 'Erro', prediction: 'Falha na obtenção dos dados' },
          soilTemperature: { ...prevData.soilTemperature, value: null, status: 'Erro', prediction: 'Falha na obtenção dos dados' },
        }));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const getCylinderFill = (value: number | null) => {
    if (typeof value === 'number') {
      return `${Math.min(value, 100)}%`;
    }
    return '0%';
  };

  const getColor = (status: string) => {
    switch (status) {
      case 'muito seco':
        return { bg: 'bg-red-200', fill: 'bg-red-400' };
      case 'normal':
        return { bg: 'bg-green-200', fill: 'bg-green-400' };
      case 'Sem dados':
      case 'Erro':
        return { bg: 'bg-gray-200', fill: 'bg-gray-400' };
      default:
        return { bg: 'bg-blue-200', fill: 'bg-blue-400' };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <FaArrowUp className="text-red-500" />;
      case 'down':
        return <FaArrowDown className="text-blue-500" />;
      default:
        return <FaEquals className="text-gray-500" />;
    }
  };

  return (
    <div className="font-sans bg-white p-6 w-full mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Métricas dos Sensores:</h2>
        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full shadow">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            customInput={<div className="cursor-pointer text-gray-600">Today</div>}
          />
          <FaCalendarAlt className="ml-2 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(data).map(([key, item], index) => {
          const { bg, fill } = getColor(item.status);
          return (
            <div key={index} className="flex flex-col items-start bg-white p-4 rounded-lg shadow">
              <div className="text-sm mb-2 font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className="relative w-full h-40 mb-4">
                <div className={`absolute inset-0 ${bg} rounded-lg overflow-hidden`} style={{ transform: 'perspective(1000px) rotateX(-10deg) rotateY(5deg)' }}>
                  <div 
                    className={`absolute bottom-0 left-0 right-0 ${fill} transition-all duration-500 ease-in-out`}
                    style={{ height: getCylinderFill(item.value) }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 w-full h-3 bg-gray-300 rounded-full" style={{ transform: 'translateX(-50%) rotateX(45deg)' }}></div>
              </div>
              <div className="text-lg font-medium">{item.value !== null ? `${item.value} ${item.unit}` : 'Sem dados'}</div>
              <div className="text-sm text-gray-600">Status: {item.status}</div>
              <div className="flex items-center mt-4">
                <span className="mr-2">Tendência:</span>
                {getTrendIcon(item.trend)}
              </div>
              <div className="text-sm text-purple-600 mt-2">Previsão: {item.prediction}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsChartsHarvestForecast;