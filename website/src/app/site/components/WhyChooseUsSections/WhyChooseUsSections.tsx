'use client'

import { useTheme } from 'next-themes'
import { RiRobot3Line } from 'react-icons/ri'
import { GiPlantRoots } from 'react-icons/gi'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { SiClockify } from 'react-icons/si'

export const WhyChooseUsSections = () => {
    const { theme } = useTheme()

    return (
        <div className="flex flex-col bg-white dark:bg-[#121212] px-12 mt-12 max-md:mt-8 max-lg:mt-8">
            <div className='flex flex-row mt-12'>
                <h1 className='text-[#020405] dark:text-white text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Por que nos escolher ?</h1>
                <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-600 border-x-gray-400 dark:border-x-gray-600 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[36vw] max-md:w-[6vw] max-lg:w-[6vw]' />
                <a className='text-green-700 dark:text-green-500 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 dark:border-gray-600 border-x-gray-400 dark:border-x-gray-600 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[36vw] max-md:w-[6vw] max-lg:w-[6vw]' />
                <a className='text-[#020405] dark:text-white max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>

            <div className='flex flex-col items-end mt-12'>
                <p className='text-4xl max-md:text-2xl max-lg:text-2xl text-[#020405] dark:text-white'>
                    <a className='text-[#a1a1a1] dark:text-gray-400'>Por que escolher a TerraFarming</a> para sua jornada agrícola ?
                </p>
                <p className='text-4xl pr-8 max-md:text-2xl max-lg:text-2xl text-[#020405] dark:text-white'>
                    Revelando as vantagens exclusivas e as soluções sustentáveis de robôs de IA  
                </p>
                <p className='text-4xl pr-44 max-md:pr-12 max-lg:pr-12 max-md:text-2xl max-lg:text-2xl text-[#020405] dark:text-white'>
                    Que Cultivam o Sucesso e <a className='text-[#a1a1a1] dark:text-gray-400'>Promover o crescimento em conjunto</a>
                </p>
            </div>

            <div className="flex flex-row max-md:flex-col max-lg:flex-col justify-between mt-20 max-md:space-y-12 max-lg:space-y-12 max-md:mt-12 max-lg:mt-12">
                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <RiRobot3Line size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Tecnologia de ponta</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Aproveitamos o poder dos robôs 
                        e inteligência artificial para garantir
                        eficiência e precisão inigualáveis.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <GiPlantRoots size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Sustentabilidade</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Nossos serviços promovem a sustentabilidade 
                        práticas agrícolas que reduzem a mão de obra,
                        resíduos e impacto ambiental.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <FaMoneyBillTrendUp size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Aumento da lucratividade</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Ajudamos os agricultores a maximizar suas
                        retornos ao otimizar a colheita de frutas
                        e o processo de transporte.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] dark:bg-gray-700 rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <SiClockify size={100} className="text-[#020405] dark:text-white"/>
                    </div>
                    <h1 className='text-center mt-4 text-xl text-[#020405] dark:text-white'>Confiabilidade</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 dark:text-gray-300 max-w-sm mx-auto text-center break-words'>
                        Nossos robôs operam 24 horas por dia,
                        proporcionando um desempenho inabalável 
                        e qualidade.
                    </p>
                </div>
            </div>
        </div>
    )
}