'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MetricCard from './components/MetricCard';
import MetricActivityCard from './components/MetricActivityCard';
import WeeklyTasksOverview from './components/WeeklyTasksOverview';
import PlanMap from './components/PlanMap';

import { SoilMoisture, SoilTemperature, AirHumidity, AirTemperature, Luminosity } from './types/metrics'
import MetricsHeatmap from './components/MetricsHeatmap';
import WorkflowDiagram from './components/WorkflowDiagram';

interface HistoricalDataPoint {
  day: string;
  value: number;
  date: string;
}

interface HistoricalData {
  soilMoisture: HistoricalDataPoint[];
  soilTemperature: HistoricalDataPoint[];
  airHumidity: HistoricalDataPoint[];
  airTemperature: HistoricalDataPoint[];
  luminosity: HistoricalDataPoint[];
}

const Overview: React.FC = () => {
  const [soilMoisture, setSoilMoisture] = useState<SoilMoisture | null>(null);
  const [soilTemperature, setSoilTemperature] = useState<SoilTemperature | null>(null);
  const [airHumidity, setAirHumidity] = useState<AirHumidity | null>(null);
  const [airTemperature, setAirTemperature] = useState<AirTemperature | null>(null);
  const [luminosity, setLuminosity] = useState<Luminosity | null>(null);
  
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const soilMoistureResponse = await axios.get<SoilMoisture>('https://81dkc5z9yd.execute-api.us-east-1.amazonaws.com/prod/moisture');
        setSoilMoisture(soilMoistureResponse.data);

        const soilTemperatureResponse = await axios.get<SoilTemperature>('https://uphc1w9gfc.execute-api.us-east-1.amazonaws.com/prod/temperature');
        setSoilTemperature(soilTemperatureResponse.data);

        // Aqui você deve fazer as chamadas reais para as outras APIs
        const airHumidityResponse = await axios.get<AirHumidity>('URL_DA_API_DE_UMIDADE_DO_AR');
        setAirHumidity(airHumidityResponse.data);

        const airTemperatureResponse = await axios.get<AirTemperature>('URL_DA_API_DE_TEMPERATURA_DO_AR');
        setAirTemperature(airTemperatureResponse.data);

        const luminosityResponse = await axios.get<Luminosity>('URL_DA_API_DE_LUMINOSIDADE');
        setLuminosity(luminosityResponse.data);
        
        // Chamada para a API de dados históricos
        const historicalDataResponse = await axios.get<HistoricalData>('URL_DA_API_DE_DADOS_HISTORICOS');
        setHistoricalData(historicalDataResponse.data);

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
        value={luminosity?.luminosity ?? null}
        unit="lux"
        status={luminosity?.status || "Não disponível"}
        date={luminosity?.timestamp || "Data não disponível"}
        max={10000}
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
        value={airHumidity?.humidity ?? null}
        unit="%"
        status={airHumidity?.status || "Não disponível"}
        date={airHumidity?.timestamp || "Data não disponível"}
        max={100}
        type="air-moisture"
      />
    </div>

    <WeeklyTasksOverview />

    <MetricsHeatmap />

    <WorkflowDiagram />
  </div>
  );
};

export default Overview;