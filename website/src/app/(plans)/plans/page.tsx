'use client'

import { FC } from 'react'
import Link from "next/link"
import { useTheme } from 'next-themes'
import CheckoutButton from '@/app/(plans)/plans/components/CheckoutButton'

import { Container } from "@/components/ui/atoms/Container"
import { FaCircleArrowLeft } from "react-icons/fa6"

import { MenuItem } from "@/utils/types"
import { HomeHeader } from "@/components/ui/organisms/HomeHeader"
import { FooterApplication } from '@/components/ui/templates/FooterApplication'

const MENUITEMS: MenuItem[] = [
  { label: 'Entenda a TerraFarming', href: '/site' }
]

const PlansPage: FC = () => {
  const { theme } = useTheme()

  return (
    <>
      <HomeHeader menuItems={MENUITEMS} />
      <Container>
        <div className='flex flex-row justify-between bg-white dark:bg-[#121212] py-8 px-12'>
          <h1 className="text-4xl font-normal text-green-700 dark:text-green-500 mb-4">TerraFarming</h1>
          <Link href="/">
            <h1 className='flex items-center justify-center bg-green-500 dark:bg-green-600 rounded-full group-hover:opacity-80 transition-opacity duration-300 mt-4 max-md:mt-0 max-lg:mt-0 md:mt-0 lg:w-48'>
              <FaCircleArrowLeft size={20} color="white" className='mr-2 max-lg:mr-0 max-md:mr-0 max-lg:h-12 max-md:h-12 max-lg:w-12 max-md:w-12 max-lg:p-2 max-md:p-2'/>
              <span className='text-white text-base md:text-xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 dark:hover:bg-green-700 rounded py-2 max-lg:hidden max-md:hidden'>
                HomePage
              </span>
            </h1>
          </Link>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center py-8 bg-white dark:bg-[#121212]">
          <h2 className="text-2xl max-md:text-xl max-lg:text-xl font-semibold text-green-700 dark:text-green-500 mb-4 underline underline-offset-1">
            <a className="text-gray-600 dark:text-gray-300">Escolha o Plano</a> Ideal para Sua Fazenda
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-16 text-center px-4 max-w-[80vw]">
            TerraFarming é a solução completa para gerenciar sua fazenda com inteligência. Com nossos planos, você terá acesso a métricas detalhadas, recomendações personalizadas e monitoramento de equipamentos, tudo para otimizar suas operações agrícolas e reduzir custos.
          </p>
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg shadow-lg flex-1 max-w-md max-md:max-w-sm max-lg:max-w-sm">
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">Plano Básico</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">$49/mês</p>
              <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                <li><strong>Overview:</strong> Dashboard com métricas básicas de pH, umidade e temperatura.</li>
                <li><strong>Saúde das Plantas:</strong> Dados gerais e recomendações básicas.</li>
                <li><strong>Métricas do Solo:</strong> Informações básicas sobre pH e umidade.</li>
                <li><strong>Informações Climáticas:</strong> Dados meteorológicos básicos.</li>
                <li><strong>Configurações:</strong> Ajustes gerais da aplicação e preferências do usuário.</li>
              </ul>
              <CheckoutButton priceId="price_id_plano_basico" />
            </div>

            <div className="bg-green-200 dark:bg-green-800 p-6 rounded-lg shadow-lg flex-1 max-w-md max-md:max-w-sm max-lg:max-w-sm">
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">Plano Profissional</h3>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">$99/mês</p>
              <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                <li><strong>Overview:</strong> Dashboard com métricas avançadas e recomendações personalizadas.</li>
                <li><strong>Saúde das Plantas:</strong> Dados detalhados e recomendações avançadas.</li>
                <li><strong>Saúde dos Equipamentos:</strong> Monitoramento e relatórios sobre manutenção e estado dos equipamentos.</li>
                <li><strong>Métricas do Solo:</strong> Análise detalhada de pH, umidade e temperatura, incluindo gráficos históricos.</li>
                <li><strong>Informações Climáticas:</strong> Previsões detalhadas e alertas personalizados.</li>
                <li><strong>Controle de Estufas:</strong> Controle e monitoramento de condições das estufas.</li>
                <li><strong>Configurações:</strong> Ajustes gerais e preferências do usuário, com opções avançadas de personalização.</li>
              </ul>
              <CheckoutButton priceId="price_id_plano_profissional" />
            </div>

            <div className="bg-green-300 dark:bg-green-700 p-6 rounded-lg shadow-lg flex-1 max-w-md max-md:max-w-sm max-lg:max-w-sm">
              <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">Plano Premium</h3>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">$149/mês</p>
              <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                <li><strong>Overview:</strong> Dashboard completo com todas as métricas e recomendações personalizadas, incluindo relatórios detalhados.</li>
                <li><strong>Saúde das Plantas:</strong> Monitoramento contínuo e recomendações proativas.</li>
                <li><strong>Saúde dos Equipamentos:</strong> Monitoramento avançado e relatórios detalhados, com alertas proativos.</li>
                <li><strong>Métricas do Solo:</strong> Análise completa com gráficos detalhados e relatórios históricos.</li>
                <li><strong>Informações Climáticas:</strong> Dados meteorológicos completos e recomendações detalhadas.</li>
                <li><strong>Controle de Estufas:</strong> Controle completo e monitoramento avançado das estufas.</li>
                <li><strong>Administração de Custos:</strong> Gestão detalhada de custos operacionais e financeiros, com relatórios e análises avançadas.</li>
                <li><strong>Pagamentos:</strong> Integração completa com o banco do agricultor, histórico de pagamentos e relatórios financeiros.</li>
                <li><strong>Configurações:</strong> Ajustes gerais e preferências do usuário, com opções avançadas e personalização extensiva.</li>
              </ul>
              <CheckoutButton priceId="price_id_plano_premium" />
            </div>
          </div>
          <FooterApplication />
        </div>
      </Container>
    </>
  )
}

export default PlansPage