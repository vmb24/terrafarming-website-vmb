'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { SliderBar } from '../Slider/SliderBar'

const slides = [
    { title: 'Monitoramento de Culturas', description: 'Acompanhe a saúde e o desenvolvimento das suas plantações em tempo real.' },
    { title: 'Análise do Solo e Clima', description: 'Obtenha insights sobre umidade e temperatura do solo para otimizar suas decisões de cultivo.' },
    { title: 'Gerenciamento de Tarefas', description: 'Planeje e acompanhe as atividades agrícolas com base em recomendações inteligentes.' },
    { title: 'Controle Ambiental', description: 'Monitore luminosidade, umidade e temperatura do ar para criar condições ideais de crescimento.' },
    { title: 'Análise Preditiva', description: 'Antecipe tendências e tome decisões proativas com base em dados históricos e atuais.' },
    { title: 'Marketplace Agrícola', description: 'Conecte-se com fornecedores e compradores para otimizar sua cadeia de suprimentos.' },
]

const ITEMS_PER_PAGE = 4

export const AboutSection = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const { theme } = useTheme()

    const totalPages = Math.ceil(slides.length / ITEMS_PER_PAGE)

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0))
    }

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
    }

    const startIndex = currentPage * ITEMS_PER_PAGE
    const visibleSlides = slides.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <div className="flex flex-col bg-white dark:bg-[#121212] px-8 max-lg:px-8 max-md:px-12 mt-[900px]">
            <div className='flex flex-row'>
                <h1 className='text-[#020405] dark:text-white text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Sobre Nós</h1>
                <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-600 border-x-gray-400 dark:border-x-gray-600 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[39vw] max-md:w-[39vw] max-lg:w-[39vw]' />
                <a className='text-green-700 dark:text-green-500 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-600 border-x-gray-400 dark:border-x-gray-600 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[39vw] max-md:w-[39vw] max-lg:w-[39vw]' />
                <a className='text-[#020405] dark:text-white max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>

            <div className='mt-16 mb-4'>
                <div className='flex flex-col lg:flex-row lg:justify-between'>
                    <h1 className='text-[#020405] dark:text-white text-3xl sm:text-4xl lg:text-5xl mb-4 lg:mb-0'>Como potencializamos sua agricultura?</h1>
                    <div className='flex flex-col lg:justify-center lg:mr-20'>
                        <p className='text-base lg:text-xl text-[#7e7e7e] dark:text-gray-300'>
                            Oferecemos tecnologia de ponta para maximizar sua produtividade
                        </p>
                        <p className='text-base lg:text-xl text-[#7e7e7e] dark:text-gray-300'>
                            e promover uma agricultura inteligente e sustentável.
                        </p>
                    </div>
                    <Link href="/plans" className='mt-8 lg:mt-0 max-md:w-32 max-lg:w-32 flex items-center bg-green-500 dark:bg-green-700 rounded-full py-2 px-4 h-16'>
                        <h1 className='text-white text-base text-center sm:text-lg'>Nossos Serviços</h1>
                    </Link>
                </div>
            </div>

            <SliderBar />
        </div>
    )
}