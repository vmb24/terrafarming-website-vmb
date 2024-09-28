// types/soil.ts
  
  export interface MoisturePlan {
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
  
  export interface TemperaturePlan {
    plan: string;
    planId: string;
    createdAt: string;
    temperature: number;
    updatedAt: string;
    status: string;
  }
  
  export interface MoistureRecommendations {
    [key: string]: string;
  }
  
  export interface TemperatureRecommendations {
    [key: string]: string;
  }