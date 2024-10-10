// MapContext.tsx
'use client'
import React, { createContext, useState, useContext, ReactNode, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Recommendation, AuxiliaryProduct } from './types/types';

interface MapContextType {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  setMap: (map: mapboxgl.Map | null) => void;
  userLocation: [number, number] | null;
  setUserLocation: (location: [number, number] | null) => void;
  selectedRecommendation: Recommendation | null;
  setSelectedRecommendation: (recommendation: Recommendation | null) => void;
  recommendations: Recommendation[];
  setRecommendations: (recommendations: Recommendation[]) => void;
  selectedAuxiliaryProduct: AuxiliaryProduct | null;
  setSelectedAuxiliaryProduct: (auxiliaryProduct: AuxiliaryProduct | null) => void;
  auxiliaryProducts: AuxiliaryProduct[];
  setAuxiliaryProducts: (auxiliaryProduct: AuxiliaryProduct[]) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedAuxiliaryProduct, setSelectedAuxiliaryProduct] = useState<AuxiliaryProduct | null>(null);
  const [auxiliaryProducts, setAuxiliaryProducts] = useState<AuxiliaryProduct[]>([]);

  const setMap = (map: mapboxgl.Map | null) => {
    mapRef.current = map;
  };

  return (
    <MapContext.Provider value={{
      map: mapRef,
      setMap,
      userLocation,
      setUserLocation,
      selectedRecommendation,
      setSelectedRecommendation,
      recommendations,
      setRecommendations,
      selectedAuxiliaryProduct,
      setSelectedAuxiliaryProduct,
      auxiliaryProducts,
      setAuxiliaryProducts,
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};