import React from 'react';

const PersonalProfile: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Perfil Pessoal</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="seu.email@exemplo.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="(00) 00000-0000"
          />
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default PersonalProfile;