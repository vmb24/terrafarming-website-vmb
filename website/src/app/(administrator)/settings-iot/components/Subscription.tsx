'use client'
import React, { useState } from 'react';
import CheckoutButton from '../../../../components/ui/payments/CheckoutButton';
import Checkout from '../../../../components/ui/payments/Checkout';

const Subscription: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<null | {
    planName: string;
    price: number;
    currency: string;
    interval: string;
    features: string[];
  }>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = (plan: {
    planName: string;
    price: number;
    currency: string;
    interval: string;
    features: string[];
  }) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handleReturn = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
  };

  if (showCheckout && selectedPlan) {
    return (
      <Checkout
        planName={selectedPlan.planName}
        price={selectedPlan.price}
        currency={selectedPlan.currency}
        interval={selectedPlan.interval}
        features={selectedPlan.features}
        onReturn={handleReturn}
      />
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Plano de Assinatura</h2>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Escolha o plano ideal para você</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 mt-8">
          Aproveite os nossos recursos para tornar sua agricultura mais a mais inteligente que você conhece!
        </p>
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Plano Semente */}
          <div className="bg-green-200 dark:bg-green-700 p-6 rounded-lg shadow-lg flex-1 max-w-md max-md:max-w-sm max-lg:max-w-sm">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">Plano Semente</h3>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">R$199/mês</p>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
              <li><strong>Visão Geral:</strong> Dashboard com métricas básicas de umidade do solo, temperatura e luminosidade.</li>
              <li><strong>Monitoramento de Culturas:</strong> Acompanhamento básico de alface americana, tomate, cenoura e espinafre.</li>
              <li><strong>Sistema de Irrigação:</strong> Dados básicos de umidade do solo e temperatura.</li>
              <li><strong>Previsão de Rendimento:</strong> Estimativas básicas de produtividade.</li>
              <li><strong>Alerta Climático:</strong> Informações básicas de temperatura e precipitação.</li>
            </ul>
            <div className='mt-72'>
              <CheckoutButton 
                planName="Plano Semente"
                price={19900}
                currency="brl"
                interval="month"
                onCheckout={() => handleCheckout({
                  planName: "Plano Semente",
                  price: 199.00,
                  currency: "brl",
                  interval: "month",
                  features: ["Monitoramento básico", "Relatórios mensais", "Suporte por email"]
                })}
              />
            </div>
          </div>

          {/* Plano Cultivar */}
          <div className="bg-green-300 dark:bg-green-800 p-6 rounded-lg shadow-lg flex-1 max-w-md max-md:max-w-sm max-lg:max-w-sm">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">Plano Cultivar</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">R$399/mês</p>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
              <li><strong>Visão Geral:</strong> Dashboard completo com todas as métricas (umidade do solo, temperatura do solo, luminosidade, umidade do ar, temperatura do ar).</li>
              <li><strong>Gestão de Culturas:</strong> Monitoramento avançado de múltiplas culturas com recomendações personalizadas.</li>
              <li><strong>Sistema de Irrigação Inteligente:</strong> Controle automatizado baseado em dados em tempo real.</li>
              <li><strong>Análise Preditiva:</strong> Previsões detalhadas de rendimento e riscos.</li>
              <li><strong>Alerta Climático Avançado:</strong> Notificações personalizadas e recomendações baseadas em previsões meteorológicas.</li>
              <li><strong>Marketplace & Recursos:</strong> Acesso a fornecedores e recursos agrícolas.</li>
            </ul>
            <div className='mt-44'>
              <CheckoutButton 
                planName="Plano Cultivar"
                price={39900}
                currency="brl"
                interval="month"
                onCheckout={() => handleCheckout({
                  planName: "Plano Cultivar",
                  price: 399.00,
                  currency: "brl",
                  interval: "month",
                  features: ["Monitoramento avançado", "Relatórios semanais", "Suporte prioritário", "Análise preditiva básica"]
                })}
              />
            </div>
          </div>

          {/* Plano Colheita */}
          <div className="bg-green-400 dark:bg-green-900 p-6 rounded-lg shadow-lg flex-1 max-w-md max-md:max-w-sm max-lg:max-w-sm">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">Plano Colheita</h3>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">R$699/mês</p>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
              <li><strong>Visão Geral:</strong> Dashboard completo com análises avançadas e inteligência artificial.</li>
              <li><strong>Gestão Integrada de Culturas:</strong> Monitoramento em tempo real de todas as culturas com insights baseados em IA.</li>
              <li><strong>Sistema de Irrigação Inteligente Premium:</strong> Otimização automatizada com machine learning.</li>
              <li><strong>Análise Preditiva Avançada:</strong> Modelagem complexa para maximizar rendimentos e minimizar riscos.</li>
              <li><strong>Alerta Climático e Gestão de Riscos:</strong> Sistema avançado de previsão e mitigação de riscos climáticos.</li>
              <li><strong>AgriBigData:</strong> Análises avançadas de big data para otimização de operações.</li>
              <li><strong>Integração IoT:</strong> Conexão com dispositivos IoT para monitoramento e controle avançados.</li>
              <li><strong>Suporte Técnico Premium:</strong> Acesso prioritário a especialistas em agronomia e tecnologia agrícola.</li>
            </ul>
            <div className='mt-12'>
              <CheckoutButton 
                planName="Plano Colheita"
                price={69900}
                currency="brl"
                interval="month"
                onCheckout={() => handleCheckout({
                  planName: "Plano Colheita",
                  price: 699.00,
                  currency: "brl",
                  interval: "month",
                  features: ["Monitoramento em tempo real", "Relatórios diários", "Suporte 24/7", "Análise preditiva avançada", "Integração IoT"]
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;