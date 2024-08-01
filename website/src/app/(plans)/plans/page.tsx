import Link from "next/link"
import { Footer } from '@/app/(site)/components/Footer/Footer'

import { FaCircleArrowLeft } from "react-icons/fa6"

import { FC } from 'react'

const PlansPage: FC = () => {
  return (
    <div>
      <div className='flex flex-row justify-between bg-gray-50 py-8 px-12'>
        <h1 className="text-4xl font-normal text-green-700 mb-4">TerraFarming</h1>

        <Link href="/sign-in" className='flex items-center justify-center max-md:hidden max-lg:hidden bg-green-500 rounded-full group-hover:opacity-80 transition-opacity duration-300 mt-4 md:mt-0 lg:w-48'>
            <FaCircleArrowLeft size={20} color="white" className='mr-2'/>
            <a href="/" className='text-white text-base md:text-xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2'>
                HomePage
            </a>
        </Link>
      </div>

      <div className="min-h-screen flex flex-col bg-gray-50 items-center justify-center py-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 underline underline-offset-1">
          <a className="text-gray-600">Escolha o</a> Plano Ideal <a className="text-gray-600">para</a> Sua Fazenda
        </h2>
        <p className="text-lg text-gray-600 mb-16 text-center px-4 max-w-[80vw]">
          TerraFarming é a solução completa para gerenciar sua fazenda com inteligência. Com nossos planos, você terá acesso a métricas detalhadas, recomendações personalizadas e monitoramento de equipamentos, tudo para otimizar suas operações agrícolas e reduzir custos.
        </p>
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Plano Básico */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg flex-1 max-w-md">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Plano Básico</h3>
            <p className="text-2xl font-bold text-green-700 mb-4">$29/mês</p>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Analise do Solo:</strong> Dashboard com métricas básicas de pH, umidade e temperatura.</li>
              <li><strong>Saúde das Plantas:</strong> Dados gerais e recomendações básicas.</li>
              <li><strong>Métricas do Solo:</strong> Informações básicas sobre pH e umidade.</li>
              <li><strong>Informações Climáticas:</strong> Dados meteorológicos básicos.</li>
              <li><strong>Configurações:</strong> Ajustes gerais da aplicação e preferências do usuário.</li>
            </ul>
            <a 
              href="/buy-basic" 
              className="mt-96 block text-center bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Comprar Plano Básico
            </a>
          </div>

          {/* Plano Profissional */}
          <div className="bg-green-200 p-6 rounded-lg shadow-lg flex-1 max-w-md">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Plano Profissional</h3>
            <p className="text-2xl font-bold text-green-800 mb-4">$59/mês</p>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Analise do Solo:</strong> Dashboard com métricas avançadas e recomendações personalizadas.</li>
              <li><strong>Saúde das Plantas:</strong> Dados detalhados e recomendações avançadas.</li>
              <li><strong>Saúde dos Equipamentos:</strong> Monitoramento e relatórios sobre manutenção e estado dos equipamentos.</li>
              <li><strong>Métricas do Solo:</strong> Análise detalhada de pH, umidade e temperatura, incluindo gráficos históricos.</li>
              <li><strong>Informações Climáticas:</strong> Previsões detalhadas e alertas personalizados.</li>
              <li><strong>Controle de Estufas:</strong> Controle e monitoramento de condições das estufas.</li>
              <li><strong>Configurações:</strong> Ajustes gerais e preferências do usuário, com opções avançadas de personalização.</li>
            </ul>
            <a 
              href="/buy-professional" 
              className="mt-60 block text-center bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Comprar Plano Profissional
            </a>
          </div>

          {/* Plano Premium */}
          <div className="bg-green-300 p-6 rounded-lg shadow-lg flex-1 max-w-md">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Plano Premium</h3>
            <p className="text-2xl font-bold text-green-900 mb-4">$99/mês</p>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Analise do Solo:</strong> Dashboard completo com todas as métricas e recomendações personalizadas, incluindo relatórios detalhados.</li>
              <li><strong>Saúde das Plantas:</strong> Monitoramento contínuo e recomendações proativas.</li>
              <li><strong>Saúde dos Equipamentos:</strong> Monitoramento avançado e relatórios detalhados, com alertas proativos.</li>
              <li><strong>Métricas do Solo:</strong> Análise completa com gráficos detalhados e relatórios históricos.</li>
              <li><strong>Informações Climáticas:</strong> Dados meteorológicos completos e recomendações detalhadas.</li>
              <li><strong>Controle de Estufas:</strong> Controle completo e monitoramento avançado das estufas.</li>
              <li><strong>Administração de Custos:</strong> Gestão detalhada de custos operacionais e financeiros, com relatórios e análises avançadas.</li>
              <li><strong>Pagamentos:</strong> Integração completa com o banco do agricultor, histórico de pagamentos e relatórios financeiros.</li>
              <li><strong>Configurações:</strong> Ajustes gerais e preferências do usuário, com opções avançadas e personalização extensiva.</li>
            </ul>
            <a 
              href="/buy-premium" 
              className="mt-16 block text-center bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Comprar Plano Premium
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default PlansPage
