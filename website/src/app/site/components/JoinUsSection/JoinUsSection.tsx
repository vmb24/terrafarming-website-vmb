/* eslint-disable react/jsx-no-comment-textnodes */
import Image from 'next/image'

import agriculturalTecnology from '@/assets/sustainable-agriculture-join-us.jpg'

export const JoinUsSection = () => {
    return (
        <div className="lg:absolute max-md:relative max-lg:relative lg:top-[6350px] bottom-0 left-0 right-0 w-full h-[80vh] max-md:h-[35vh] max-lg:h-[35vh] mt-12 overflow-hidden">
            <div className='flex flex-row justify-center px-32'>
                <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Junte-se a nós</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[39vw] max-md:w-[20vw] max-lg:w-[20vw]' />
                <a className='text-green-700 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[39vw] max-md:w-[20vw] max-lg:w-[20vw]' />
                <a className='max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>
            <Image
                alt=""
                src={agriculturalTecnology}
                layout="responsive"
                objectFit="cover"
                style={{
                    filter: "blur(2px) brightness(0.7)"
                }}
                className='mt-16 max-md:mt-4 max-lg:mt-4'
            />
            <div className='inset-0 flex flex-col absolute mt-32 max-md:mt-16 max-lg:mt-16'>
                <div className='flex flex-row absolute px-12 max-md:space-x-20 max-lg:space-x-20 py-8 space-x-36'>
                    <h1 className='text-white max-md:text-md max-lg:text-md max-md:pr-4 max-lg:pr-4'>// Junte-se a nós</h1>
                    <h1 className='text-white max-md:text-md max-lg:text-md'>// Junte-se a nós</h1>
                    <h1 className='text-white max-md:text-md max-lg:text-md'>// Junte-se a nós</h1>
                    <h1 className='text-white max-md:hidden max-lg:hidden'>// Junte-se a nós</h1>
                    <h1 className='text-white max-md:hidden max-lg:hidden'>// Junte-se a nós</h1>
                    <h1 className='text-white max-md:hidden max-lg:hidden'>// Junte-se a nós</h1>
                </div>
                <div className='flex flex-col w-[1000px] max-md:w-[100vw] max-lg:w-[100vw] mx-[350px] max-md:mx-[0px] max-lg:mx-[0px] max-md:px-auto max-lg:px-auto max-md:my-28 max-lg:my-28 my-40'>
                    <h1 className='text-white text-8xl text-center max-md:text-xl max-lg:text-xl'>Participe da Revolução</h1>
                    <h1 className='text-white text-8xl text-center max-md:text-xl max-lg:text-xl'>Agrícola</h1>
                    <div className='flex items-center justify-center w-[1000px] max-md:w-[100vw] max-lg:w-[100vw] max-md:mt-4 max-lg:mt-4 my-8'>
                        <div className='relative flex items-center justify-center mx-[250px] max-md:mx-[10px] max-lg:mx-[10px] max-md:w-[80vw] max-lg:w-[80vw]'>
                            <input
                                placeholder='Seu endereço de email'
                                className='h-20 max-md:h-12 max-lg:h-12 w-[500px] px-8 rounded-full bg-white pr-20'
                            />
                            <button className='absolute right-2 h-16 max-md:h-10 max-lg:h-10 w-56 max-md:w-[25vw] max-lg:w-[25vw] flex items-center justify-center rounded-full bg-green-700'>
                                <a className='text-white max-md:text-sm max-lg:text-sm'>Registre-se já!</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}