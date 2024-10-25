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

export interface AirMoisture {
  moisture: number;
  status: string;
  timestamp: string;
}

export interface AirTemperature {
  temperature: number;
  status: string;
  timestamp: string;
}

export interface Brightness {
  brightness: number;
  status: string;
  timestamp: string;
}