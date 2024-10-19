'use client'
import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { useTheme } from 'next-themes'

import { GoArrowRight } from "react-icons/go"

import envIrrigationSystem from '@/assets/application-images/env-irrigation-system.png'

export const ControlAgricultureSection = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-col absolute top-[1680px] bottom-0 left-0 right-0 px-32 max-md:mt-32 max-lg:mt-32 max-md:px-8 max-lg:px-8 w-full h-[80vh] overflow-hidden">
            <Image
                alt=""
                src={envIrrigationSystem}
                layout="fill"
                objectFit="cover"
                style={{
                    filter: "blur(2px) brightness(0.5)"
                }}
            />

            <div className='flex flex-row mt-8 relative overflow-hidden justify-end'>
                <h1 className='text-white text-3xl font-normal'>TerraFarming Controle da Agricultura</h1>
            </div>

            <div className='flex flex-col mt-64 max-md:mt-56 max-lg:mt-56'>
                <div className='flex flex-col absolute'>
                    <h1 className='text-bold text-6xl max-md:text-3xl max-lg:text-5xl text-white'>Otimize sua agricultura</h1>
                    <h1 className='text-bold text-6xl max-md:text-3xl max-lg:text-5xl text-white'>Com nosso painel de controle avançado</h1>
                </div>
                <div className='flex flex-col absolute mt-40 max-md:mt-32 max-lg:mt-32'>
                    <h1 className='text-bold text-xl text-white'>Nosso painel de controle fornece informações em tempo real sobre as operações de sua fazenda,</h1>
                    <h1 className='text-bold text-xl text-white'>do controle de estufas à análise climática do solo.</h1>
                </div>
                <Link href="/plans" className={`flex flex-row justify-center space-x-2 absolute p-4 w-52 rounded-full bg-white mt-64
                                ${theme === 'dark'
                                    ? 'bg-[linear-gradient(135deg,#1a365d,#2f855a)] shadow-[0_0_20px_rgba(26,54,93,0.5),0_0_40px_rgba(47,133,90,0.3)]'
                                    : 'bg-gradient-to-b from-green-300 to-green-100 shadow-lg'
                                }`}>
                    <text className='text-green-500 font-bold'>Faça parte!</text>
                    <GoArrowRight size={25} color='green'/>
                </Link>
            </div>
        </div>
    )
}
