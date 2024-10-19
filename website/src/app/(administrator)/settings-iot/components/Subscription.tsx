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
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold mb-4 text-center text-white">Plano de Assinatura</h2>
      <p className="text-xl text-center text-gray-300 mb-12">Escolha o plano ideal para sua fazenda.</p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Plano Semente */}
        <div className="rounded-lg shadow-lg overflow-hidden bg-gradient-to-b from-green-600 to-green-800">
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Plano Semente</h3>
            <p className="text-4xl font-bold text-white mb-4">R$199<span className="text-xl font-normal">/mês</span></p>
            <p className="text-green-100 mb-6">Faturado anualmente</p>
            <ul className="space-y-4 text-white mb-8">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Visão Geral:</strong> Dashboard com métricas básicas</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Monitoramento de Culturas:</strong> Básico</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Sistema de Irrigação:</strong> Dados básicos</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Previsão de Rendimento:</strong> Estimativas básicas</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Alerta Climático:</strong> Informações básicas</span>
              </li>
            </ul>
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
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Plano Cultivar */}
        <div className="rounded-lg shadow-lg overflow-hidden bg-gradient-to-b from-green-500 to-green-700">
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Plano Cultivar</h3>
            <p className="text-4xl font-bold text-white mb-4">R$399<span className="text-xl font-normal">/mês</span></p>
            <p className="text-green-100 mb-6">Faturado anualmente</p>
            <ul className="space-y-4 text-white mb-8">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Visão Geral:</strong> Dashboard completo</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Gestão de Culturas:</strong> Monitoramento avançado</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Sistema de Irrigação Inteligente:</strong> Controle automatizado</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Análise Preditiva:</strong> Previsões detalhadas</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Alerta Climático Avançado:</strong> Notificações personalizadas</span>
              </li>
            </ul>
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
              className="w-full bg-green-400 hover:bg-green-500 text-green-900 font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Plano Colheita */}
        <div className="rounded-lg shadow-lg overflow-hidden bg-gradient-to-b from-green-400 to-green-600">
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Plano Colheita</h3>
            <p className="text-4xl font-bold text-white mb-4">R$699<span className="text-xl font-normal">/mês</span></p>
            <p className="text-green-100 mb-6">Faturado anualmente</p>
            <ul className="space-y-4 text-white mb-8">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Visão Geral:</strong> Dashboard com IA</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Gestão Integrada de Culturas:</strong> Monitoramento em tempo real</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Sistema de Irrigação Inteligente Premium:</strong> Otimização com ML</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Análise Preditiva Avançada:</strong> Modelagem complexa</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Suporte Técnico Premium:</strong> Acesso prioritário</span>
              </li>
            </ul>
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
              className="w-full bg-green-300 hover:bg-green-400 text-green-800 font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;