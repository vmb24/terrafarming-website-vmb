import React from 'react'
import Image from 'next/image'
import { GoArrowLeft, GoArrowRight } from "react-icons/go"

import controlAgriculture from '@/assets/control-agriculture.jpeg'

export const ControlAgricultureSection = () => {
    return (
        <div className="flex flex-col px-12 mt-12 max-md:px-8 max-lg:px-8 relative w-full h-[80vh] overflow-hidden">
            <Image
                alt=""
                src={controlAgriculture}
                layout="fill"
                objectFit="cover"
                style={{
                    filter: "blur(2px) brightness(0.5)"
                }}
            />

            <div className='flex flex-row mt-8 relative overflow-hidden'>
                <h1 className='text-white text-3xl font-normal'>TerraFarming Control Agriculture</h1>
            </div>

            <div className='flex flex-col mt-64 max-md:mt-56 max-lg:mt-56'>
                <div className='flex flex-col absolute'>
                    <h1 className='text-bold text-6xl max-md:text-5xl max-lg:text-5xl text-white'>Optimize Your Farming</h1>
                    <h1 className='text-bold text-6xl max-md:text-5xl max-lg:text-5xl text-white'>With Our Advanced Dashboard</h1>
                </div>
                <div className='flex flex-col absolute mt-40 max-md:mt-40 max-lg:mt-40'>
                    <h1 className='text-bold text-xl text-white'>Our dashboard provides real-time insights into your farm’s operations,</h1>
                    <h1 className='text-bold text-xl text-white'>from greenhouse control to soil climate analysis.</h1>
                </div>
                <button className='flex flex-row justify-center space-x-2 absolute p-4 w-52 rounded-full bg-white mt-64'>
                    <text className='text-green-500 font-normal'>Get started</text>
                    <GoArrowRight size={25} color='green'/>
                </button>
            </div>
        </div>
    )
}
