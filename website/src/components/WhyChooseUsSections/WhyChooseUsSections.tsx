import { RiRobot3Line } from 'react-icons/ri'
import { GiPlantRoots } from 'react-icons/gi'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { SiClockify } from 'react-icons/si'

export const WhyChooseUsSections = () => {
    return (
        <div className="flex flex-col bg-white px-12 mt-40">
            <div className='flex flex-row'>
                <h1 className='text-[#020405] text-4xl font-normal'>Why Choose Us ?</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 mt-9 ml-12'>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white'>----------------------------------</text>
                    <text className='text-white'>----------------------------------</text>
                </div>
            </div>

            <div className="flex flex-row justify-between mt-20">
                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <RiRobot3Line size={100}/>
                    </div>
                    <h1 className='text-center mt-2 text-xl'>Cutting-Edge Technology</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 max-w-sm mx-auto text-center break-words'>
                        We harness the power of robots 
                        and artificial intelligence to ensure
                        unmatched efficiency and precision.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <GiPlantRoots size={100}/>
                    </div>
                    <h1 className='text-center mt-2 text-xl'>Sustainability</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 max-w-sm mx-auto text-center break-words'>
                        Our services foster sustainable 
                        farming practices reducing labor,
                        waste and environmental impact.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <FaMoneyBillTrendUp size={100}/>
                    </div>
                    <h1 className='text-center mt-2 text-xl'>Increased Profitability</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 max-w-sm mx-auto text-center break-words'>
                        We aid farmers in maximizing their
                        returns by optimizing the fruit-picking
                        and transportation process.
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <SiClockify size={100}/>
                    </div>
                    <h1 className='text-center mt-2 text-xl'>Reliability</h1>
                    <p className='mt-4 px-12 text-base text-gray-700 max-w-sm mx-auto text-center break-words'>
                        Our robots operate round the clock,
                        delivering unwavering performance 
                        and quality.
                    </p>
                </div>
            </div>



        </div>
    )
} 