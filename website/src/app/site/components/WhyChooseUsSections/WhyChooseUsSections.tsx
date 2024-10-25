'use client'

import { useTheme } from 'next-themes'
import { WiHumidity } from 'react-icons/wi'
import { FaThermometerHalf } from 'react-icons/fa'
import { BsSun } from 'react-icons/bs'
import { TbPlant2 } from 'react-icons/tb'
import { MdOutlineWaterDrop } from 'react-icons/md'
import { RiPlantLine } from 'react-icons/ri'

export const WhyChooseUsSections = () => {
    const { theme } = useTheme()

    return (
        <div className="flex flex-col bg-white dark:bg-[#121212] px-12 mt-[800px] max-md:mt-8 max-lg:mt-8">
            <div className='flex flex-row mt-12'>
                <h1 className='text-[#020405] dark:text-white text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Por que escolher o TerraFarming?</h1>
                <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-600 border-x-gray-400 dark:border-x-gray-600 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[36vw] max-md:w-[6vw] max-lg:w-[6vw]' />
                <a className='text-green-700 dark:text-green-500 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-600 border-x-gray-400 dark:border-x-gray-600 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[36vw] max-md:w-[6vw] max-lg:w-[6vw]' />
                <a className='text-[#020405] dark:text-white max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>

            <div className='flex flex-col items-end mt-12'>
                <p className='text-4xl max-md:text-2xl max-lg:text-2xl text-[#020405] dark:text-white'>
                    <a className='text-[#a1a1a1] dark:text-gray-400'>Revolucione sua agricultura</a> com o TerraFarming
                </p>
                <p className='text-4xl pr-8 max-md:text-2xl max-lg:text-2xl text-[#020405] dark:text-white'>
                    Monitoramento inteligente e análise preditiva para  
                </p>
                <p className='text-4xl pr-44 max-md:pr-12 max-lg:pr-12 max-md:text-2xl max-lg:text-2xl text-[#020405] dark:text-white'>
                    <a className='text-[#a1a1a1] dark:text-gray-400'>maximizar sua produtividade</a>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 max-md:mt-12 max-lg:mt-12">
                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <WiHumidity size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Monitoramento de Umidade do Solo</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Sensores avançados medem a umidade do solo em tempo real, 
                        permitindo irrigação otimizada e conservação de água.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <FaThermometerHalf size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Controle de Temperatura do Solo</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Monitoramento inteligente da temperatura do solo para criar 
                        condições ideais de crescimento para suas culturas.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <BsSun size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Gestão de Luminosidade</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Tecnologia de ponta para otimizar a exposição à luz, 
                        maximizando a fotossíntese e o crescimento das plantas.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <TbPlant2 size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Análise Preditiva de Colheitas</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Utilize IA para prever rendimentos e identificar o momento 
                        ideal de colheita, otimizando seu planejamento de produção.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <MdOutlineWaterDrop size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Monitoramento da Umidade do Ar</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Acompanhe a umidade do ar para prevenir doenças e otimizar 
                        o ambiente de crescimento das suas culturas.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <RiPlantLine size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Gerenciamento Integrado de Culturas</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Visão holística do seu plantio, integrando todas as métricas 
                        para decisões informadas e maior produtividade.
                    </p>
                </div>
            </div>
        </div>
    )
}