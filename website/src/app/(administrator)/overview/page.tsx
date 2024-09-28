// page.tsx (Overview)
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SoilCard from './components/SoilCard';
import { SoilMoisture, SoilTemperature } from './types/soil'

const Overview: React.FC = () => {
    const [moisture, setMoisture] = useState<SoilMoisture | null>(null);
    const [temperature, setTemperature] = useState<SoilTemperature | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const moistureResponse = await axios.get<SoilMoisture>('https://81dkc5z9yd.execute-api.us-east-1.amazonaws.com/prod/moisture');
          setMoisture(moistureResponse.data);
  
          const temperatureResponse = await axios.get<SoilTemperature>('https://81dkc5z9yd.execute-api.us-east-1.amazonaws.com/prod/temperature');
          setTemperature(temperatureResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setMoisture(null);
          setTemperature(null);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <div className="px-4 mt-[-80px]">
          <div className="flex justify-between max-w-2xl">
            <SoilCard
              title="Umidade do Solo"
              value={moisture?.moisture}
              unit="%"
              status={moisture?.status}
              date={moisture?.timestamp}
            />
            <SoilCard
              title="Temperatura do Solo"
              value={temperature?.temperature}
              unit="°C"
              status={temperature?.status}
              date={temperature?.timestamp}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Overview;