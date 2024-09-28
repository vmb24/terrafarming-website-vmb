import React, { useState, useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import axios from 'axios';

type Category = 'Umidade do Ar' | 'Temperatura do Ar' | 'Luminosidade' | 'Umidade do Solo' | 'Temperatura do Solo';

const topics: Record<Category, string[]> = {
  'Umidade do Ar': [
    "Controle de Doenças", "Manejo de Irrigação", "Crescimento das Plantas", "Polinização",
    "Germinação de Sementes", "Armazenamento de Colheitas", "Conforto Térmico das Plantas",
    "Qualidade dos Frutos", "Eficiência Fotossintética", "Prevenção de Estresse Hídrico"
  ],
  'Temperatura do Ar': [
    "Gerenciamento de Culturas", "Controle de Pragas e Doenças", "Manejo de Irrigação",
    "Fotossíntese e Crescimento", "Floração e Polinização", "Maturação e Colheita",
    "Manejo do Solo", "Proteção contra Extremos Climáticos", "Armazenamento Pós-colheita",
    "Planejamento de Plantio"
  ],
  'Luminosidade': [
    "Gerenciamento de Culturas", "Fotossíntese e Crescimento", "Floração e Polinização",
    "Maturação e Colheita", "Manejo de Sombra", "Eficiência Energética", "Qualidade da Produção",
    "Ciclo Circadiano das Plantas", "Controle de Pragas e Doenças", "Planejamento de Plantio"
  ],
  'Umidade do Solo': [
    "Necessidade de Irrigação", "Índice de Estresse Hídrico", "Prevenção de Doenças",
    "Eficiência no Uso da Água", "Análise de Retenção de Água do Solo", "Previsão de Colheita",
    "Planejamento de Plantio", "Avaliação do Impacto das Chuvas", "Modelagem de Crescimento das Plantas",
    "Detecção de Zonas de Solo Deficiente"
  ],
  'Temperatura do Solo': [
    "Gerenciamento de Estresse Térmico", "Otimização de Irrigação", "Proteção contra Geadas",
    "Manejo de Culturas em Altas Temperaturas", "Ajuste de Cronograma de Plantio",
    "Ventilação e Sombreamento", "Monitoramento de Doenças Relacionadas à Temperatura",
    "Eficiência Energética em Estufas", "Adaptação de Variedades de Culturas",
    "Práticas de Conservação do Solo"
  ]
};

const apiEndpoints: Record<Category, string> = {
  'Umidade do Solo': 'https://81dkc5z9yd.execute-api.us-east-1.amazonaws.com/prod/recommendations',
  'Temperatura do Solo': 'https://uphc1w9gfc.execute-api.us-east-1.amazonaws.com/prod/recommendations',
  'Umidade do Ar': 'https://sua-api-aws-bedrock.com/recomendacoes',
  'Temperatura do Ar': 'https://sua-api-aws-bedrock.com/recomendacoes',
  'Luminosidade': 'https://sua-api-aws-bedrock.com/recomendacoes'
};

const PredictionTool: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Record<Category, Record<string, string>>>({} as Record<Category, Record<string, string>>);
  const [loading, setLoading] = useState<Record<Category, boolean>>({} as Record<Category, boolean>);

  const fetchRecommendations = async (category: Category) => {
    setLoading(prev => ({ ...prev, [category]: true }));

    try {
      const response = await axios.get(apiEndpoints[category]);
      let parsedRecommendations: Record<string, string> = {};
      
      if (category === 'Umidade do Solo') {
        const responseData = JSON.parse(response.data["agriculture/soil/moisture"]);
        parsedRecommendations = responseData;
      } else if (category === 'Temperatura do Solo') {
        const responseData = JSON.parse(response.data.completion);
        parsedRecommendations = responseData;
      } else {
        parsedRecommendations = response.data.recomendacoes;
      }

      setRecommendations(prev => ({
        ...prev,
        [category]: parsedRecommendations
      }));
    } catch (err) {
      console.error(`Erro ao buscar recomendações para ${category}:`, err);
    } finally {
      setLoading(prev => ({ ...prev, [category]: false }));
    }
  };

  useEffect(() => {
    (Object.keys(topics) as Category[]).forEach(fetchRecommendations);
  }, []);

  return (
    <div className="w-full bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Ferramenta de Previsão e Recomendações</h2>
      <TabGroup>
        <TabList className="flex flex-wrap space-x-1 rounded-xl bg-blue-900/20 p-1">
          {(Object.keys(topics) as Category[]).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                 ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}
                 flex-grow`
              }
            >
              {category}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-2">
          {(Object.entries(topics) as [Category, string[]][]).map(([category, topicList]) => (
            <TabPanel
              key={category}
              className="rounded-xl bg-white p-3"
            >
              {loading[category] ? (
                <p>Carregando recomendações...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topicList.map((topic) => (
                    <div key={topic} className="bg-gray-50 p-4 rounded-lg shadow">
                      <h3 className="font-bold mb-2">{topic}</h3>
                      <p className="text-sm text-gray-700">
                        {recommendations[category]?.[topic] || "Nenhuma recomendação"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default PredictionTool;