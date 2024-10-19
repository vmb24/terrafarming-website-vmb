// components/PredictiveAnalysisBoard.tsx
'use client'
import React, { useEffect, useState } from 'react';
import PredictiveMetricCard from './components/PredictiveMetricCard';
import WeatherAlert from './components/WeatherAlert';
import AgriculturalMetricsRadar from './components/AgriculturalMetricsRadar';
import AgricultureImageAnalysis from './components/AgricultureImageAnalysis';
import IAgrixiAssistant from '@/components/ui/agrixi-assistant/IAgrixiAssistant';

interface PredictiveData {
  yieldForecast: number | null;
  nextIrrigation: string | null;
  waterStressRisk: string | null;
  plantingWindow: string | null;
  pestRisk: string | null;
  lastUpdated: string | null;
}

const PredictiveAnalysisBoard: React.FC = () => {
  const [data, setData] = useState<PredictiveData | null>(null);

  useEffect(() => {
    // Aqui você faria a chamada para o seu endpoint na AWS
    // Por enquanto, vamos simular com dados estáticos
    setData({
      yieldForecast: 95,
      nextIrrigation: '2024-10-15',
      waterStressRisk: 'Baixo',
      plantingWindow: '01/11/2024 - 15/11/2024',
      pestRisk: 'Moderado',
      lastUpdated: new Date().toISOString()
    });
  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="px-4 -mt-20">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8'>
            <PredictiveMetricCard
                title="Previsão de Rendimento"
                value={data.yieldForecast}
                unit="%"
                description="Percentual do rendimento ideal esperado"
                lastUpdated={data.lastUpdated}
                type="yield"
            />
            <PredictiveMetricCard
                title="Próxima Irrigação"
                value={data.nextIrrigation}
                description="Data prevista para a próxima irrigação necessária"
                lastUpdated={data.lastUpdated}
                type="irrigation"
            />
            <PredictiveMetricCard
                title="Risco de Estresse Hídrico"
                value={data.waterStressRisk}
                description="Nível de risco baseado nas condições atuais e previstas"
                lastUpdated={data.lastUpdated}
                type="stress"
            />
            <PredictiveMetricCard
                title="Janela de Plantio Ideal"
                value={data.plantingWindow}
                description="Período previsto como ideal para o próximo plantio"
                lastUpdated={data.lastUpdated}
                type="planting"
            />
            <PredictiveMetricCard
                title="Alerta de Pragas"
                value={data.pestRisk}
                description="Nível de risco atual para o surgimento de pragas comuns"
                lastUpdated={data.lastUpdated}
                type="pest"
            />
        </div>

        <div className='flex flex-row space-x-12 mt-16'>
          <WeatherAlert />

          <AgriculturalMetricsRadar />
        </div>

        <div className='mt-12'>
          <AgricultureImageAnalysis />
        </div>

        <IAgrixiAssistant />
    </div>
  );
};

export default PredictiveAnalysisBoard;