import React from 'react'
import Image from 'next/image'
import { FaCircleArrowRight } from "react-icons/fa6"
import smartHarvestRobot from '../../assets/smart-harvest-robots.png'

export const HeroSection = () => {
    return (
        <div className="relative w-full h-screen px-12 md:px-12 overflow-hidden">
            <Image
                alt=""
                src={smartHarvestRobot}
                layout="fill"
                objectFit="cover"
                style={{
                    filter: "blur(2px) brightness(0.5)"
                }}
            />

            <div className="absolute top-0 left-0 right-0 flex flex-col md:flex-row justify-between p-6 md:p-8 z-10">
                <a href="#terrafarming" className='flex justify-start mb-4 md:mb-0'>
                    <h1 className='text-green-500 text-xl md:text-3xl font-bold group-hover:text-green-200 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2'>
                        Terrafarming
                    </h1>
                </a>

                <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0'>
                    {['home', 'about', 'services', 'careers', 'blog', 'contact'].map((item, index) => (
                        <a key={index} href={`#${item}`} className='flex justify-center'>
                            <h1 className='text-white text-lg md:text-xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2'>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </h1>
                        </a>
                    ))}
                </div>

                <a href="#login" className='flex items-center justify-center bg-green-500 rounded-full group-hover:opacity-80 transition-opacity duration-300 mt-4 md:mt-0 lg:w-28'>
                    <h1 className='text-white text-base md:text-xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2'>
                        Login
                    </h1>
                    <FaCircleArrowRight size={20} className='ml-2'/>
                </a>
            </div>

            <div className='absolute inset-x-0 bottom-0 flex flex-col items-start mb-8 md:mb-8 px-8 md:px-8'>
                <div className='mb-4'>
                    <h1 className='text-4xl md:text-5xl font-bold text-white mb-2'>
                        Smart Agriculture,
                    </h1>
                    <h1 className='text-4xl md:text-5xl font-bold text-white'>
                        Greater Yields
                    </h1>
                </div>
                <div className='mb-8'>
                    <h1 className='text-lg md:text-xl font-normal text-white mb-2'>
                        Transforming Farming for a Sustainable Tomorrow with Innovative
                    </h1>
                    <h1 className='text-lg md:text-xl font-normal text-white'>
                        VMB Robotics Solutions
                    </h1>
                </div>
                <button className='flex items-center justify-center p-4 w-60 md:w-72 rounded-full bg-green-500'>
                    <span className='text-white text-lg md:text-xl font-normal'>Join the community</span>
                    <FaCircleArrowRight size={20} className='ml-2'/>
                </button>
            </div>
        </div>
    )
}
