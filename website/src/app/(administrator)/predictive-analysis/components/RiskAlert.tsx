// components/RiskAlert.tsx
import React from 'react';

interface Risk {
  type: string;
  probability: number;
  severity: 'low' | 'medium' | 'high';
}

interface RiskAlertProps {
  risks: Risk[];
}

// Tipos para os dados dos sensores
type SensorData = {
    soilMoisture: number;
    soilTemperature: number;
    airHumidity: number;
    airTemperature: number;
    lightIntensity: number;
};

// Componente de Alerta de Riscos
const RiskAlert: React.FC<{ currentData: SensorData }> = ({ currentData }) => {
    const risks = [
      {
        type: 'Seca',
        probability: currentData.soilMoisture < 30 ? 'Alto' : 'Baixo',
        severity: currentData.soilMoisture < 20 ? 'high' : 'low',
      },
      {
        type: 'Excesso de Calor',
        probability: currentData.airTemperature > 35 ? 'Alto' : 'Baixo',
        severity: currentData.airTemperature > 40 ? 'high' : 'medium',
      },
      // Adicione mais riscos baseados nos outros sensores
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Alerta de Riscos</h2>
        <ul>
          {risks.map((risk, index) => (
            <li key={index} className="mb-2">
              <span>{risk.type}: </span>
              <span className={`px-2 py-1 rounded ${
                risk.severity === 'high' ? 'bg-red-200 text-red-800' :
                risk.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                {risk.probability}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default RiskAlert;