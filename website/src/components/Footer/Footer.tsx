import { FaCircleArrowRight } from "react-icons/fa6"
import { CgArrowTopRightO } from "react-icons/cg"

export const Footer = () => {
    return (
        <div className="flex flex-col h-auto mt-8 max-md:mt-20 max-lg:mt-20 bg-white px-12">

            <div className='flex flex-row justify-center mt-8'>
                <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Join Us</h1>
                <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2'>
                    <text className='text-white flex lg:hidden'>--</text>
                    <text className='text-white flex max-md:hidden max-lg:hidden'>---------------------------------</text>
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
            
            <div className="flex flex-row justify-between items-center">

                {/* <div className="flex flex-col">
                    <h1 className="text-green-700 font-normal text-2xl max-md:mt-8 max-lg:mt-8">TerraFarming</h1>

                    <h1 className="mt-4 text-gray-500">São Paulo, Brasil</h1>

                    <div className="flex flex-row lg:hidden mt-12">
                        <div className='flex flex-col mr-8'>
                            {['About', 'Services', 'Portifolio', 'Blogs', 'Benefits'].map((item, index) => (
                                <a key={index} href={`#${item}`} className='
                                    flex justify-start 
                                    text-gray-500 
                                    text-normal 
                                    font-normal 
                                    group-hover:text-gray-500 
                                    transition-colors 
                                    duration-300 
                                    cursor-pointer 
                                    hover:bg-green-300 
                                    rounded'>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            ))}
                        </div>

                        <div className='flex flex-col mr-8'>
                            {['LinkedIn', 'Instagram', 'Twitter'].map((item, index) => (
                                <a key={index} href={`#${item}`} className='flex justify-start text-gray-500 text-normal font-normal group-hover:text-gray-500 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            ))}
                        </div>

                        <div className='flex flex-col mr-8'>
                            {['vmb24house@company.com.br'].map((item, index) => (
                                <a key={index} href={`#${item}`} className='flex justify-start text-gray-500 text-normal font-normal group-hover:text-gray-500 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col mt-28 max-md:hidden max-lg:hidden">
                        <p className="text-gray-500 font-normal text-xl">Read to start a conversation ?</p>
                        <p className="text-gray-500 font-normal text-xl">Get in touch with us now.</p>

                        <button className='flex flex-row justify-center relative p-2 w-40 rounded-full bg-green-500 mt-4'>
                            <text className='text-gray-500 text-base font-normal'>Contact Us</text>
                            <FaCircleArrowRight size={25} className='ml-2'/>
                        </button>
                    </div>


                    <div className="flex flex-col mt-12 lg:hidden">
                        <p className="text-gray-500 font-normal text-xl">Read to start a conversation ?</p>
                        <p className="text-gray-500 font-normal text-xl">Get in touch with us now.</p>

                        <button className='flex flex-row justify-center relative p-2 w-40 rounded-full bg-green-500 mt-4'>
                            <text className='text-gray-500 text-base font-normal'>Contact Us</text>
                            <FaCircleArrowRight size={25} className='ml-2'/>
                        </button>

                        <h1 className="text-gray-500 font-bold text-xl mt-8">Or</h1>

                        <h1 className="text-gray-500 font-normal text-xl mt-8">Read to join your community ?</h1>
                        <h1 className="text-gray-500 font-normal text-xl">Subscribe your newsletetter now.</h1>

                        <div className="flex flex-row mt-4">
                            <input className="px-4 rounded-full w-56 h-8" placeholder="Your Email" />
                            <button className='flex flex-row justify-center items-center relative w-12 rounded-full bg-green-500 ml-4'>
                                <FaCircleArrowRight size={25} className='ml-2'/>
                            </button>
                        </div>
                    </div>
                </div> */}

                <div className="flex flex-col mt-12 max-md:hidden max-lg:hidden">

                    <div className="flex flex-row space-x-56">

                        <div className="flex flex-col mr-44">
                            <h1 className="text-green-700 font-normal text-2xl max-md:mt-8 max-lg:mt-8">TerraFarming</h1>
                            <h1 className="mt-2 text-gray-500">São Paulo, Brasil</h1>
                        </div>

                        <div className="flex flex-row space-x-16">
                            <div className='flex flex-col items-start'>
                                {['About', 'Services', 'Portifolio', 'Blogs', 'Benefits'].map((item, index) => (
                                    <a key={index} href={`#${item}`} className='flex justify-center'>
                                        <h1 className='text-gray-500 text-normal font-normal group-hover:text-gray-500 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </h1>
                                    </a>
                                ))}
                            </div>

                            <div className='flex flex-col items-start'>
                                {['LinkedIn', 'Instagram', 'Twitter'].map((item, index) => (
                                    <a key={index} href={`#${item}`} className='flex justify-center'>
                                        <h1 className='text-gray-500 text-normal font-normal group-hover:text-gray-500 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </h1>
                                    </a>
                                ))}
                            </div>

                            <div className='flex flex-col items-start'>
                                {['vmb24house@company.com.br'].map((item, index) => (
                                    <a key={index} href={`#${item}`} className='flex justify-center'>
                                        <h1 className='text-gray-500 text-normal font-normal group-hover:text-gray-500 transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </h1>
                                    </a>
                                ))}
                            </div>
                        </div>

                    
                        <div className="flex flex-col w-80">
                            <h1 className="text-end text-gray-500 text-4xl">Reach <a className="text-black text-4xl">Out</a></h1>
                            <h1 className="text-start text-black text-4xl">With TerraFarming</h1>
                            <div className="flex justify-end mt-4">
                                <CgArrowTopRightO size={50} color="green"/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div>
                <h1 className="text-start text-green-700 text-[245px]">Terra Farming</h1>
            </div>

            <div className="flex flex-row justify-between mt-4 mb-12 max-md:mb-8 max-lg:mb-8">
                <h1 className="text-gray-500 mr-8">2024 TerraFarming</h1>
                <h1 className="text-gray-500 mr-8">TerraFarming Agriculture Tecnology - VMB</h1>
            </div>
        </div>
    )
}