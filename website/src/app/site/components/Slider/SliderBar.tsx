import React, { useState } from 'react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import Image from 'next/image'
import { CgArrowTopRightO } from 'react-icons/cg'

import greenhouseAnalisysFruits from '@/assets/picking.jpg'
import analyseSoilRobot from '@/assets/analyse-soil-robot.png'
import farmMapping from '@/assets/robot-farmer-soil.jpg'
import agricultureRobotHarvesting from '@/assets/smart-harvest-robots.png'
import agriculturalComputerVision from '@/assets/services/agricultural-compute-vision.png'
import agricultureTechnologyChat from '@/assets/agriculture-technology-chat.png'

const slides = [
  { title: 'Controle de Estufas', image: greenhouseAnalisysFruits, description: 'Monitorar e gerenciar a localização e a saúde das culturas.' },
  { title: 'Análise climática do solo', image: analyseSoilRobot, description: 'Analise as condições climáticas do solo para tomar melhores decisões agrícolas.' },
  { title: 'Mapeamento de fazendas', image: farmMapping, description: 'Mapeie sua fazenda para otimizar suas operações agrícolas.' },
  { title: 'Controle e análise de frutas', image: agricultureRobotHarvesting, description: 'Rastreie e analise o status de suas frutas para melhorar o rendimento.' },
  { title: 'Análise de máquina por imagem', image: agriculturalComputerVision, description: 'Avalie as condições do maquinário por meio da análise de imagens.' },
  { title: 'Interação com o agricultor', image: agricultureTechnologyChat, description: 'Conecte-se com outros agricultores em uma rede social para obter insights compartilhados.' },
]

const ITEMS_PER_PAGE = 1 // Show one item per page on smaller screens

export const SliderBar = () => {
  const [currentPage, setCurrentPage] = useState(0)

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
    <div className='relative w-full mx-auto p-4 mt-12 max-md:mt-8 max-lg:mt-8'>
      {/* Slide Container */}
      <div className='flex overflow-x-auto space-x-4 pb-4'>
        <div className='flex flex-nowrap space-x-3' style={{ transform: `translateX(-${currentPage * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className='relative flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1.5/6 bg-gray-100 rounded-lg shadow-lg'>
              <Image
                alt=''
                src={slide.image}
                layout='responsive'
                width={500}
                height={300}
                objectFit='cover'
                className='rounded-t-lg w-auto h-auto'
                style={{
                  filter: 'blur(2px) brightness(0.5)',
                }}
              />
              <div className='absolute inset-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
                <div className='flex justify-between items-start'>
                  <h2 className='text-lg sm:text-base md:text-lg font-normal text-white'>{slide.title}</h2>
                  <CgArrowTopRightO size={20} color='white'/>
                </div>
                <p className='text-md sm:text-sm md:text-base text-white mt-2'>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className='flex flex-col items-center mt-4'>
        <div className='relative w-full bg-gray-200 rounded-full h-2'>
          <div
            className='absolute top-0 left-0 h-full bg-green-500 rounded-full'
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>

        {/* Navigation Controls */}
        <div className='flex justify-between items-center w-full mt-4'>
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className='p-2 bg-gray-200 rounded-full disabled:opacity-50'
          >
            <GoArrowLeft size={20} />
          </button>
          <span className='text-sm text-gray-500'>
            Página {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className='p-2 bg-green-700 rounded-full disabled:opacity-50'
          >
            <GoArrowRight size={20} color='white'/>
          </button>
        </div>
      </div>
    </div>
  )
}
