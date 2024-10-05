// components/ResourceOptimization.tsx
import React from 'react';

interface Recommendation {
  type: 'irrigation' | 'fertilizer' | 'pesticide';
  action: string;
  reason: string;
}

interface ResourceOptimizationProps {
  recommendations: Recommendation[];
}

// Tipos para os dados dos sensores
type SensorData = {
    soilMoisture: number;
    soilTemperature: number;
    airHumidity: number;
    airTemperature: number;
    lightIntensity: number;
};

// Componente de Otimização de Recursos
const ResourceOptimization: React.FC<{ currentData: SensorData }> = ({ currentData }) => {
    const recommendations = [
      {
        type: 'irrigation',
        action: currentData.soilMoisture < 40 ? 'Aumentar irrigação' : 'Manter irrigação atual',
        reason: `Umidade do solo: ${currentData.soilMoisture}%`,
      },
      {
        type: 'temperature',
        action: currentData.airTemperature > 30 ? 'Ativar sistema de resfriamento' : 'Monitorar temperatura',
        reason: `Temperatura do ar: ${currentData.airTemperature}°C`,
      },
      {
        type: 'light',
        action: currentData.lightIntensity < 5000 ? 'Considerar iluminação suplementar' : 'Manter exposição solar atual',
        reason: `Intensidade de luz: ${currentData.lightIntensity} lux`,
      },
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Otimização de Recursos</h2>
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index} className="mb-4">
              <div className="font-semibold">{rec.action}</div>
              <p className="text-gray-600">{rec.reason}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default ResourceOptimization;