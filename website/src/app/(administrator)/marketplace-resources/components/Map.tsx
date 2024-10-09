// Map.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from './MapContext';
import { Recommendation } from './types/types';
import { useTheme } from 'next-themes';

mapboxgl.accessToken = 'pk.eyJ1Ijoidm1iMjQiLCJhIjoiY20xdjRhZjV3MDd4ZDJxcTFzNGRtM2R0YSJ9.UwitYZ7cvBiFngM7UWmcdg';

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const { theme } = useTheme();
  
  const { 
    map: mapRef,
    setMap, 
    userLocation, 
    setUserLocation, 
    selectedRecommendation, 
    recommendations, 
    setRecommendations
  } = useMap();

  useEffect(() => {
    if (mapContainer.current && !mapInstance) {
      console.log('Initializing map');
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: theme === 'dark' 
          ? 'mapbox://styles/mapbox/dark-v10'
          : 'mapbox://styles/vmb24/cm1v4ecjg008y01pd9zu3hq4f',
        center: [-46.6333, -23.5505],
        zoom: 11
      });
  
      setMapInstance(newMap);
      setMap(newMap);
  
      newMap.on('load', () => {
        console.log('Map loaded');
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { longitude, latitude } = position.coords;
            setUserLocation([longitude, latitude]);
            newMap.setCenter([longitude, latitude]);
            
            // Adiciona o marcador do usuário
            new mapboxgl.Marker({ color: '#FF0000' })
              .setLngLat([longitude, latitude])
              .setPopup(new mapboxgl.Popup().setHTML("<h3>Sua localização</h3>"))
              .addTo(newMap);
  
            // Set mock recommendations
            const mockRecommendations: Recommendation[] = [
              { id: '1', crop: 'Milho', price: 25, estimatedTime: 70, location: 'Moema', color: 'bg-purple-500', coordinates: [-46.6633, -23.5905], name: 'Milho Moema', description: 'Milho fresco de Moema', storeCoordinates: [-46.6630, -23.5900], storeName: 'Loja de Milho Moema', imageUrl: '/images/corn.png' },
              { id: '2', crop: 'Tomate', price: 25, estimatedTime: 60, location: 'Pinheiros', color: 'bg-yellow-500', coordinates: [-46.6847, -23.5642], name: 'Tomate Pinheiros', description: 'Tomates orgânicos de Pinheiros', storeCoordinates: [-46.6845, -23.5640], storeName: 'Loja de Tomate Pinheiros', imageUrl: '/images/tomato.png' },
              { id: '3', crop: 'Alface', price: 20, estimatedTime: 60, location: 'Vila Madalena', color: 'bg-blue-500', coordinates: [-46.6869, -23.5559], name: 'Alface Vila Madalena', description: 'Alface crespa de Vila Madalena', storeCoordinates: [-46.6865, -23.5555], storeName: 'Loja de Alface Vila Madalena', imageUrl: '/images/lettuce.png' },
              { id: '4', crop: 'Cenoura', price: 20, estimatedTime: 50, location: 'Itaim Bibi', color: 'bg-green-500', coordinates: [-46.6751, -23.5858], name: 'Cenoura Itaim Bibi', description: 'Cenouras frescas de Itaim Bibi', storeCoordinates: [-46.6749, -23.5855], storeName: 'Loja de Cenoura Itaim Bibi', imageUrl: '/images/carrot.png' },
              { id: '5', crop: 'Batata', price: 20, estimatedTime: 40, location: 'Jardins', color: 'bg-blue-500', coordinates: [-46.6588, -23.5689], name: 'Batata Jardins', description: 'Batatas da região dos Jardins', storeCoordinates: [-46.6585, -23.5685], storeName: 'Loja de Batata Jardins', imageUrl: '/images/potato.png' },
            ];
  
            setRecommendations(mockRecommendations);
  
            // Adiciona marcadores das lojas com popups personalizados
            mockRecommendations.forEach(rec => {
              const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div style="width: 200px; padding: 10px; border-radius: 5px; background-color: white;">
                  <img src="${rec.imageUrl}" alt="${rec.name}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px;">
                  <h3 style="margin-top: 10px; font-weight: bold;">${rec.name}</h3>
                  <p>${rec.description}</p>
                  <p>Preço: R$ ${rec.price.toFixed(2)}</p>
                  <p>Tempo estimado: ${rec.estimatedTime} min</p>
                </div>
              `);

              new mapboxgl.Marker({ color: '#00FF00' })
                .setLngLat(rec.storeCoordinates)
                .setPopup(popup)
                .addTo(newMap);
            });
          }, () => {
            console.error('Geolocation not available');
          });
        }
      });
  
      return () => {
        newMap.remove();
      };
    }
  }, [theme]);

  useEffect(() => {
    if (mapInstance && theme) {
      mapInstance.setStyle(
        theme === 'dark'
          ? 'mapbox://styles/mapbox/dark-v10'
          : 'mapbox://styles/vmb24/cm1v4ecjg008y01pd9zu3hq4f'
      );
    }
  }, [mapInstance, theme]);

  useEffect(() => {
    if (mapInstance && selectedRecommendation && userLocation) {
      console.log('Updating route for selected recommendation');
      // Remove existing route layer and source if they exist
      if (mapInstance.getLayer('route')) mapInstance.removeLayer('route');
      if (mapInstance.getSource('route')) mapInstance.removeSource('route');

      // Get directions from Mapbox Directions API
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${selectedRecommendation.storeCoordinates[0]},${selectedRecommendation.storeCoordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      )
        .then(response => response.json())
        .then(data => {
          const route = data.routes[0].geometry.coordinates;
          const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          };

          // Add the route to the map
          if (mapInstance.isStyleLoaded()) {
            addRouteToMap(mapInstance, geojson);
          } else {
            mapInstance.once('style.load', () => {
              addRouteToMap(mapInstance, geojson);
            });
          }
          
          // Adjust the map view to show the entire route
          const bounds = new mapboxgl.LngLatBounds()
            .extend(userLocation)
            .extend(selectedRecommendation.storeCoordinates);
          mapInstance.fitBounds(bounds, { padding: 50 });
        })
        .catch(error => {
          console.error('Error fetching directions:', error);
          alert('Não foi possível obter as direções. Por favor, tente novamente.');
        });
    }
  }, [mapInstance, selectedRecommendation, userLocation]);

  const addRouteToMap = (map: mapboxgl.Map, geojson: any) => {
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
        'line-color': theme === 'dark' ? '#ffffff' : '#888888',
        'line-width': 8
      }
    });
  };

  return <div ref={mapContainer} style={{ width: '100%', height: '600px' }} />;
};

export default Map;