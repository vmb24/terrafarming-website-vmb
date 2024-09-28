// types/soil.ts

export interface SoilMoisture {
  moisture: number;
  status: string;
  timestamp: string;
}

export interface SoilTemperature {
  temperature: number;
  status: string;
  timestamp: string;
}
  
  export interface AirData {
    temperature: number;
    humidity: number;
    tempStatus: string;
    humidityStatus: string;
    timestamp: string;
  }
  
  export interface Luminosity {
    luminosity: number;
    status: string;
    timestamp: string;
  }