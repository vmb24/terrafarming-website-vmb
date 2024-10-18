'use client'

import { useTheme } from 'next-themes'
import { FaCircleArrowRight } from "react-icons/fa6"
import { CgArrowTopRightO } from "react-icons/cg"

export const FooterApplication = () => {
    const { theme } = useTheme()

    return (
        <div className="flex flex-col h-auto mt-[100px] max-md:mt-12 max-lg:mt-12 bg-white dark:bg-[#121212] px-12 text-gray-800 dark:text-gray-200">

            <div className='flex flex-row'>
                <h1 className='text-[#020405] dark:text-gray-200 text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Junte-se a nós</h1>
                <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-600 border-x-gray-400 dark:border-x-gray-600 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[38vw] max-md:w-[14vw] max-lg:w-[14vw]' />
                <a className='text-green-700 dark:text-green-500 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-600 border-x-gray-400 dark:border-x-gray-600 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[38vw] max-md:w-[14vw] max-lg:w-[14vw]' />
                <a className='max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>
            
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col mt-12">

                    <div className="flex flex-row space-x-48 max-md:space-x-0 max-lg:space-x-0">

                        <div className="flex flex-col mr-44 max-md:hidden max-lg:hidden">
                            <h1 className="text-green-700 dark:text-green-500 font-normal text-2xl max-md:mt-8 max-lg:mt-8">TerraFarming</h1>
                            <h1 className="mt-2 text-gray-500 dark:text-gray-400">São Paulo, Brasil</h1>
                        </div>

                        <div className="flex flex-row space-x-16 max-md:space-x-24 max-lg:space-x-24">
                            <div className='flex flex-col items-start'>
                                {['Junte-se', 'Serviços', 'Portifólio', 'Blogs', 'Benefícios'].map((item, index) => (
                                    <a key={index} href={`#${item}`} className='flex justify-center'>
                                        <h1 className='text-gray-500 dark:text-gray-400 text-normal font-normal group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300 cursor-pointer hover:bg-green-300 dark:hover:bg-green-700 rounded'>
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </h1>
                                    </a>
                                ))}
                            </div>

                            <div className='flex flex-col items-start'>
                                {['LinkedIn', 'Instagram', 'Twitter', 'vmb24house@company.com.br'].map((item, index) => (
                                    <a key={index} href={`#${item}`} className='flex justify-center'>
                                        <h1 className='text-gray-500 dark:text-gray-400 text-normal font-normal group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300 cursor-pointer hover:bg-green-300 dark:hover:bg-green-700 rounded'>
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </h1>
                                    </a>
                                ))}
                            </div>
                        </div>

                    
                        <div className="flex flex-col w-80 max-md:hidden max-lg:hidden">
                            <h1 className="text-end text-gray-500 dark:text-gray-400 text-3xl">Entre em <a className="text-black dark:text-white text-3xl">Contato</a></h1>
                            <h1 className="text-start text-black dark:text-white text-3xl">Com a TerraFarming</h1>
                            <div className="flex justify-end mt-4">
                                <CgArrowTopRightO size={50} className="text-green-700 dark:text-green-500"/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div>
                <h1 className="text-center text-green-700 dark:text-green-500 text-[220px] max-md:text-[50px] max-lg:text-[50px] max-md:mt-8 max-lg:mt-8">TerraFarming</h1>
            </div>

            <div className="flex flex-row justify-between max-md:space-x-20 max-lg:space-x-20 mt-4 max-md:mt-8 max-lg:mt-8 mb-12 max-md:mb-8 max-lg:mb-8">
                <h1 className="text-gray-500 dark:text-gray-400 mr-8">2024 TerraFarming</h1>
                <h1 className="text-gray-500 dark:text-gray-400 mr-8">Tecnologia Agrícola TerraFarming - VMB</h1>
            </div>
        </div>
    )
}