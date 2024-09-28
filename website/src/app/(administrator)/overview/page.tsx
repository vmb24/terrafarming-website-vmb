// page.tsx (Overview)
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SoilCard from './components/SoilCard';
import RecommendationCard from './components/RecommendationCard';
import PredictionTool from './components/PredictionTool';
import AirQualityIndex from './components/AirQualityIndex';

import { SoilMoisture, SoilTemperature, AirData, Luminosity } from './types/soil'

import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Overview: React.FC = () => {
    const [moisture, setMoisture] = useState<SoilMoisture | null>(null);
    const [soilTemperature, setSoilTemperature] = useState<SoilTemperature | null>(null);
    const [airData, setAirData] = useState<AirData | null>(null);
    const [luminosity, setLuminosity] = useState<Luminosity | null>(null);
    
    const [airQualityIndex, setAirQualityIndex] = useState<number | null>(null);
    const [cropDistribution, setCropDistribution] = useState({
        labels: ['Sem dados'],
        data: [1]
    });
    const [recommendations, setRecommendations] = useState<string[]>([]);

    const [historicalData, setHistoricalData] = useState<any>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const moistureResponse = await axios.get<SoilMoisture>('https://81dkc5z9yd.execute-api.us-east-1.amazonaws.com/prod/moisture');
          setMoisture(moistureResponse.data);
  
          const soilTempResponse = await axios.get<SoilTemperature>('https://uphc1w9gfc.execute-api.us-east-1.amazonaws.com/prod/temperature');
          setSoilTemperature(soilTempResponse.data);

          // const airDataResponse = await axios.get<AirData>('https://your-api/prod/air');
          // setAirData(airDataResponse.data);

          // const luminosityResponse = await axios.get<Luminosity>('https://your-api/prod/luminosity');
          // setLuminosity(luminosityResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setMoisture(null);
          setSoilTemperature(null);
          setAirData(null);
          setLuminosity(null);
        }
      };
      fetchData();

      const fetchHistoricalData = async () => {
        try {
          const response = await axios.get('https://your-api/prod/historical-data');
          setHistoricalData(response.data);
        } catch (error) {
          console.error('Error fetching historical data:', error);
        }
      };
      fetchHistoricalData();
      
      const fetchAdditionalData = async () => {
        try {
            const aqiResponse = await axios.get('https://api.example.com/air-quality-index');
            setAirQualityIndex(aqiResponse.data.index);

            const cropResponse = await axios.get('https://api.example.com/crop-distribution');
            if (cropResponse.data && cropResponse.data.labels && cropResponse.data.data) {
                setCropDistribution(cropResponse.data);
            }

            const recResponse = await axios.get('https://api.example.com/recommendations');
            setRecommendations(recResponse.data);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };
    fetchAdditionalData();
      
    }, []);

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Dados Históricos',
        },
      },
    };

    const chartData = {
      labels: historicalData?.labels || [],
      datasets: [
        {
          label: 'Umidade do Solo',
          data: historicalData?.soilMoisture || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Temperatura do Solo',
          data: historicalData?.soilTemperature || [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        // Adicione mais datasets para os outros tipos de dados
      ],
    };

    const pieData = {
      labels: cropDistribution.labels,
      datasets: [
          {
              data: cropDistribution.data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
              ],
          },
      ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Distribuição de Culturas',
            },
        },
    };
  
  return (
    <div className="px-4 mt-[-80px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              <SoilCard
                title="Umidade do Solo"
                value={moisture?.moisture ?? null}
                unit="%"
                status={moisture?.status ?? null}
                date={moisture?.timestamp ?? null}
              />
              <SoilCard
                title="Temperatura do Solo"
                value={soilTemperature?.temperature ?? null}
                unit="°C"
                status={soilTemperature?.status ?? null}
                date={soilTemperature?.timestamp ?? null}
              />
              <SoilCard
                title="Luminosidade"
                value={luminosity?.luminosity ?? null}
                unit="lux"
                status={luminosity?.status ?? null}
                date={luminosity?.timestamp ?? null}
              />
              <SoilCard
                title="Temperatura do Ar"
                value={airData?.temperature ?? null}
                unit="°C"
                status={airData?.tempStatus ?? null}
                date={airData?.timestamp ?? null}
              />
              <SoilCard
                title="Umidade do Ar"
                value={airData?.humidity ?? null}
                unit="%"
                status={airData?.humidityStatus ?? null}
                date={airData?.timestamp ?? null}
              />
            </div>
            
            <div className="grid grid-cols-1 mt-20 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white h-[500px] p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Dados Históricos</h2>
                    <Line options={chartOptions} data={chartData} />
                </div>
                <div className="bg-white h-[500px] p-4 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-xl font-bold mb-4">Distribuição de Culturas</h2>
                    <div className="flex-grow flex items-center justify-center">
                        <div style={{ width: '80%', height: '80%' }}>
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                    </div>
                </div>
            </div>
            
            <PredictionTool />

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Recomendações</h2>
                    {recommendations.map((rec, index) => (
                        <RecommendationCard key={index} recommendation={rec} />
                    ))}
                </div>
            </div>

            <AirQualityIndex aqi={airQualityIndex} /> */}
        </div>
    );
};

export default Overview;