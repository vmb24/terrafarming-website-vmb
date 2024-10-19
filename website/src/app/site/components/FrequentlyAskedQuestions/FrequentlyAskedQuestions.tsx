'use client'

import React, { useState } from 'react'
import { IoArrowDownCircleOutline } from 'react-icons/io5'
import { useTheme } from 'next-themes'

interface FAQItemProps {
  question: string
  answer: string
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col border border-gray-300 dark:border-gray-600 px-4 py-4 rounded-md mt-8 max-md:mt-8 max-lg:mt-8 bg-white dark:bg-gray-800">
      <div className="flex flex-row justify-between items-center cursor-pointer" onClick={handleToggle}>
        <h1 className="text-gray-900 dark:text-gray-100">{question}</h1>
        <IoArrowDownCircleOutline size={25} className={`${isOpen ? 'rotate-180' : ''} transition-transform text-gray-600 dark:text-gray-400`} />
      </div>
      {isOpen && (
        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="text-gray-800 dark:text-gray-200">{answer}</p>
        </div>
      )}
    </div>
  )
}

export const FrequentlyAskedQuestions: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col px-12 mt-[900px] max-md:mt-8 max-lg:mt-8">
      <div className='flex flex-row mt-12'>
          <h1 className='text-gray-900 dark:text-gray-100 text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Perguntas frequentes</h1>
          <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-500 border-x-gray-400 dark:border-x-gray-500 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[25vw] max-md:w-[2vw] max-lg:w-[2vw]' />
          <a className='text-green-700 dark:text-green-500 text-xl max-md:text-lg max-lg:text-lg max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
          <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-500 border-x-gray-400 dark:border-x-gray-500 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[41vw] max-md:w-[2vw] max-lg:w-[2vw]' />
          <a className='text-gray-600 dark:text-gray-400 max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
      </div>

      <FAQItem 
        question="Sensores de Precisão para Agricultura de Alta Performance"
        answer="O TerraFarming utiliza sensores de última geração para monitorar constantemente a umidade do solo, temperatura do solo e do ar, luminosidade e umidade do ar. Estes dados são essenciais para otimizar o crescimento das culturas e maximizar a produtividade."
      />
      <FAQItem 
        question="IA aplicada para Tomada de Decisões Agrícolas"
        answer="Nossa plataforma utiliza inteligência artificial para analisar os dados coletados e fornecer recomendações precisas sobre irrigação, plantio e manejo de culturas. Isso inclui previsões de rendimento, alertas de risco de estresse hídrico e janelas ideais de plantio."
      />
      <FAQItem 
        question="Planejamento Eficiente para Operações Agrícolas"
        answer="O TerraFarming oferece um sistema de gerenciamento de tarefas que organiza e prioriza as atividades agrícolas com base nas análises de dados. Isso ajuda a otimizar o trabalho diário, melhorando a eficiência operacional da fazenda."
      />
      <FAQItem 
        question="Conectando Agricultores a Fornecedores e Compradores"
        answer="Nossa plataforma inclui um marketplace que conecta agricultores a fornecedores de insumos e compradores de produtos. Isso facilita a compra de suprimentos necessários e a venda da produção, otimizando toda a cadeia de valor agrícola."
      />
      <FAQItem 
        question="Detecção Precoce de Problemas nas Plantações"
        answer="Utilizando análise de imagens e dados dos sensores, o TerraFarming pode detectar precocemente problemas como doenças, pragas ou deficiências nutricionais nas culturas, permitindo intervenções rápidas e eficazes."
      />
      <FAQItem 
        question="Adaptabilidade para Diferentes Tipos de Fazendas"
        answer="O TerraFarming é altamente configurável e pode se integrar a diversos dispositivos IoT agrícolas. Isso permite que a plataforma seja adaptada às necessidades específicas de diferentes tipos e tamanhos de operações agrícolas."
      />
    </div>
  )
}