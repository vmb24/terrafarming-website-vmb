/* eslint-disable react/jsx-no-comment-textnodes */
import Image from 'next/image'

import agriculturalTecnology from '@/assets/sustainable-agriculture-join-us.jpg'

export const JoinUsSection = () => {
    return (
        <div className="relative w-full h-[80vh] overflow-hidden">
            <div className='flex flex-row justify-center mt-20'>
                <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Join Us</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2'>
                    <text className='text-white flex lg:hidden'>--</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>---------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>---------------------------------</text>
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
            <Image
                alt=""
                src={agriculturalTecnology}
                layout="fill"
                objectFit="cover"
                style={{
                    filter: "blur(2px) brightness(0.7)"
                }}
                className='mt-32'
            />
            <div className='flex flex-col absolute'>
                <div className='flex flex-row absolute px-12 py-8 space-x-36'>
                    <h1 className='text-white'>// Join Us</h1>
                    <h1 className='text-white'>// Join Us</h1>
                    <h1 className='text-white'>// Join Us</h1>
                    <h1 className='text-white'>// Join Us</h1>
                    <h1 className='text-white'>// Join Us</h1>
                    <h1 className='text-white'>// Join Us</h1>
                    <h1 className='text-white'>// Join Us</h1>
                    <h1 className='text-white'>// Join Us</h1>
                </div>
                <div className='flex flex-col w-[1000px] mx-[350px] my-40'>
                    <h1 className='text-white text-8xl text-center'>Join the Agricultural</h1>
                    <h1 className='text-white text-8xl text-center'>Revolution</h1>
                    <div className='w-[1000px] my-8'>
                        <div className='relative flex items-center mx-[250px]'>
                            <input
                                placeholder='Your email address'
                                className='h-20 w-[500px] px-8 rounded-full bg-white pr-20'
                            />
                            <button className='absolute right-2 h-16 w-56 flex items-center justify-center rounded-full bg-green-700'>
                                <a className='text-white'>Join Now</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}