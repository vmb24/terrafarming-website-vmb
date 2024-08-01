/* eslint-disable react/no-string-refs */
import Image from 'next/image'
import Link from "next/link"

import smartHarvestRobot from '../../assets/smart-harvest-robots.png'

import googleLogo from '@/assets/auth/google-logo.png'
import appleLogo from '@/assets/auth/apple-logo-transparent.png'
import instagramLogo from '@/assets/auth/instagram-logo-transparent.png'

import { BsArrowLeftCircleFill } from 'react-icons/bs'

export const LoginSession = () => {
    return (
        <div className="relative w-full h-screen px-12 overflow-hidden">
            <Image
                alt=""
                src={smartHarvestRobot}
                layout="fill"
                objectFit="cover"
                style={{
                    filter: "blur(2px) brightness(0.5)"
                }}
            />

            <div className="absolute top-0 left-0 right-0 flex flex-col md:flex-row justify-between p-6 md:p-8 z-10">
                <div className='flex flex-row justify-between'>
                    <a href="#TerraFarming" className='flex justify-start mb-4 md:mb-0'>
                        <h1 className='text-green-500 text-xl md:text-3xl font-bold group-hover:text-green-200 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded py-2'>
                            TerraFarming
                        </h1>
                    </a>

                    <Link href="/" className='
                        flex flex-row justify-center items-center relative w-40 max-md:w-8 max-lg:w-8 max-md:h-8 max-lg:h-8 rounded-full bg-green-500 ml-4'>
                        <BsArrowLeftCircleFill size={20} className='ml-2'/>
                    </Link>
                </div>

                <h1 className="text-white text-5xl max-md:text-5xl max-lg:text-5xl mt-12 font-bold text-left">
                    Your farm always smarter!
                </h1>

                <div className="flex flex-col justify-around mt-20">
                    <div className='form space-y-2'>
                        <h1 className='text-white font-normal text-lg ml-2'>Email</h1>
                        <input
                            className='p-2 bg-black text-white text-sm rounded-2xl mb-3 max-md:w-full max-lg:w-full'
                            placeholder="Email/Username"
                        />
                    </div>

                    <div className='form space-y-2 mt-8'>
                        <h1 className='text-white font-normal text-lg ml-2'>Password</h1>
                        <input
                            className='p-2 bg-black text-white text-sm rounded-2xl mb-3 max-md:w-full max-lg:w-full'
                            placeholder="Email/Username"
                        />
                    </div>

                    <Link href="/" className='
                        flex flex-row justify-center items-center relative w-40 mt-8 max-md:w-auto max-lg:w-auto max-md:h-12 max-lg:h-12 rounded-full bg-green-500'>
                        <h1 className='text-white'>Login to Admin</h1>
                        <BsArrowLeftCircleFill size={20} className='ml-2'/>
                    </Link>

                    <h1 className='text-xl text-white font-bold text-center py-5'>
                        Or
                    </h1>

                    <div className='flex flex-row justify-center space-x-4'>
                        <div className='rounded-full max-md:w-auto max-lg:h-auto'>
                            <Link href="" className='p-2 mx-3 rounded-2xl'>
                                <Image
                                    alt=""
                                    src={googleLogo}
                                    objectFit="cover"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        marginRight: 5
                                    }}
                                />
                            </Link>
                        </div>
                        
                        <div className='rounded-full max-md:w-auto max-lg:h-auto'>
                            <Link href="" className='p-2 mx-3'>
                                <Image
                                    alt=""
                                    src={appleLogo}
                                    objectFit="cover"
                                    style={{
                                        width: 55,
                                        height: 55,
                                        marginTop: -10
                                    }}
                                />
                            </Link>
                        </div>

                        <div className='rounded-full max-md:w-auto max-lg:h-auto'>
                            <Link href="" className='p-2 mx-3'>
                                <Image
                                    alt=""
                                    src={instagramLogo}
                                    objectFit="cover"
                                    style={{
                                        width: 60,
                                        height: 60,
                                        marginTop: -10
                                    }}
                                />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}