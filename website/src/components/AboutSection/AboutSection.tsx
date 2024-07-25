import React from 'react'

export const AboutSection = () => {
    return (
        <div className="flex flex-col bg-white px-12 mt-20">
            <div className='flex flex-row'>
                <h1 className='text-[#020405] text-3xl font-normal'>About</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 mt-7 ml-4'>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white'>----------------------------------</text>
                </div>
            </div>
            <div className="flex flex-row  mt-4 justify-between">
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>AIGreenHavest</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>AIGreenFarm</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>AIGreenTech</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>AIFarmTech</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>AIMetrics</h1>
                <h1 className='text-[#020405] text-base font-normal underline underline-offset-2'>AIGreenhouse</h1>
            </div>
            <div className='mt-16 mb-12'>
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