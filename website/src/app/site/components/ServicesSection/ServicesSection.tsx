/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import cropManagement from '@/assets/application-images/crop-management.png'
import predictiveAnalisys from '@/assets/application-images/predictive-analisys.png'
import envIrrigationSystem from '@/assets/application-images/env-irrigation-system.png'

import { CgArrowTopRightO } from "react-icons/cg"

export const ServicesSection = () => {
    return (
        <div className='flex flex-col px-12 mt-[880px] max-md:px-12 max-lg:px-12'>
            <div className='flex flex-row'>
                <h1 className='text-[#020405] dark:text-[#FFFFFF] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Nossos Serviços</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[37vw] max-md:w-[10vw] max-lg:w-[10vw]' />
                <a className='text-green-700 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[37vw] max-md:w-[10vw] max-lg:w-[10vw]' />
                <a className='max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>

            <div className='flex flex-col items-end mt-12'>
                <p className='text-4xl max-md:text-3xl max-lg:text-3xl'>
                    <a className='text-[#a1a1a1]'>Transforme sua experiência agrícola com</a> nossas soluções de ponta.
                </p>
                <p className='text-4xl pr-8 max-md:text-3xl max-lg:text-3xl'>
                    Eleve suas práticas agrícolas com nosso conjunto abrangente de serviços  
                </p>
                <p className='text-4xl pr-44 max-md:text-3xl max-lg:text-3xl max-md:pr-20 max-lg:pr-20'>
                    Aproveite nossa tecnologia <a className='text-[#a1a1a1] pr-96 max-md:pr-4 max-lg:pr-4'>para análise inteligente.</a> 
                </p>
            </div>

            <div className='flex flex-row max-md:flex-col max-lg:flex-col justify-between mt-20 lg:space-x-12 max-md:mt-12 max-lg:mt-12'>
   
                <div className='flex justify-center relative items-center max-md:justify-center max-lg:justify-center p-12 rounded-xl w-full h-96 max-md:w-auto max-lg:w-auto overflow-hidden'>
                    <Image
                        alt=""
                        src={cropManagement}
                        layout="fill"
                        objectFit="cover"
                        style={{
                            filter: "blur(2px) brightness(0.5)",
                        }}
                    />  
                    <div className='flex flex-col absolute'>
                        <div className='flex flex-row items-center'>
                            <div>
                                <h1 className='text-center text-xl text-[#cecdce] pr-2'>Monitoramento Inteligente</h1>
                                <h1 className='text-center text-xl text-[#cecdce] pr-2'>de Culturas</h1>
                            </div>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <p className='mt-12 text-base text-[#cecdce] max-w-sm mx-auto break-words'>
                            Utilize sensores avançados para monitorar em tempo real a umidade do solo, 
                            temperatura, luminosidade e condições atmosféricas. Nossa IA analisa esses 
                            dados para otimizar o crescimento das plantas e prevenir problemas antes 
                            que ocorram.</p>
                    </div>
                </div>

                <div className='flex justify-center relative items-center max-md:justify-center max-lg:justify-center p-12 rounded-xl w-full h-96 max-md:w-auto max-lg:w-auto overflow-hidden max-md:mt-12 max-lg:mt-12'>
                    <Image
                        alt=""
                        src={predictiveAnalisys}
                        layout="fill"
                        objectFit="cover"
                        style={{
                            filter: "blur(2px) brightness(0.5)"
                        }}
                    />  
                    <div className='flex flex-col absolute'>
                        <div className='flex flex-row items-center'>
                            <h1 className='text-center text-xl text-[#cecdce]'>Previsões e Recomendações Personalizadas</h1>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <p className='mt-12 text-base text-[#cecdce] max-w-sm mx-auto break-words'>
                            Com base na análise de dados históricos e atuais, nosso sistema fornece 
                            previsões precisas de rendimento e janelas ideais de plantio. Receba 
                            recomendações personalizadas para irrigação, fertilização e manejo 
                            de pragas, maximizando sua produtividade.
                        </p>
                    </div>
                </div>
       
                <div className='flex justify-center relative items-center max-md:justify-center max-lg:justify-center rounded-xl p-12 w-full h-96 max-md:w-auto max-lg:w-auto overflow-hidden max-md:mt-12 max-lg:mt-12'>
                    <Image
                        alt=""
                        src={envIrrigationSystem}
                        layout="fill"
                        objectFit="cover"
                        style={{
                            filter: "blur(2px) brightness(0.5)"
                        }}
                    />  
                    <div className='flex flex-col absolute'>
                        <div className='flex flex-row items-center'>
                            <h1 className='text-center text-xl text-[#cecdce] pr-2'>Gestão Sustentável e Eficiente</h1>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <p className='mt-12 text-base text-[#cecdce] max-w-sm mx-auto break-words'>
                            Otimize o uso de recursos com nosso sistema de 
                            irrigação inteligente e gerenciamento sustentável 
                            de pragas. Monitore o impacto climático na sua 
                            lavoura e tome decisões informadas para proteger 
                            suas culturas e aumentar a eficiência operacional.</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row mt-12'>
                <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-9 max-lg:mt-9 font-normal'>Nossos Serviços</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-12 max-lg:mt-12 mt-4 ml-2 lg:w-[37vw] max-md:w-[10vw] max-lg:w-[10vw]' />
                <a className='text-green-700 text-xl max-md:ml-2 max-lg:ml-2 max-md:mt-8 max-lg:mt-8'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-12 max-lg:mt-12 mt-4 ml-2 lg:w-[37vw] max-md:w-[10vw] max-lg:w-[10vw]' />
                <a className='max-md:text-sm max-lg:text-sm ml-2 max-md:mt-9 max-lg:mt-9'>© {new Date().getFullYear()}</a>
            </div>

            {/* <div className="flex flex-row justify-between max-md:flex-col max-lg:flex-col max-md:space-y-4 max-lg:space-y-4 mt-6 max-md:mt-12 max-lg:mt-12">       
            </div> */}

            <div className='flex flex-col px-32 max-md:px-0 max-lg:px-0 mt-12 max-md:mt-8 max-lg:mt-8'>
                <p className='px-44 max-md:px-0 max-lg:px-0 text-4xl max-md:text-3xl max-lg:text-3xl'>
                    <a className='text-[#a1a1a1]'>Nossos serviços avançados incluem o gerenciamento do seu ambiente agrícola</a>
                </p>
                <p className='text-4xl px-44 max-md:text-3xl max-lg:text-3xl max-md:px-0 max-lg:px-0'>para obter informações em tempo real sobre a saúde cultural da sua agricultura,</p>
                <p className='px-16 text-4xl max-md:text-3xl max-lg:text-3xl max-md:px-0 max-lg:px-0'>
                    com análise aprofundada das principais métricas do solo,
                </p>
                <p className='px-8 text-4xl max-md:text-3xl max-lg:text-3xl max-md:px-0 max-lg:px-0'>
                    assistencia com base prévia nos seus dados <a className='text-[#a1a1a1]'>e controle detalhado da sua cultura.</a> 
                </p>
            </div> 

            <div className='flex flex-row justify-between mt-12'>
                <a className='text-xl font-normal text-[#757575]'>Descubra as vantagens distintas da parceria com a TerraFarming</a>
                <Link href="/plans" className='bg-green-700 py-4 max-md:p-4 max-lg:p-4 px-8 rounded-full'>
                    <h1 className='text-white max-md:text-sm max-lg:text-sm'>Todos os Benefícios</h1>
                </Link>
            </div>

            <div className="flex flex-col max-md:flex-col max-lg:flex-col justify-between max-md:space-y-12 max-lg:space-y-12">
                <div className='flex flex-row max-md:flex-col max-lg:flex-col justify-between mt-12 space-x-8 max-md:space-y-12 max-lg:space-y-12'>
                    
                    <div className='flex flex-col'>
                        <div className="flex flex-col bg-green-900 rounded-xl w-auto h-auto px-4 py-4 relative overflow-hidden">
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-row'>
                                    <a className='text-[#659076]'>01</a>
                                    <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Controle Inteligente de Estufas</h1>
                                </div>
                                <CgArrowTopRightO size={40} color='white'/>
                            </div>
                            <div className='flex flex-col items-start mt-12'>
                                <p className='text-[#659076]'>
                                    Otimização do Ambiente de Cultivo
                                </p>
                                <a className='text-[#ebf0ed] mt-2 text-base'>
                                    Monitore e ajuste automaticamente temperatura, 
                                    umidade e luminosidade em suas estufas. Sensores IoT 
                                    avançados coletam dados em tempo real, permitindo 
                                    condições ideais para cada cultura e maximizando 
                                    o rendimento.
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-col mt-20 max-md:mt-4 max-lg:mt-4'>                            
                            <p className='text-[#a0a0a0] text-3xl max-md:hidden max-lg:hidden'>// Agricultura sustentável,</p>
                            <a className='text-end text-3xl max-md:hidden max-lg:hidden'>Valores compartilhados.</a>
                        </div>
                    </div>

                    <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-20 relative overflow-hidden">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row'>
                                <a className='text-[#659076]'>02</a>
                                <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Gestão Precisa da Irrigação</h1>
                            </div>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <div className='flex flex-col items-start mt-12'>
                            <p className='text-[#659076]'>
                                Economia de Água e Saúde das Plantas
                            </p>
                            <a className='text-[#ebf0ed] mt-2 text-base'>
                                Utilize dados de umidade do solo para irrigação 
                                inteligente. Nosso sistema analisa as necessidades 
                                hídricas de cada cultura, programando regas eficientes 
                                e evitando desperdícios, garantindo plantas saudáveis 
                                e uso sustentável da água.
                            </a>
                        </div>
                    </div>

                    <div className='flex flex-col w-auto'>
                        <div className='flex flex-col'>                            
                            <p className='text-[#a0a0a0] text-3xl max-md:hidden max-lg:hidden'>// Agricultura sustentável,</p>
                            <a className='text-end text-3xl max-md:hidden max-lg:hidden'>Valores compartilhados.</a>
                        </div>
                        <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-20 max-md:mt-4 max-lg:mt-4 relative overflow-hidden">
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-row'>
                                    <a className='text-[#659076]'>02</a>
                                    <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Monitoramento da Saúde do Solo</h1>
                                </div>
                                <CgArrowTopRightO size={40} color='white'/>
                            </div>
                            <div className='flex flex-col items-start mt-12'>
                                <p className='text-[#659076]'>
                                    Nutrição Otimizada para Culturas
                                </p>
                                <a className='text-[#ebf0ed] mt-2 text-base'>
                                    Analise a temperatura e composição do solo em tempo real. 
                                    Receba recomendações personalizadas de fertilização e manejo, 
                                    assegurando um solo fértil e equilibrado para o crescimento 
                                    ideal das plantas.
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex flex-row max-md:flex-col max-lg:flex-col justify-between mt-4 space-x-8 max-md:space-y-12 max-lg:space-y-12'>

                    <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-12 max-md:mt-4 max-lg:mt-4 relative overflow-hidden">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row'>
                                <a className='text-[#659076]'>02</a>
                                <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Controle Climático Avançado</h1>
                            </div>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <div className='flex flex-col items-start mt-12'>
                            <p className='text-[#659076]'>
                                Adaptação às Condições Meteorológicas
                            </p>
                            <a className='text-[#ebf0ed] mt-2 text-base'>
                                Acompanhe temperatura e umidade do ar, prevendo mudanças 
                                climáticas. Ajuste proativamente suas estratégias de cultivo, 
                                protegendo as culturas contra condições adversas e otimizando 
                                o crescimento.
                            </a>
                        </div>
                    </div>
                    

                    <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-32 relative overflow-hidden">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row'>
                                <a className='text-[#659076]'>02</a>
                                <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Otimização de Luminosidade</h1>
                            </div>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <div className='flex flex-col items-start mt-12'>
                            <p className='text-[#659076]'>
                                Maximização da Fotossíntese
                            </p>
                            <a className='text-[#ebf0ed] mt-2 text-base'>
                                Monitore e ajuste os níveis de luz para cada cultura. 
                                Nossa tecnologia otimiza a exposição à luz natural e 
                                artificial, garantindo o processo de fotossíntese ideal 
                                e impulsionando o crescimento e a produtividade das plantas.
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col bg-green-800 rounded-xl w-auto h-full px-4 py-4 mt-48 relative overflow-hidden">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row'>
                                <a className='text-[#659076]'>02</a>
                                <h1 className='text-[#ebf0ed] text-3xl font-normal underline underline-offset-2 px-2'>Análise Preditiva de Colheitas</h1>
                            </div>
                            <CgArrowTopRightO size={40} color='white'/>
                        </div>
                        <div className='flex flex-col items-start mt-12'>
                            <p className='text-[#659076]'>
                                Planejamento Estratégico da Produção
                            </p>
                            <a className='text-[#ebf0ed] mt-2 text-base'>
                                Utilize IA para prever rendimentos e identificar o 
                                momento ideal de colheita. Baseado em dados históricos 
                                e condições atuais, otimize seu planejamento de produção 
                                e maximize a qualidade e quantidade da sua colheita.
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}