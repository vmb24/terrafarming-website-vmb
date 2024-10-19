'use client'
import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import { useTheme } from 'next-themes'

import { FaCircleArrowRight } from "react-icons/fa6"
import predictiveAnalisys from '@/assets/application-images/predictive-analisys.png'

export const HeroSection = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden">
            <Image
                alt=""
                src={predictiveAnalisys}
                layout="fill"
                objectFit="cover"
                style={{
                    filter: "blur(4px) brightness(0.5)"
                }}
            />

            <div className="absolute container sm:px-2 mx-auto top-12 left-0 right-0 flex flex-col md:flex-row justify-between md:p-8 z-10 max-md:px-8 max-lg:px-8">
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

                {/* <Link href="/sign-in" className='flex items-center justify-center max-md:hidden max-lg:hidden bg-green-500 rounded-full group-hover:opacity-80 transition-opacity duration-300 mt-4 md:mt-0 lg:w-28'>
                    <h1 className='text-white text-base md:text-xl font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2'>
                        Login
                    </h1>
                    <FaCircleArrowRight size={20} color="white" className='ml-2'/>
                </Link> */}
            </div>

            <div className='absolute container sm:px-2 mx-auto inset-x-0 bottom-0 flex flex-col items-start mb-8 md:mb-8 px-8 md:px-8 max-md:mt-20 max-lg:mt-20'>
                <div className='mb-4'>
                    <h1 className='text-4xl max-md:text-3xl max-lg:text-3xl font-bold text-white mb-2'>
                        Agricultura inteligente,
                    </h1>
                    <h1 className='text-4xl max-md:text-3xl max-lg:text-3xl font-bold text-white'>
                        Maiores rendimentos
                    </h1>
                </div>
                <div className='mb-8 max-md:w-[80vw] max-lg:w-[80vw] lg:w-[30vw]'>
                    <h1 className='text-lg md:text-xl font-normal text-white mb-2 break-words'>
                    Somos apaixonados pela agricultura sustentável
                    agricultura sustentável e estamos comprometidos 
                    em fornecer produtos e serviços de alta qualidade 
                    que nutrem as pessoas e o planeta através das nossas 
                    soluções tecnológicas, utilizando inteligência artificial.
                    </h1>
                </div>

                <Link href="/plans" className={`flex items-center justify-center max-md:hidden max-lg:hidden p-2 w-60 md:w-72 rounded-full bg-green-500 dark:bg-green-700 mb-8
                                ${theme === 'dark'
                                    ? 'bg-[linear-gradient(135deg,#1a365d,#2f855a)] shadow-[0_0_20px_rgba(26,54,93,0.5),0_0_40px_rgba(47,133,90,0.3)]'
                                    : 'bg-gradient-to-b from-green-300 to-green-100 shadow-lg'
                                }`}>
                    <span className='text-white text-lg md:text-xl font-normal'>Faça parte!</span>
                    <FaCircleArrowRight size={20} color="white" className='ml-2'/>
                </Link>

                <div className='flex flex-row lg:hidden space-x-4'>
                    <Link href="/plans" className={`flex items-center justify-center p-2 w-60 max-md:w-36 max-lg:w-36 rounded-full bg-green-500 dark:bg-green-700 mb-8
                                ${theme === 'dark'
                                    ? 'bg-[linear-gradient(135deg,#1a365d,#2f855a)] shadow-[0_0_20px_rgba(26,54,93,0.5),0_0_40px_rgba(47,133,90,0.3)]'
                                    : 'bg-gradient-to-b from-green-300 to-green-100 shadow-lg'
                                }`}>
                        <span className='text-white text-lg md:text-xl font-normal'>Faça parte!</span>
                        <FaCircleArrowRight size={20} color="white" className='ml-2'/>
                    </Link>
                    {/* <Link href="/sign-in" className='flex items-center justify-center p-2 w-60 max-md:w-36 max-lg:w-36 rounded-full bg-green-500 mb-8'>
                        <span className='text-white text-lg md:text-xl font-normal'>Login</span>
                        <FaCircleArrowRight size={20} color="white" className='ml-2'/>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}
