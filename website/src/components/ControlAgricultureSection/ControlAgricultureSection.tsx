import React from 'react'
import Image from 'next/image'

import controlAgriculture from '../../assets/control-agriculture.jpeg'

export const ControlAgricultureSection = () => {
    return (
        <div className="flex flex-col px-12 mt-20 relative w-full h-[80vh] overflow-hidden">
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
                <h1 className='text-white text-3xl font-normal'>Terrafarming Control Agriculture</h1>
            </div>

            <div className='flex flex-col mt-64 max-md:mt-56 max-lg:mt-56'>
                <div className='flex flex-col absolute'>
                    <h1 className='text-bold text-7xl max-md:text-5xl max-lg:text-5xl text-white'>Smart Control Agriculture,</h1>
                    <h1 className='text-bold text-7xl max-md:text-5xl max-lg:text-5xl text-white'>Greater Yields</h1>
                </div>
                <div className='flex flex-col absolute mt-40 max-md:mt-40 max-lg:mt-40'>
                    <h1 className='text-bold text-xl text-white'>Control Agriculture using AI with dashboard and mobile app</h1>
                    <h1 className='text-bold text-xl text-white'>VMB Robotics Solutions</h1>
                </div>
                <button className='absolute p-4 w-52 rounded-full bg-green-500 mt-72'>
                    <text className='text-white font-normal'>Learn more</text>
                </button>
            </div>
        </div>
    )
}
