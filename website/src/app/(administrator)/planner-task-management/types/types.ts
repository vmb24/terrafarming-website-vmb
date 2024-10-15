// types/soil.ts
  
export interface SoilMoisturePlan {
  plan: {
    createdAt: number;
    planId: string;
    moisture: number;
    recommendations: string;
    status: string;
    timestamp: number;
  };
  planId: string;
  moisture: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}
  
export interface SoilTemperaturePlan {
  plan: string;
  planId: string;
  createdAt: string;
  temperature: number;
  updatedAt: string;
  status: string;
}

export interface BrightnessPlan {
  plan: string;
  planId: string;
  createdAt: string;
  brightness: number;
  updatedAt: string;
  status: string;
}

export interface AirTemperaturePlan {
  plan: string;
  planId: string;
  createdAt: string;
  airTemperature: number;
  updatedAt: string;
  status: string;
}

export interface AirMoisturePlan {
  plan: string;
  planId: string;
  createdAt: string;
  airMoisture: number;
  updatedAt: string;
  status: string;
}
  
  export interface MoistureRecommendations {
    [key: string]: string;
  }
  
  export interface TemperatureRecommendations {
    [key: string]: string;
  }