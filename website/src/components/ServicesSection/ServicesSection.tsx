import React from 'react'
import Image from 'next/image'

import smartHarvestRobot from '../../assets/smart-harvest-robots.png'
import analyseSoilRobot from '../../assets/analyse-soil-robot.png'
import sensorsSoilRebot from '../../assets/sensors-soil-agriculture.jpg'

export const ServicesSection = () => {
    return (
        <div className='flex flex-col px-12'>
            <div className='flex flex-row mt-12'>
                <h1 className='text-[#020405] text-3xl font-normal'>Terrafarming Robot - AI Smart Picking, Harvesting & Sensoring</h1>
                <div className='flex flex-row lg:border-t-2 flex max-md:border-b-2 max-lg:border-b-2 border-gray-400 border-x-gray-400 mt-7 ml-4'>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                </div>
            </div>

            <div className='flex flex-row max-md:flex-col max-lg:flex-col justify-between mt-20 max-md:mt-4 max-lg:mt-4'>
                <div className='flex flex-col'>
                    <div className='bg-slate-400 rounded-xl w-96 h-72 max-md:w-80 max-lg:w-80 mt-12 relative overflow-hidden'>
                        <Image
                            alt=""
                            src={smartHarvestRobot}
                            layout="fill"
                            objectFit="cover"
                        />  
                    </div>
                    <div>
                        <h1 className='text-center mt-4 text-xl'>Smart Harvesting</h1>
                        <p className='mt-4 text-base text-gray-700 max-w-sm mx-auto break-words'>
                            Usamos soluções da AWS de AI para que o robô execute uma 
                            colheita inteligênte, analisando as frutas que podem ser 
                            colhidas ou quando poderão ser colhidas, verificando 
                            possíveis métodos para a saúde do que está sendo plantado.</p>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <div className='bg-slate-400 rounded-xl w-96 h-72 max-md:w-80 max-lg:w-80 mt-12 relative overflow-hidden'>
                        <Image
                            alt=""
                            src={analyseSoilRobot}
                            layout="fill"
                            objectFit="cover"
                        />  
                    </div>
                    <div>
                        <h1 className='text-center mt-4 text-xl'>Smart Soil Analysis</h1>
                        <p className='mt-4 text-base text-gray-700 max-w-sm mx-auto break-words'>
                            Usamos soluções da AWS de AI para que o robô colete as medidas de
                            pH, temperatura e umidade do solo, captando também o clima da semana
                            na determinada região. Após essas etapas, todas essas métricas são unidas
                            e processadas, provendo recomendações para que o solo do agricultor possa 
                            sempre dar muitos frutos.</p>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <div className='bg-slate-400 rounded-xl w-96 h-72 max-md:w-80 max-lg:w-80 mt-12 relative overflow-hidden'>
                        <Image
                            alt=""
                            src={sensorsSoilRebot}
                            layout="fill"
                            objectFit="cover"
                        />  
                    </div>
                    <div>
                        <h1 className='text-center mt-4 text-xl'>Smart Sensors</h1>
                        <p className='mt-4 text-base text-gray-700 max-w-sm mx-auto break-words'>
                            Sensores de proximidade, rodas de trator, cameras e outros Sensores
                            do mesmo são usados no robô para que suas atividades possam ser 
                            exercidas com a capacidade essencial e segurança que pode ser 
                            exercida por um ser humano, mas através de um robô.</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row mt-32 max-md:mt-20 max-lg:mt-20'>
                <h1 className='text-[#020405] text-3xl font-normal'>Outros Serviços utilizando AI</h1>
                <div className='flex flex-row lg:border-t-2 max-md:border-b-2 max-lg:border-b-2 border-gray-400 border-x-gray-400 mt-9'>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                </div>
            </div>
            <div className="flex flex-row justify-between max-md:flex-col max-lg:flex-col max-md:space-y-4 max-lg:space-y-4 mt-6 max-md:mt-12 max-lg:mt-12">
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>Controle de Estufas</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>Analise do clima sob o solo</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>Mapeamento da fazenda</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>Controle e analise de frutas</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>Analise das maquinas por imagem</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>Interação entre outros agricultores</h1>
            </div>

        </div>
    )
}