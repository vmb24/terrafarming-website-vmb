import { RiRobot3Line } from 'react-icons/ri'
import { GiPlantRoots } from 'react-icons/gi'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { SiClockify } from 'react-icons/si'

export const WhyChooseUsSections = () => {
    return (
        <div className="flex flex-col bg-white px-12 mt-20 max-md:mt-8 max-lg:mt-8">
            <div className='flex flex-row mt-12'>
                <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Why Choose Us ?</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[36vw] max-md:w-[6vw] max-lg:w-[6vw]' />
                <a className='text-green-700 text-xl max-md:ml-2 max-lg:ml-2'>TerraFarming</a>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2 lg:w-[36vw] max-md:w-[6vw] max-lg:w-[6vw]' />
                <a className='max-md:text-sm max-lg:text-sm ml-2 max-md:mt-1 max-lg:mt-1'>© {new Date().getFullYear()}</a>
            </div>

            <div className='flex flex-col items-end mt-12'>
                <p className='text-4xl max-md:text-2xl max-lg:text-2xl'>
                    <a className='text-[#a1a1a1]'>Why Choose TerraFarming</a> for Your Agricultural Journey ?
                </p>
                <p className='text-4xl pr-8 max-md:text-2xl max-lg:text-2xl'>
                    Unveiling the Unique Advantages and Sustainable AI Robot Solutions  
                </p>
                <p className='text-4xl pr-44 max-md:pr-12 max-lg:pr-12 max-md:text-2xl max-lg:text-2xl'>
                    That Cultivate Success and <a className='text-[#a1a1a1]'>Foster Growth Together</a>
                </p>
            </div>

            <div className="flex flex-row max-md:flex-col max-lg:flex-col justify-between mt-20 max-md:space-y-12 max-lg:space-y-12 max-md:mt-12 max-lg:mt-12">
                <div className='flex flex-col items-center'>
                    <div className="flex flex-col bg-[#f6f6f6] rounded-xl w-72 h-56 relative overflow-hidden justify-center items-center">
                        <RiRobot3Line size={100}/>
                    </div>
                    <h1 className='text-center mt-4 text-xl'>Cutting-Edge Technology</h1>
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
                    <h1 className='text-center mt-4 text-xl'>Sustainability</h1>
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
                    <h1 className='text-center mt-4 text-xl'>Increased Profitability</h1>
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
                    <h1 className='text-center mt-4 text-xl'>Reliability</h1>
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