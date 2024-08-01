'use client'

import React from 'react'
import { useState } from 'react'
import Link from "next/link"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { SliderBar } from '../Slider/SliderBar'

const slides = [
    { title: 'Greenhouse Control', description: 'Monitor and manage the location and health of crops.' },
    { title: 'Soil Climate Analysis', description: 'Analyze soil climate conditions for better farming decisions.' },
    { title: 'Farm Mapping', description: 'Map out your farm to optimize your agricultural operations.' },
    { title: 'Fruit Control & Analysis', description: 'Track and analyze the status of your fruits for improved yield.' },
    { title: 'Machine Analysis by Image', description: 'Evaluate machinery conditions through image analysis.' },
    { title: 'Farmer Interaction', description: 'Connect with other farmers in a social network for shared insights.' },
]

const ITEMS_PER_PAGE = 4

export const AboutSection = () => {
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
        <div className="flex flex-col bg-white px-8 mt-12">
            <div className='flex flex-row'>
                <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>About US</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2'>
                    <text className='text-white flex lg:hidden'>----</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------</text>
                    {/* <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text> 
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text> */}
                </div>
                <a className='text-green-700 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2'>
                    <text className='text-white flex lg:hidden'>----</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>---------------------------------</text>
                    {/* <text className='text-white flex max-md:hidden max-lg:hidden'>---------------</text> 
                    {/* <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text> */}
                </div>
                <a className='max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>

            {/* <div className='flex mt-8 max-md:flex-col md:flex-col lg:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                {['AIGreenHavest', 'AIGreenFarm', 'AIGreenTech', 'AIFarmTech', 'AIMetrics', 'AIGreenhouse'].map((item, index) => (
                    <p key={index} className='flex justify-center'>
                        <a className='text-black text-lg md:text-xl font-normal group-hover:text-gray-300 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded underline underline-offset-2'>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </a>
                    </p>
                ))}
            </div> */}
            
            <div className='mt-8 mb-4'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-5xl'>What we do ?</h1>
                    <div className='flex flex-col justify-center'>
                        <p className='text-xl text-[#7e7e7e] mr-40'>
                            We offer a comprehensive range of services to support farmers
                        </p>
                        <p className='text-[#7e7e7e] text-xl'>
                            and agricultural enthusiasts in cultivating success sustainably.
                        </p>
                    </div>
                    <Link href="/plans" className='flex items-center bg-green-500 rounded-full py-2 px-4'>
                        <h1 className='text-white'>All Services</h1>
                    </Link>
                </div>
                {/* <h1 className='text-[#020405] text-base font-normal'>
                    We are on a mission to transform modern agriculture through cutting-edge
                    Technology, using AI with robotic solutions. We specialize in providing innovative 
                    solutions to the farming industry, with a primary focus on our state-of-the-art 
                    Smart Farming VMB Robot Picking and Fruit, Transportation and Analysis Soil, 
                    providing agriculture metrics by AI and robot features. 
                </h1> */}
            </div>

            <SliderBar />
        </div>
    )
}