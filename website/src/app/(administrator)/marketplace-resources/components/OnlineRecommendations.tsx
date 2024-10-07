// OnlineRecommendations.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface OnlineStore {
  id: string;
  name: string;
  products: string[];
  rating: number;
  deliveryTime: string;
}

const productImages: { [key: string]: string } = {
  'Tomate': '/images/marketplace/tomato.png',
  'Alface': '/images/marketplace/lettuce.png',
  'Cenoura': '/images/marketplace/carrot.png',
  'Milho': '/images/marketplace/generic-fruits.png',
  'Batata': '/images/marketplace/generic-fruits.png',
  'Pimentão': '/images/marketplace/bell-pepper.png',
  'Morango': '/images/marketplace/strawberry.png',
  'Rúcula': '/images/marketplace/generic-fruits.png',
  'Espinafre': '/images/marketplace/generic-fruits.png',
  'Uva': '/images/marketplace/grapes.png',
};

const OnlineRecommendations: React.FC = () => {
  const [onlineStores, setOnlineStores] = useState<OnlineStore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await fetch('URL_DO_SEU_ENDPOINT_API_GATEWAY');
        const data = await response.json();
        setOnlineStores(data);
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
        setOnlineStores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const getStoreImage = (products: string[]) => {
    const firstProduct = products[0];
    return productImages[firstProduct] || '/images/marketplace/shopping.png';
  };

  if (loading) {
    return <div className="text-center py-8">Carregando recomendações...</div>;
  }

  if (onlineStores.length === 0) {
    return (
      <div className="text-center py-8 text-lg text-gray-600">
        Sem recomendações online.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {onlineStores.map(store => (
        <div key={store.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
          <div className="mb-4 h-48 relative">
            <Image 
              src={getStoreImage(store.products)}
              alt={store.name} 
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
          <p className="text-sm text-gray-600 mb-2">Produtos: {store.products.join(', ')}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{store.rating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-600">Entrega em: {store.deliveryTime}</p>
          <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300 self-start">
            Ver produtos
          </button>
        </div>
      ))}
    </div>
  );
};

export default OnlineRecommendations;