/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import Image from 'next/image'

import smartHarvestRobot from '@/assets/picking.jpg'
import analyseSoilRobot from '@/assets/analyse-soil-robot.png'
import sensorsSoilRebot from '@/assets/robot-farmer-soil.jpg'

import { CgArrowTopRightO } from "react-icons/cg"

export const ServicesSection = () => {
    return (
        <div className='flex flex-col px-12 mt-12 max-md:px-8 max-lg:px-8'>
            <div className='flex flex-row'>
                <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Our Services</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2'>
                    <text className='text-white flex lg:hidden'>--</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------</text>
                    {/* <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text> 
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text> */}
                </div>
                <a className='text-green-700 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2'>
                    <text className='text-white flex lg:hidden'>--</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------------</text>
                    {/* <text className='text-white flex max-md:hidden max-lg:hidden'>---------------</text> 
                    {/* <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text> */}
                </div>
                <a className='max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>

            <div className='flex flex-col items-end mt-12'>
                <p className='text-4xl'>
                    <a className='text-[#a1a1a1]'>Transform Your Farming Experience with</a> Our Cutting-Edge Solutions
                </p>
                <p className='text-4xl pr-8'>
                    Elevate your agricultural practices with our all-encompassing suite of services  
                </p>
                <p className='text-4xl pr-44'>
                    leverage our technology <a className='text-[#a1a1a1] pr-96'>for machinery analysis</a> 
                </p>
            </div>

            <div className='flex flex-row max-md:flex-col max-lg:flex-col justify-between mt-20 space-x-12 max-md:mt-4 max-lg:mt-4'>
   
                <div className='flex justify-start relative items-start p-12 rounded-xl w-full h-96 max-md:w-auto max-lg:w-auto overflow-hidden'>
                    <Image
                        alt=""
                        src={smartHarvestRobot}
                        layout="fill"
                        objectFit="cover"
                        style={{
                            filter: "blur(2px) brightness(0.5)",
                        }}
                    />  
                    <div className='flex flex-col absolute'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-center text-xl text-[#cecdce]'>Smart Harvesting</h1>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <p className='mt-12 text-base text-[#cecdce] max-w-sm mx-auto break-words'>
                            Usamos soluções da AWS de AI para que o robô execute uma 
                            colheita inteligênte, analisando as frutas que podem ser 
                            colhidas ou quando poderão ser colhidas, verificando 
                            possíveis métodos para a saúde do que está sendo plantado.</p>
                    </div>
                </div>

                <div className='flex justify-start relative items-start rounded-xl p-12 w-full h-96 max-md:w-auto max-lg:w-auto overflow-hidden'>
                    <Image
                        alt=""
                        src={analyseSoilRobot}
                        layout="fill"
                        objectFit="cover"
                        style={{
                            filter: "blur(2px) brightness(0.5)"
                        }}
                    />  
                    <div className='flex flex-col absolute'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-center text-xl text-[#cecdce]'>Smart Soil Analysis</h1>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <p className='mt-12 text-base text-[#cecdce] max-w-sm mx-auto break-words'>
                            Usamos soluções da AWS de AI para que o robô colete as medidas de
                            pH, temperatura e umidade do solo, captando também o clima da semana
                            na determinada região. Após essas etapas, todas essas métricas são unidas
                            e processadas, provendo recomendações para que o solo do agricultor possa 
                            sempre dar muitos frutos.
                        </p>
                    </div>
                </div>
       
                <div className='flex justify-start relative items-start rounded-xl p-12 w-full h-96 max-md:w-auto max-lg:w-auto overflow-hidden'>
                    <Image
                        alt=""
                        src={sensorsSoilRebot}
                        layout="fill"
                        objectFit="cover"
                        style={{
                            filter: "blur(2px) brightness(0.5)"
                        }}
                    />  
                    <div className='flex flex-col absolute'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-center text-xl text-[#cecdce]'>Smart Sensors</h1>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <p className='mt-12 text-base text-[#cecdce] max-w-sm mx-auto break-words'>
                            Sensores de proximidade, rodas de trator, cameras e outros Sensores
                            do mesmo são usados no robô para que suas atividades possam ser 
                            exercidas com a capacidade essencial e segurança que pode ser 
                            exercida por um ser humano, mas através de um robô.</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row mt-20'>
                <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Other Services</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2'>
                    <text className='text-white flex lg:hidden'>--</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------</text>
                    {/* <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text> 
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text> */}
                </div>
                <a className='text-green-700 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2'>
                    <text className='text-white flex lg:hidden'>--</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>-----------------------------</text>
                    {/* <text className='text-white flex max-md:hidden max-lg:hidden'>---------------</text> 
                    {/* <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text> */}
                </div>
                <a className='max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>

            {/* <div className="flex flex-row justify-between max-md:flex-col max-lg:flex-col max-md:space-y-4 max-lg:space-y-4 mt-6 max-md:mt-12 max-lg:mt-12">       
            </div> */}

            <div className='flex flex-col px-32 mt-12'>
                <p className='px-44 text-4xl'>
                    <a className='text-[#a1a1a1]'>Our advanced services include greenhouse management</a>
                </p>
                <p className='text-4xl px-44'>for real-time crop health and location insights,</p>
                <p className='px-16 text-4xl'>
                    precise soil climate analysis, in-depth soil climate analysis,
                </p>
                <p className='px-8 text-4xl'>
                    comprehensive farm mapping, <a className='text-[#a1a1a1]'>and detailed fruit control.</a> 
                </p>
            </div>

            <div className='flex flex-row justify-between mt-12'>
                <a className='text-xl font-normal text-[#757575]'>Discover the Distinct Advantages of Partnering with Terra Farming</a>
                <button className='bg-green-700 py-4 px-8 rounded-full'>
                    <a className='text-white'>All Benefits</a>
                </button>
            </div>

            <div className="flex flex-col max-md:flex-col max-lg:flex-col justify-between max-md:space-y-12 max-lg:space-y-12">
                <div className='flex flex-row max-md:flex-col max-lg:flex-col justify-between mt-12 space-x-8 max-md:space-y-12 max-lg:space-y-12'>
                    
                    <div className='flex flex-col'>
                        <div className="flex flex-col bg-green-900 rounded-xl w-auto h-auto px-4 py-4 relative overflow-hidden">
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-row'>
                                    <a className='text-[#659076]'>01</a>
                                    <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Controle de Estufas</h1>
                                </div>
                                <CgArrowTopRightO size={40} color='white'/>
                            </div>
                            <div className='flex flex-col items-start mt-12'>
                                <p className='text-[#659076]'>
                                    Gerenciamento e Monitoramento de Estufas: Localização e Saúde das Culturas
                                </p>
                                <a className='text-[#ebf0ed] mt-2 text-base'>
                                    Este serviço envolve o monitoramento da localização 
                                    e saúde das estufas agrícolas. Ele pode utilizar 
                                    sensores IoT para coletar dados sobre a temperatura, 
                                    umidade, e outras condições ambientais dentro das 
                                    estufas. Informações sobre a saúde das plantas e 
                                    possíveis problemas são analisadas para garantir 
                                    condições ideais de crescimento. A integração com 
                                    AWS IoT Core permite o envio e processamento de 
                                    dados em tempo real, e o AWS CloudWatch pode ser 
                                    utilizado para monitoramento e alertas.
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-col mt-20'>                            
                            <p className='text-[#a0a0a0] text-3xl'>// Sustainable Agriculture,</p>
                            <a className='text-end text-3xl'>Shared Values.</a>
                        </div>
                    </div>

                    <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-20 relative overflow-hidden">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row'>
                                <a className='text-[#659076]'>02</a>
                                <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Analise do clima sob o solo</h1>
                            </div>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <div className='flex flex-col items-start mt-12'>
                            <p className='text-[#659076]'>
                                Gerenciamento e Monitoramento de Estufas: Localização e Saúde das Culturas
                            </p>
                            <a className='text-[#ebf0ed] mt-2 text-base'>
                                Este serviço envolve o monitoramento da localização 
                                e saúde das estufas agrícolas. Ele pode utilizar 
                                sensores IoT para coletar dados sobre a temperatura, 
                                umidade, e outras condições ambientais dentro das 
                                estufas. Informações sobre a saúde das plantas e 
                                possíveis problemas são analisadas para garantir 
                                condições ideais de crescimento. A integração com 
                                AWS IoT Core permite o envio e processamento de 
                                dados em tempo real, e o AWS CloudWatch pode ser 
                                utilizado para monitoramento e alertas.
                            </a>
                        </div>
                    </div>

                    <div className='flex flex-col w-auto'>
                        <div className='flex flex-col'>                            
                            <p className='text-[#a0a0a0] text-3xl'>// Sustainable Agriculture,</p>
                            <a className='text-end text-3xl'>Shared Values.</a>
                        </div>
                        <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-20 relative overflow-hidden">
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-row'>
                                    <a className='text-[#659076]'>02</a>
                                    <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Analise do clima sob o solo</h1>
                                </div>
                                <CgArrowTopRightO size={40} color='white'/>
                            </div>
                            <div className='flex flex-col items-start mt-12'>
                                <p className='text-[#659076]'>
                                    Gerenciamento e Monitoramento de Estufas: Localização e Saúde das Culturas
                                </p>
                                <a className='text-[#ebf0ed] mt-2 text-base'>
                                    Este serviço envolve o monitoramento da localização 
                                    e saúde das estufas agrícolas. Ele pode utilizar 
                                    sensores IoT para coletar dados sobre a temperatura, 
                                    umidade, e outras condições ambientais dentro das 
                                    estufas. Informações sobre a saúde das plantas e 
                                    possíveis problemas são analisadas para garantir 
                                    condições ideais de crescimento. A integração com 
                                    AWS IoT Core permite o envio e processamento de 
                                    dados em tempo real, e o AWS CloudWatch pode ser 
                                    utilizado para monitoramento e alertas.
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex flex-row max-md:flex-col max-lg:flex-col justify-between mt-4 space-x-8 max-md:space-y-12 max-lg:space-y-12'>

                    <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-12 relative overflow-hidden">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row'>
                                <a className='text-[#659076]'>02</a>
                                <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Analise do clima sob o solo</h1>
                            </div>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <div className='flex flex-col items-start mt-12'>
                            <p className='text-[#659076]'>
                                Gerenciamento e Monitoramento de Estufas: Localização e Saúde das Culturas
                            </p>
                            <a className='text-[#ebf0ed] mt-2 text-base'>
                                Este serviço envolve o monitoramento da localização 
                                e saúde das estufas agrícolas. Ele pode utilizar 
                                sensores IoT para coletar dados sobre a temperatura, 
                                umidade, e outras condições ambientais dentro das 
                                estufas. Informações sobre a saúde das plantas e 
                                possíveis problemas são analisadas para garantir 
                                condições ideais de crescimento. A integração com 
                                AWS IoT Core permite o envio e processamento de 
                                dados em tempo real, e o AWS CloudWatch pode ser 
                                utilizado para monitoramento e alertas.
                            </a>
                        </div>
                    </div>
                    

                    <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-32 relative overflow-hidden">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row'>
                                <a className='text-[#659076]'>02</a>
                                <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Analise do clima sob o solo</h1>
                            </div>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <div className='flex flex-col items-start mt-12'>
                            <p className='text-[#659076]'>
                                Gerenciamento e Monitoramento de Estufas: Localização e Saúde das Culturas
                            </p>
                            <a className='text-[#ebf0ed] mt-2 text-base'>
                                Este serviço envolve o monitoramento da localização 
                                e saúde das estufas agrícolas. Ele pode utilizar 
                                sensores IoT para coletar dados sobre a temperatura, 
                                umidade, e outras condições ambientais dentro das 
                                estufas. Informações sobre a saúde das plantas e 
                                possíveis problemas são analisadas para garantir 
                                condições ideais de crescimento. A integração com 
                                AWS IoT Core permite o envio e processamento de 
                                dados em tempo real, e o AWS CloudWatch pode ser 
                                utilizado para monitoramento e alertas.
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-48 relative overflow-hidden">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row'>
                                <a className='text-[#659076]'>02</a>
                                <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Analise do clima sob o solo</h1>
                            </div>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <div className='flex flex-col items-start mt-12'>
                            <p className='text-[#659076]'>
                                Gerenciamento e Monitoramento de Estufas: Localização e Saúde das Culturas
                            </p>
                            <a className='text-[#ebf0ed] mt-2 text-base'>
                                Este serviço envolve o monitoramento da localização 
                                e saúde das estufas agrícolas. Ele pode utilizar 
                                sensores IoT para coletar dados sobre a temperatura, 
                                umidade, e outras condições ambientais dentro das 
                                estufas. Informações sobre a saúde das plantas e 
                                possíveis problemas são analisadas para garantir 
                                condições ideais de crescimento. A integração com 
                                AWS IoT Core permite o envio e processamento de 
                                dados em tempo real, e o AWS CloudWatch pode ser 
                                utilizado para monitoramento e alertas.
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}