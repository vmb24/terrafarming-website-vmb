'use client'
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from './MapContext';
import { Recommendation, AuxiliaryProduct } from './types/types';
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
    setRecommendations,
    selectedAuxiliaryProduct,
    setSelectedAuxiliaryProduct,
    auxiliaryProducts,
    setAuxiliaryProducts,
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
              .addTo(newMap);
  
            // Set mock recommendations
            const mockRecommendations: Recommendation[] = [
              { id: '1', crop: 'Milho', price: 25, estimatedTime: 70, location: 'Moema', color: 'bg-purple-500', coordinates: [-46.6633, -23.5905], name: 'Milho Moema', description: 'Milho fresco de Moema', storeCoordinates: [-46.6630, -23.5900], storeName: 'Loja de Milho Moema', imageUrl: '/images/corn.png', rating: '4.8' },
              { id: '2', crop: 'Tomate', price: 25, estimatedTime: 60, location: 'Pinheiros', color: 'bg-yellow-500', coordinates: [-46.6847, -23.5642], name: 'Tomate Pinheiros', description: 'Tomates orgânicos de Pinheiros', storeCoordinates: [-46.6845, -23.5640], storeName: 'Loja de Tomate Pinheiros', imageUrl: '/images/tomato.png', rating: '4.6' },
              { id: '3', crop: 'Alface', price: 20, estimatedTime: 60, location: 'Vila Madalena', color: 'bg-blue-500', coordinates: [-46.6869, -23.5559], name: 'Alface Vila Madalena', description: 'Alface crespa de Vila Madalena', storeCoordinates: [-46.6865, -23.5555], storeName: 'Loja de Alface Vila Madalena', imageUrl: '/images/lettuce.png', rating: '4.5' },
              { id: '4', crop: 'Cenoura', price: 20, estimatedTime: 50, location: 'Itaim Bibi', color: 'bg-green-500', coordinates: [-46.6751, -23.5858], name: 'Cenoura Itaim Bibi', description: 'Cenouras frescas de Itaim Bibi', storeCoordinates: [-46.6749, -23.5855], storeName: 'Loja de Cenoura Itaim Bibi', imageUrl: '/images/carrot.png', rating: '4.3' },
              { id: '5', crop: 'Batata', price: 20, estimatedTime: 40, location: 'Jardins', color: 'bg-blue-500', coordinates: [-46.6588, -23.5689], name: 'Batata Jardins', description: 'Batatas da região dos Jardins', storeCoordinates: [-46.6585, -23.5685], storeName: 'Loja de Batata Jardins', imageUrl: '/images/potato.png', rating: '4.2' },
            ];

            const mockAuxiliaryProductsMock: AuxiliaryProduct[] = [
              {
                id: '1',
                name: 'Fertilizante Orgânico',
                imageUrl: '/images/agriculture-products/fertilizer.png',
                store: 'AgroShop',
                date: '15 Mai 2023',
                coordinates: [-46.6533, -23.5605]
              },
              {
                id: '2',
                name: 'Sistema de Irrigação',
                imageUrl: '/images/agriculture-products/irrigation.png',
                store: 'HidroTech',
                date: '20 Mai 2023',
                coordinates: [-46.6633, -23.5705]
              },
              {
                id: '3',
                name: 'Sementes Selecionadas',
                imageUrl: '/images/agriculture-products/seeds.png',
                store: 'SementesPro',
                date: '25 Mai 2023',
                coordinates: [-46.6733, -23.5805]
              },
              {
                id: '4',
                name: 'Equipamento de Proteção',
                imageUrl: '/images/agriculture-products/epi.png',
                store: 'SafetyFirst',
                date: '30 Mai 2023',
                coordinates: [-46.6833, -23.5905]
              }
            ];
  
            setRecommendations(mockRecommendations);
            setAuxiliaryProducts(mockAuxiliaryProductsMock)
            
            // Add recommendation cards to the map
            mockRecommendations.forEach(recommendation => {
              addRecommendationCard(newMap, recommendation);
            });

            // Add auxiliary product cards to the map
            mockAuxiliaryProductsMock.forEach(auxiliaryProduct => {
              addAuxiliaryProductCard(newMap, auxiliaryProduct);
            });

            // Zoom to fit all recommendations and auxiliary products
            const bounds = new mapboxgl.LngLatBounds();
            mockRecommendations.forEach(rec => {
              bounds.extend(rec.storeCoordinates);
            });
            mockAuxiliaryProductsMock.forEach(aux => {
              bounds.extend(aux.coordinates);
            });
            newMap.fitBounds(bounds, { padding: 50 });
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

  const addRecommendationCard = (map: mapboxgl.Map, recommendation: Recommendation) => {
    const el = document.createElement('div');
    el.className = 'recommendation-card';
    el.style.backgroundColor = 'white';
    el.style.borderRadius = '8px';
    el.style.padding = '12px';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    el.style.width = '200px';
    el.style.fontSize = '14px';
    el.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <img src="${recommendation.imageUrl}" alt="${recommendation.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 12px;">
        <div style="flex-grow: 1;">
          <h3 style="margin: 0; font-weight: bold; font-size: 16px;">${recommendation.location}</h3>
          <p style="margin: 4px 0 0; color: #333; font-size: 13px;">${recommendation.description}</p>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: bold; color: #4CAF50;">R$ ${recommendation.price.toFixed(2)}</span>
        <span style="color: #666;">${recommendation.estimatedTime} min</span>
      </div>
    `;
  
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(recommendation.storeCoordinates)
      .addTo(map);
  };

  const addAuxiliaryProductCard = (map: mapboxgl.Map, auxiliaryProduct: AuxiliaryProduct) => {
    const el = document.createElement('div');
    el.className = 'auxiliary-product-card';
    el.style.backgroundColor = 'white';
    el.style.borderRadius = '8px';
    el.style.padding = '12px';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    el.style.width = '200px';
    el.style.fontSize = '14px';
    el.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <img src="${auxiliaryProduct.imageUrl}" alt="${auxiliaryProduct.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 12px;">
        <div style="flex-grow: 1;">
          <h3 style="margin: 0; font-weight: bold; font-size: 16px;">${auxiliaryProduct.name}</h3>
          <p style="margin: 4px 0 0; color: #333; font-size: 13px;">${auxiliaryProduct.store}</p>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #666;">${auxiliaryProduct.date}</span>
      </div>
    `;

    el.addEventListener('click', () => {
      setSelectedAuxiliaryProduct(auxiliaryProduct);
    });
  
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(auxiliaryProduct.coordinates)
      .addTo(map);
  };
  
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
    if (mapInstance && (selectedRecommendation || selectedAuxiliaryProduct) && userLocation) {
      console.log('Updating route for selected item');
      // Remove existing route layer and source if they exist
      if (mapInstance.getLayer('route')) mapInstance.removeLayer('route');
      if (mapInstance.getSource('route')) mapInstance.removeSource('route');

      const destinationCoordinates = selectedRecommendation
        ? selectedRecommendation.storeCoordinates
        : selectedAuxiliaryProduct?.coordinates;

      if (!destinationCoordinates) return;

      // Get directions from Mapbox Directions API
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
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
            .extend(destinationCoordinates);
          mapInstance.fitBounds(bounds, { padding: 50 });
        })
        .catch(error => {
          console.error('Error fetching directions:', error);
          alert('Não foi possível obter as direções. Por favor, tente novamente.');
        });
    }
  }, [mapInstance, selectedRecommendation, selectedAuxiliaryProduct, userLocation]);

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

  return <div ref={mapContainer} style={{ width: '100%', height: '600px', marginTop: '10px' }} />;
};

export default Map;