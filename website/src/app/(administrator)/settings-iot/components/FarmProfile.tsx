import React from 'react';

const FarmProfile: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Perfil da Fazenda</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome da Fazenda
          </label>
          <input
            type="text"
            id="farmName"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="Nome da sua fazenda"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Localização
          </label>
          <input
            type="text"
            id="location"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="Cidade, Estado"
          />
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tamanho da Fazenda (hectares)
          </label>
          <input
            type="number"
            id="size"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="mainCrops" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Principais Culturas
          </label>
          <input
            type="text"
            id="mainCrops"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="Ex: Soja, Milho, Trigo"
          />
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Salvar Perfil da Fazenda
        </button>
      </div>
    </div>
  );
};

export default FarmProfile;