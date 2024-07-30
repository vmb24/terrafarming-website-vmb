import React from 'react'
import Link from "next/link"
import Image from 'next/image'

import { FaCircleArrowRight } from "react-icons/fa6"
import smartHarvestRobot from '../../assets/smart-harvest-robots.png'

export const HeroSection = () => {
    return (
        <div className="relative w-full h-screen px-12 overflow-hidden">
            <Image
                alt=""
                src={smartHarvestRobot}
                layout="fill"
                objectFit="cover"
                style={{
                    filter: "blur(2px) brightness(0.5)"
                }}
            />

            <div className="absolute top-0 left-0 right-0 flex flex-col md:flex-row justify-between md:p-8 z-10 max-md:px-8 max-lg:px-8">
                <a href="#TerraFarming" className='flex justify-start mb-4 md:mb-0'>
                    <h1 className='text-green-500 text-4xl max-md:text-3xl max-lg:text-3xl max-md:mt-4 max-lg:mt-4 font-normal group-hover:text-green-200 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2'>
                        TerraFarming
                    </h1>
                </a>

                {/* <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mr-20'>
                    {['home', 'about', 'services', 'careers', 'blog', 'contact'].map((item, index) => (
                        <a key={index} href={`#${item}`} className='flex justify-center'>
                            <h1 className='text-white text-lg md:text-xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2'>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </h1>
                        </a>
                    ))}
                </div> */}

                <Link href="/login" className='flex items-center justify-center max-md:hidden max-lg:hidden bg-green-500 rounded-full group-hover:opacity-80 transition-opacity duration-300 mt-4 md:mt-0 lg:w-28'>
                    <h1 className='text-white text-base md:text-xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2'>
                        Login
                    </h1>
                    <FaCircleArrowRight size={20} className='ml-2'/>
                </Link>
            </div>

            <div className='absolute inset-x-0 bottom-0 flex flex-col items-start mb-8 md:mb-8 px-8 md:px-8 max-md:mt-20 max-lg:mt-20'>
                <div className='mb-4'>
                    <h1 className='text-4xl max-md:text-3xl max-lg:text-3xl font-bold text-white mb-2'>
                        Smart Agriculture,
                    </h1>
                    <h1 className='text-4xl max-md:text-3xl max-lg:text-3xl font-bold text-white'>
                        Greater Yields
                    </h1>
                </div>
                <div className='mb-8 max-md:w-[80vw] max-lg:w-[80vw] lg:w-[30vw]'>
                    <h1 className='text-lg md:text-xl font-normal text-white mb-2 break-words'>
                        We are passionate about sustainable
                        agriculture and committed to providing 
                        high-quality products and services that
                        nourish both people and the planet.
                    </h1>
                </div>

                <button className='flex items-center justify-center max-md:hidden max-lg:hidden p-2 w-60 md:w-72 rounded-full bg-green-500'>
                    <span className='text-white text-lg md:text-xl font-normal'>Get started</span>
                    <FaCircleArrowRight size={20} className='ml-2'/>
                </button>

                <div className='flex flex-row lg:hidden space-x-4'>
                    <button className='flex items-center justify-center p-2 w-60 max-md:w-36 max-lg:w-36 rounded-full bg-green-500'>
                        <span className='text-white text-lg md:text-xl font-normal'>Get started</span>
                        <FaCircleArrowRight size={20} className='ml-2'/>
                    </button>
                    <button className='flex items-center justify-center p-2 w-60 max-md:w-36 max-lg:w-36 rounded-full bg-green-500'>
                        <span className='text-white text-lg md:text-xl font-normal'>Login</span>
                        <FaCircleArrowRight size={20} className='ml-2'/>
                    </button>
                </div>
            </div>
        </div>
    )
}
