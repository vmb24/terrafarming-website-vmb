'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MetricCard from './components/MetricCard';
import WeeklyTasksOverview from './components/WeeklyTasksOverview';

import { SoilMoisture, SoilTemperature, AirMoisture, AirTemperature, Brightness } from './types/metrics'
import MetricsHeatmap from './components/MetricsHeatmap';
import WorkflowDiagram from './components/WorkflowDiagram';
import AgrixiAssistant from '@/components/ui/agrixi-assistant/IAgrixiAssistant';
import TaskPlan from './components/TaskPlan';

interface HistoricalDataPoint {
  day: string;
  value: number;
  date: string;
}

interface HistoricalData {
  soilMoisture: HistoricalDataPoint[];
  soilTemperature: HistoricalDataPoint[];
  airMoisture: HistoricalDataPoint[];
  airTemperature: HistoricalDataPoint[];
  brightness: HistoricalDataPoint[];
}

const Overview: React.FC = () => {
  const [soilMoisture, setSoilMoisture] = useState<SoilMoisture | null>(null);
  const [soilTemperature, setSoilTemperature] = useState<SoilTemperature | null>(null);
  const [airMoisture, setAirMoisture] = useState<AirMoisture | null>(null);
  const [airTemperature, setAirTemperature] = useState<AirTemperature | null>(null);
  const [brightness, setbrightness] = useState<Brightness | null>(null);
  
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const soilMoistureResponse = await axios.get<SoilMoisture>('https://i5rquoloa9.execute-api.us-east-1.amazonaws.com/prod/moisture');
        setSoilMoisture(soilMoistureResponse.data);

        const soilTemperatureResponse = await axios.get<SoilTemperature>('https://7yz5zq6a2b.execute-api.us-east-1.amazonaws.com/prod/temperature');
        setSoilTemperature(soilTemperatureResponse.data);

        const airMoistureResponse = await axios.get<AirMoisture>('https://pbdjc21gnc.execute-api.us-east-1.amazonaws.com/prod/moisture');
        setAirMoisture(airMoistureResponse.data);

        const airTemperatureResponse = await axios.get<AirTemperature>('https://kpb4zkkjhf.execute-api.us-east-1.amazonaws.com/prod/temperature');
        // setAirTemperature(airTemperatureResponse.data);

        const brightnessResponse = await axios.get<Brightness>('https://97j8ed04m3.execute-api.us-east-1.amazonaws.com/prod/brightness');
        setbrightness(brightnessResponse.data);
        
        // Chamada para a API de dados históricos
        // const historicalDataResponse = await axios.get<HistoricalData>('URL_DA_API_DE_DADOS_HISTORICOS');
        // setHistoricalData(historicalDataResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

return (
  <div className="px-4 mt-[-80px]">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      <MetricCard
        title="Umidade do Solo"
        value={soilMoisture?.moisture ?? null}
        unit="%"
        status={soilMoisture?.status || "Não disponível"}
        date={soilMoisture?.timestamp || "Data não disponível"}
        max={100}
        type="soil-moisture"
      />
      <MetricCard
        title="Temperatura do Solo"
        value={soilTemperature?.temperature ?? null}
        unit="°C"
        status={soilTemperature?.status || "Não disponível"}
        date={soilTemperature?.timestamp || "Data não disponível"}
        max={100}
        type="soil-temperature"
      />
      <MetricCard
        title="Luminosidade"
        value={brightness?.brightness ?? null}
        unit="lux"
        status={brightness?.status || "Não disponível"}
        date={brightness?.timestamp || "Data não disponível"}
        max={100000}
        type="brightness"
      />
      <MetricCard
        title="Temperatura do Ar"
        value={airTemperature?.temperature ?? null}
        unit="°C"
        status={airTemperature?.status || "Não disponível"}
        date={airTemperature?.timestamp || "Data não disponível"}
        max={50}
        type="air-temperature"
      />
      <MetricCard
        title="Umidade do Ar"
        value={airMoisture?.moisture ?? null}
        unit="%"
        status={airMoisture?.status || "Não disponível"}
        date={airMoisture?.timestamp || "Data não disponível"}
        max={100}
        type="air-moisture"
      />
    </div>

    <WeeklyTasksOverview />

    {/* <MetricsHeatmap /> */}

    <WorkflowDiagram />

    <AgrixiAssistant />
  </div>
  );
};

export default Overview;