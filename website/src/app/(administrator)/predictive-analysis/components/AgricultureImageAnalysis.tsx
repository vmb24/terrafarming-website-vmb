'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faBug, faFlask, faSeedling, faWater, faSun, faTree, faCloudSun, faTimes, faImage, faHistory, faChartLine } from '@fortawesome/free-solid-svg-icons';

interface AnalysisResult {
  description: string;
  improvements: string;
}

interface HistoryItem extends AnalysisResult {
  imageUrl: string;
}

const factors = [
  { name: 'Saúde da planta', icon: faLeaf, color: '#4CAF50' },
  { name: 'Identificação de pragas', icon: faBug, color: '#FF5722' },
  { name: 'Deficiências nutricionais', icon: faFlask, color: '#9C27B0' },
  { name: 'Estágio de crescimento', icon: faSeedling, color: '#8BC34A' },
  { name: 'Qualidade do solo', icon: faWater, color: '#795548' },
  { name: 'Estresse hídrico', icon: faSun, color: '#FFC107' },
  { name: 'Cobertura foliar', icon: faTree, color: '#009688' },
  { name: 'Maturação da colheita', icon: faCloudSun, color: '#FF9800' }
];

const AgricultureImageAnalysis: React.FC = () => {
  const { theme } = useTheme();
  const [selectedFactor, setSelectedFactor] = useState<string>(factors[0].name);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = () => {
    if (!uploadedImage) return;

    const newResult = {
      description: "Descrição da análise da imagem...",
      improvements: "Sugestões de melhorias baseadas na análise..."
    };
    setAnalysisResult(newResult);
    
    setHistory(prevHistory => {
      const newHistory = [{ ...newResult, imageUrl: uploadedImage }, ...prevHistory];
      return newHistory.slice(0, 5);
    });
  };

  const handleImageDeselect = () => {
    setUploadedImage(null);
  };

  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
      <div className="max-w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <FontAwesomeIcon icon={faChartLine} className="mr-2" />
          Análise Preditiva de Imagens Agrícolas
        </h2>
        
        <div className="mb-4 flex flex-wrap items-center mt-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 w-full md:w-auto md:mr-2 mb-2 md:mb-0">Selecione o fator para análise</label>
          <select 
            className="block w-full md:w-auto pl-2 pr-8 py-1 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedFactor}
            onChange={(e) => setSelectedFactor(e.target.value)}
          >
            {factors.map((factor) => (
              <option key={factor.name} value={factor.name} style={{color: factor.color}}>
                <FontAwesomeIcon icon={factor.icon} className="mr-1" /> {factor.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-row space-x-3 mt-8'>
          <div className="mb-4 w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FontAwesomeIcon icon={faImage} className="mr-1" />
              Selecione a imagem para análise
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <div className="flex justify-center px-4 pt-3 pb-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors duration-200 h-64 bg-white dark:bg-gray-800">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FontAwesomeIcon icon={faImage} className="mr-1" />
              Imagem selecionada
            </label>
            <div className="h-64 border-2 border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center overflow-hidden bg-white dark:bg-gray-800">
              {uploadedImage ? (
                <div className="relative w-full h-full">
                  <Image src={uploadedImage} alt="Uploaded image" layout="fill" objectFit="cover" className="rounded-md" />
                  <button onClick={handleImageDeselect} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none">
                    <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <span className="text-gray-400">Nenhuma imagem selecionada</span>
              )}
            </div>
          </div>

          <div className="w-1/3 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
              <textarea 
                className="mt-1 block w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-28"
                value={analysisResult?.description || ""}
                readOnly
                placeholder="Descrição da análise da imagem..."
              />
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sugestões de Melhorias</label>
              <textarea 
                className="mt-1 block w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-28"
                value={analysisResult?.improvements || ""}
                readOnly
                placeholder="Sugestões de melhorias baseadas na análise..."
              />
            </div>
            <button
              onClick={handleAnalysis}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 h-10"
              disabled={!uploadedImage}
            >
              Analisar Imagem
            </button>
          </div>
        </div>

        <div className="mt-8 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            <FontAwesomeIcon icon={faHistory} className="mr-2" />
            Histórico de Análises
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {history.map((item, index) => (
              <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                <div className="h-28 mb-2 overflow-hidden rounded-md">
                  <Image src={item.imageUrl} alt={`Análise ${index + 1}`} width={150} height={150} objectFit="cover" />
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 overflow-ellipsis overflow-hidden flex-grow">{item.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 overflow-ellipsis overflow-hidden">{item.improvements}</p>
              </div>
            ))}
            {[...Array(5 - history.length)].map((_, index) => (
              <div key={`empty-${index}`} className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 flex flex-col bg-white dark:bg-gray-800">
                <div className="h-28 mb-2 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 overflow-ellipsis overflow-hidden flex-grow">Sem descrição</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 overflow-ellipsis overflow-hidden">Sem sugestões de melhorias</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgricultureImageAnalysis;