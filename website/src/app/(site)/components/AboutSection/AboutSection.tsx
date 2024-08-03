'use client'

import React, { useState } from 'react'
import Link from  'next/link'

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
        <div className="flex flex-col bg-white px-8 max-lg:px-8 max-md:px-12 mt-12">
            <div className='flex flex-row'>
                <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>About US</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[39vw] max-md:w-[39vw] max-lg:w-[39vw]' />
                <a className='text-green-700 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[39vw] max-md:w-[39vw] max-lg:w-[39vw]' />
                <a className='max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>

            <div className='mt-8 mb-4'>
                <div className='flex flex-col lg:flex-row lg:justify-between'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl mb-4 lg:mb-0'>What we do?</h1>
                    <div className='flex flex-col lg:justify-center lg:mr-40'>
                        <p className='text-base lg:text-xl text-[#7e7e7e]'>
                            We offer a comprehensive range of services to support farmers
                        </p>
                        <p className='text-base lg:text-xl text-[#7e7e7e]'>
                            and agricultural enthusiasts in cultivating success sustainably.
                        </p>
                    </div>
                    <Link href="/plans" className='mt-8 lg:mt-0 max-md:w-32 max-lg:w-32 flex items-center bg-green-500 rounded-full py-2 px-4'>
                        <h1 className='text-white text-base sm:text-lg'>All Services</h1>
                    </Link>
                </div>
            </div>

            <SliderBar />
        </div>
    )
}