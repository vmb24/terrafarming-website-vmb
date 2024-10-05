// ./types/soil.ts

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

export interface AirHumidity {
  humidity: number;
  status: string;
  timestamp: string;
}

export interface AirTemperature {
  temperature: number;
  status: string;
  timestamp: string;
}

export interface Luminosity {
  luminosity: number;
  status: string;
  timestamp: string;
}