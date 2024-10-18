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
    <div className="flex flex-col px-12 mt-20 max-md:mt-8 max-lg:mt-8">
      <div className='flex flex-row mt-12'>
          <h1 className='text-gray-900 dark:text-gray-100 text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Perguntas frequentes</h1>
          <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-500 border-x-gray-400 dark:border-x-gray-500 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[25vw] max-md:w-[2vw] max-lg:w-[2vw]' />
          <a className='text-green-700 dark:text-green-500 text-xl max-md:text-lg max-lg:text-lg max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
          <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-500 border-x-gray-400 dark:border-x-gray-500 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[41vw] max-md:w-[2vw] max-lg:w-[2vw]' />
          <a className='text-gray-600 dark:text-gray-400 max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
      </div>

      <FAQItem 
        question="1. O que é a tecnologia TerraRobot e como ela funciona na colheita de frutas?"
        answer="A tecnologia TerraRobot usa sensores avançados e IA para colher frutas com eficiência..."
      />
      <FAQItem 
        question="2. Os robôs TerraRobot são seguros para as árvores frutíferas e plantas?"
        answer="Sim, os robôs TerraRobot são projetados com cuidado para garantir a segurança de árvores e plantas..."
      />
      <FAQItem 
        question="3. Como funciona o transporte de frutas do TerraRobot e quais são seus benefícios?"
        answer="O sistema de transporte utiliza contêineres seguros e rotas otimizadas para entregar frutas..."
      />
      <FAQItem 
        question="4. Como faço para integrar a tecnologia TerraRobot em minhas operações agrícolas?"
        answer="A integração envolve algumas etapas, incluindo a instalação de sensores e a calibração..."
      />
    </div>
  )
}