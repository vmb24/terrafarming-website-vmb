// components/ui/organisms/IAgrixiAssistantSection.tsx
'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes'

import { GoArrowRight } from 'react-icons/go';

import iagrixiBackgroundGif from '@/assets/application-images/iagrixi-assistant/gifs/iagrixi-assistant.gif'; // Adicione seu GIF ao diretório assets

export const IAgrixiAssistantSection: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-col absolute top-[4850px] bottom-0 left-0 right-0 px-32 max-md:mt-32 max-lg:mt-32 max-md:px-8 max-lg:px-8 w-full h-[80vh] overflow-hidden">
            {/* Background GIF */}
            <Image
                alt="Promoção da IA IAgrixi"
                src={iagrixiBackgroundGif}
                layout="fill"
                objectFit="cover"
                style={{
                    filter: 'blur(2px) brightness(0.5)',
                }}
                className="absolute inset-0 z-0"
            />

            {/* Conteúdo sobre acessibilidade */}
            <div className='flex flex-row mt-8 relative overflow-hidden justify-start'>
                <h1 className='text-white text-3xl font-normal'>Potencialize sua Agricultura com IAgrixi!</h1>
            </div>

            <div className='flex flex-col mt-96 max-md:mt-56 max-lg:mt-56'>
                <div className='flex flex-col absolute'>
                    <h1 className='text-bold text-5xl max-md:text-3xl max-lg:text-5xl text-white'>Inteligência Artificial a Serviço da sua Agricultura!</h1>
                </div>

                {/* Frases adicionais */}
                <div className='flex flex-col absolute mt-20 max-md:mt-32 max-lg:mt-32'>
                    <h1 className='text-bold text-xl text-white'>Analise dados em tempo real e receba recomendações para melhorar a eficiência da sua fazenda.</h1>
                    <h1 className='text-bold text-xl text-white'>IAgrixi monitora o solo, clima, e muito mais, automatizando decisões inteligentes para você.</h1>
                </div>
                <Link href="/plans" className={`flex flex-row justify-center space-x-2 absolute p-4 w-64 rounded-full bg-white mt-40
                                ${theme === 'dark'
                                    ? 'bg-[linear-gradient(135deg,#1a365d,#2f855a)] shadow-[0_0_20px_rgba(26,54,93,0.5),0_0_40px_rgba(47,133,90,0.3)]'
                                    : 'bg-gradient-to-b from-green-300 to-green-100 shadow-lg'
                                }`}>
                    <text className='text-green-500 font-bold'>Experimente Agora!</text>
                    <GoArrowRight size={25} color='green'/>
                </Link>
            </div>
        </div>
    );
};

export default IAgrixiAssistantSection;
