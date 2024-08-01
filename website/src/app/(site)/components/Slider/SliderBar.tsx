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
  { title: 'Greenhouse Control', image: greenhouseAnalisysFruits, description: 'Monitor and manage the location and health of crops.' },
  { title: 'Soil Climate Analysis', image: analyseSoilRobot, description: 'Analyze soil climate conditions for better farming decisions.' },
  { title: 'Farm Mapping', image: farmMapping, description: 'Map out your farm to optimize your agricultural operations.' },
  { title: 'Fruit Control & Analysis', image: agricultureRobotHarvesting, description: 'Track and analyze the status of your fruits for improved yield.' },
  { title: 'Machine Analysis by Image', image: agriculturalComputerVision, description: 'Evaluate machinery conditions through image analysis.' },
  { title: 'Farmer Interaction', image: agricultureTechnologyChat, description: 'Connect with other farmers in a social network for shared insights.' },
]

// image: agricultureRobotHarvesting
// image: agricultureRobotHarvesting
// image: agricultureRobotHarvesting
// image: agricultureRobotHarvesting
// image: agricultureRobotHarvesting
// image: agricultureRobotHarvesting

const ITEMS_PER_PAGE = 4

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
    <div className='relative w-full mx-auto p-4 mt-12'>
      {/* Slide Container */}
      <div className='flex overflow-x-hidden'>
        <div className='flex flex-nowrap space-x-4'>
          {visibleSlides.map((slide, index) => (
            <div key={index} className='relative overflow-hidden w-1/4 h-full bg-gray-100 rounded-lg shadow-lg'>
                <Image
                    alt=''
                    src={slide.image}
                    objectFit='cover'
                    style={{
                        filter: 'blur(2px) brightness(0.5)',
                    }}
                    className='w-auto h-full'
                /> 
                <div className='flex flex-col absolute top-0 left-0 right-0 p-4'>                 
                  <div className='flex flex-row justify-between'>
                        <h2 className='text-xl font-normal text-white'>{slide.title}</h2>
                        <CgArrowTopRightO size={40} color='white'/>
                  </div>
                  <p className='flex flex-row justify-between top-12 left-0 right-0 text-white mt-8'>{slide.description}</p>
                </div> 
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className='flex flex-row justify-center mt-4 space-x-4'>
        <div className='relative w-[25vw] bg-gray-200 rounded-full mt-8 h-2'>
          <div
            className='absolute top-0 left-0 h-full bg-green-500 rounded-full'
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>
        {/* Navigation Controls */}
        <div className='flex justify-between items-center mt-4 space-x-4'>
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className='p-2 bg-gray-200 rounded-full disabled:opacity-50'
          >
            <GoArrowLeft size={20} />
          </button>
          <span className='text-sm text-gray-500'>
            Page {currentPage + 1} of {totalPages}
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
