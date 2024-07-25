import React from 'react'

export const AboutSection = () => {
    return (
        <div className="flex flex-col bg-white px-12 mt-20">
            <div className='flex flex-row'>
                <h1 className='text-[#020405] text-3xl font-normal'>About</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 mt-7 ml-4'>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                </div>
            </div>

            <div className='flex max-md:flex-col md:flex-col lg:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                {['AIGreenHavest', 'AIGreenFarm', 'AIGreenTech', 'AIFarmTech', 'AIMetrics', 'AIGreenhouse'].map((item, index) => (
                    <p key={index} className='flex justify-center'>
                        <a className='text-black text-lg md:text-xl font-normal group-hover:text-gray-300 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded underline underline-offset-2'>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </a>
                    </p>
                ))}
            </div>
            
            <div className='mt-12 mb-4'>
                <h1 className='text-[#020405] text-base font-normal'>
                    We are on a mission to transform modern agriculture through cutting-edge
                    Technology, using AI with robotic solutions. We specialize in providing innovative 
                    solutions to the farming industry, with a primary focus on our state-of-the-art 
                    Smart Farming VMB Robot Picking and Fruit, Transportation and Analysis Soil, 
                    providing agriculture metrics by AI and robot features. 
                </h1>
            </div>
        </div>
    )
}