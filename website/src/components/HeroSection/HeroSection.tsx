import React from 'react'
import Image from 'next/image'

import { FaCircleArrowRight } from "react-icons/fa6"

import smartHarvestRobot from '../../assets/smart-harvest-robots.png'

export const HeroSection = () => {
    return (
        <div className="flex flex-col relative w-full h-screen overflow-hidden">
            <Image
                alt=""
                src={smartHarvestRobot}
                layout="fill"
                objectFit="cover"
                style={{
                    filter: "blur(2px) brightness(0.5)"
                }}
            />

            <div className="flex flex-row absolute justify-between p-8 z-10 w-full">
                <a href="#terrafarming" className='flex justify-start group'>
                    <h1 className='text-green-500 text-3xl font-bold group-hover:text-green-200 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2 px-4'>
                        Terrafarming
                    </h1>
                </a>

                <div className='flex flex-row'>
                    <a href="#home">
                        <h1 className='text-white text-2xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2 px-4'>
                            Home
                        </h1>
                    </a>
                    <a href="#about">
                        <h1 className='text-white text-2xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2 px-4'>
                            About
                        </h1>
                    </a>
                    <a href="#services">
                        <h1 className='text-white text-2xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2 px-4'>
                            Services
                        </h1>
                    </a>
                    <a href="#careers">
                        <h1 className='text-white text-2xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2 px-4'>
                            Careers
                        </h1>
                    </a>
                    <a href="#blog">
                        <h1 className='text-white text-2xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2 px-4'>
                            Blog
                        </h1>
                    </a>
                    <a href="#blog">
                        <h1 className='text-white text-2xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2 px-4'>
                            Contact Us
                        </h1>
                    </a>
                </div>

                {/* Essa botão era transparent -  inset-0, opacity-60 */}
                <a href="#contact" className='flex flex-row w-40 justify-center items-center bg-green-500 rounded-full group-hover:opacity-80 transition-opacity duration-300'>
                    <h1 className='text-white text-xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2 px-4'>
                        Login
                    </h1>
                    <FaCircleArrowRight size={25} className='ml-2'/>
                </a>
            </div>

            <div className='mt-20'></div>
            <div className='flex flex-col px-12 mt-96'>
                <div className='flex flex-col absolute'>
                    <h1 className='text-bold text-7xl text-white'>Smart Agriculture,</h1>
                    <h1 className='text-bold text-7xl text-white'>Greater Yields</h1>
                </div>
                <div className='flex flex-col absolute mt-40'>
                    <h1 className='text-bold text-xl text-white'>Transforming Farming for a Sustainable Tomorrow with Innovative</h1>
                    <h1 className='text-bold text-xl text-white'>VMB Robotics Solutions</h1>
                </div>
                <button className='flex flex-row justify-center absolute p-4 w-72 rounded-full bg-green-500 mt-64'>
                    <text className='text-white text-xl font-normal'>Join the community</text>
                    <FaCircleArrowRight size={25} className='ml-2'/>
                </button>
            </div>
        </div>
    )
}
