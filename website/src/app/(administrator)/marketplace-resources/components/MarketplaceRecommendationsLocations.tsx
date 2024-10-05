'use client'
import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoJSON } from 'geojson';

mapboxgl.accessToken = 'pk.eyJ1Ijoidm1iMjQiLCJhIjoiY20xdjRhZjV3MDd4ZDJxcTFzNGRtM2R0YSJ9.UwitYZ7cvBiFngM7UWmcdg';

interface Recommendation {
  id: string;
  crop: string;
  price: number;
  estimatedTime: number;
  location: string;
  color: string;
  coordinates: [number, number];
  name: string;
  description: string;
  storeCoordinates: [number, number];
  storeName: string;
}

const MarketplaceRecommendationsLocations: React.FC = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
        initializeMap([longitude, latitude]);
      }, () => {
        initializeMap([-46.6333, -23.5505]); // Default to São Paulo if geolocation is not available
      });
    } else {
      initializeMap([-46.6333, -23.5505]); // Default to São Paulo if geolocation is not supported
    }
  }, []);

  const initializeMap = (center: [number, number]) => {
    const initializeMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/vmb24/cm1v4ecjg008y01pd9zu3hq4f',
      center: center,
      zoom: 11
    });

    setMap(initializeMap);

    initializeMap.on('load', () => {
      if (userLocation) {
        new mapboxgl.Marker({ color: '#FF0000' })
          .setLngLat(userLocation)
          .setPopup(new mapboxgl.Popup().setHTML("<h3>Sua localização</h3>"))
          .addTo(initializeMap);
      }
    });

    // Updated mock recommendations to include store information
    const mockRecommendations: Recommendation[] = [
      { id: '1', crop: 'Milho', price: 25, estimatedTime: 70, location: 'Moema', color: 'bg-purple-500', coordinates: [-46.6633, -23.5905], name: 'Milho Moema', description: 'Milho fresco de Moema', storeCoordinates: [-46.6630, -23.5900], storeName: 'Loja de Milho Moema' },
      { id: '2', crop: 'Tomate', price: 25, estimatedTime: 60, location: 'Pinheiros', color: 'bg-yellow-500', coordinates: [-46.6847, -23.5642], name: 'Tomate Pinheiros', description: 'Tomates orgânicos de Pinheiros', storeCoordinates: [-46.6845, -23.5640], storeName: 'Loja de Tomate Pinheiros' },
      { id: '3', crop: 'Alface', price: 20, estimatedTime: 60, location: 'Vila Madalena', color: 'bg-blue-500', coordinates: [-46.6869, -23.5559], name: 'Alface Vila Madalena', description: 'Alface crespa de Vila Madalena', storeCoordinates: [-46.6865, -23.5555], storeName: 'Loja de Alface Vila Madalena' },
      { id: '4', crop: 'Cenoura', price: 20, estimatedTime: 50, location: 'Itaim Bibi', color: 'bg-green-500', coordinates: [-46.6751, -23.5858], name: 'Cenoura Itaim Bibi', description: 'Cenouras frescas de Itaim Bibi', storeCoordinates: [-46.6749, -23.5855], storeName: 'Loja de Cenoura Itaim Bibi' },
      { id: '5', crop: 'Batata', price: 20, estimatedTime: 40, location: 'Jardins', color: 'bg-blue-500', coordinates: [-46.6588, -23.5689], name: 'Batata Jardins', description: 'Batatas da região dos Jardins', storeCoordinates: [-46.6585, -23.5685], storeName: 'Loja de Batata Jardins' },
    ];

    setRecommendations(mockRecommendations);

    // Add store markers
    mockRecommendations.forEach(rec => {
      new mapboxgl.Marker({ color: '#00FF00' })
        .setLngLat(rec.storeCoordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${rec.storeName}</h3>`))
        .addTo(initializeMap);
    });

    return () => initializeMap.remove();
  };

  const handleRecommendationSelect = async (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
    if (map && userLocation) {
      // Remove existing route layer if it exists
      if (map.getLayer('route')) {
        map.removeLayer('route');
      }
      if (map.getSource('route')) {
        map.removeSource('route');
      }

      try {
        // Get directions from Mapbox Directions API
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${recommendation.storeCoordinates[0]},${recommendation.storeCoordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;

        const geojson: GeoJSON = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };

        // Add the route to the map
        map.addSource('route', {
          type: 'geojson',
          data: geojson
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#888',
            'line-width': 8
          }
        });

        // Adjust the map view to show the entire route
        const bounds = new mapboxgl.LngLatBounds()
          .extend(userLocation)
          .extend(recommendation.storeCoordinates);
        map.fitBounds(bounds, { padding: 50 });

        // Display recommendation info
        displayRecommendationInfo(recommendation, data.duration, data.distance);
      } catch (error) {
        console.error('Error fetching directions:', error);
        alert('Não foi possível obter as direções. Por favor, tente novamente.');
      }
    } else {
      console.error('Mapa ou localização do usuário não disponível');
      alert('Não foi possível obter sua localização. Por favor, verifique as permissões de localização e tente novamente.');
    }
  };
  
  // Function to display recommendation info
  const displayRecommendationInfo = (recommendation: Recommendation, duration: number, distance: number) => {
    const infoElement = document.getElementById('recommendation-info');
    if (infoElement) {
      infoElement.innerHTML = `
        <h3>${recommendation.name}</h3>
        <p>Preço: R$ ${recommendation.price.toFixed(2)}</p>
        <p>Descrição: ${recommendation.description}</p>
        <p>Loja: ${recommendation.storeName}</p>
        <p>Tempo estimado de viagem: ${Math.round(duration / 60)} minutos</p>
        <p>Distância: ${(distance / 1000).toFixed(2)} km</p>
      `;
    }
  };
  
  return (
    <div className="bg-white -mt-20 rounded-md p-4">
      <div className="flex mb-4 space-x-2">
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 font-semibold">Pickup</button>
        <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold">Delivery</button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 font-semibold">Table reservation</button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 font-semibold">Dine in</button>
      </div>
      <div className="flex">
        <div className="w-1/3 pr-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recomendações</h2>
            <span className="text-gray-500">{recommendations.length} áreas</span>
            <button className="p-2 bg-indigo-900 text-white rounded-full">+</button>
          </div>
          <div className="space-y-4">
            {recommendations.map(recommendation => (
              <div key={recommendation.id} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4 cursor-pointer" onClick={() => handleRecommendationSelect(recommendation)}>
                <div className={`w-1 h-16 rounded-full ${recommendation.color}`}></div>
                <div className="flex-grow">
                  <div className="font-semibold">{recommendation.crop}</div>
                  <div className="text-sm text-gray-500">{recommendation.location}</div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>R${recommendation.price.toFixed(2)}</span>
                    <span>{recommendation.estimatedTime} min</span>
                  </div>
                </div>
                <button className="p-2 bg-gray-200 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div id="map" className="w-2/3 h-[600px] rounded-lg"></div>
      </div>
      <div id="recommendation-info" className="mt-4"></div>
    </div>
  );
};

export default MarketplaceRecommendationsLocations;