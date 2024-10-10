// AuxiliaryProductsList.tsx
'use client'
import React from 'react';
import { useMap } from './MapContext';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const AuxiliaryProductsList: React.FC = () => {
  const { auxiliaryProducts, setSelectedAuxiliaryProduct } = useMap();
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark';

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-md mt-2`}>
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-xl font-semibold">Produtos Auxiliares Recomendados</h2>
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}>{auxiliaryProducts.length} produtos</span>
      </div>
      <div className="space-y-4 h-[550px] overflow-y-auto px-4">
        {auxiliaryProducts.map(product => (
          <div 
            key={product.id} 
            className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow cursor-pointer transition-colors duration-200 overflow-hidden`} 
            onClick={() => setSelectedAuxiliaryProduct(product)}
          >
            <div className="relative">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                width={300} 
                height={150} 
                className="w-full h-36 object-cover"
              />
              <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center">
                <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded">{product.store}</span>
              </div>
            </div>
            <div className="p-3">
              <div className="font-semibold">{product.name}</div>
              <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mt-2`}>
                <span>{product.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuxiliaryProductsList;