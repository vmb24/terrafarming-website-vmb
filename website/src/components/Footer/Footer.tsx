import { FaCircleArrowRight } from "react-icons/fa6"

export const Footer = () => {
    return (
        <div className="flex flex-col h-auto mt-32 max-md:mt-20 max-lg:mt-20 bg-black px-12">
            
            <div className="flex flex-row justify-between items-center">

                <div className="flex flex-col">
                    <h1 className="text-green-500 font-bold text-3xl mt-20 max-md:mt-8 max-lg:mt-8">Terrafarming</h1>

                    <div className="flex flex-row bg-black lg:hidden mt-12">
                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0'>
                            {['home', 'About Us', 'Services', 'Careers'].map((item, index) => (
                                <a key={index} href={`#${item}`} className='
                                    flex justify-start 
                                    text-white text-normal 
                                    font-normal 
                                    group-hover:text-white 
                                    transition-colors 
                                    duration-300 
                                    cursor-pointer 
                                    hover:bg-green-300 
                                    rounded'>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            ))}
                        </div>

                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 max-md:ml-8 max-lg:ml-8'>
                            {['Blog', 'FAQs', 'Testimonial', 'Support'].map((item, index) => (
                                <a key={index} href={`#${item}`} className='flex justify-start text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            ))}
                        </div>

                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 max-md:ml-8 max-lg:ml-8'>
                            {['Pricing', 'Partner'].map((item, index) => (
                                <a key={index} href={`#${item}`} className='flex justify-start text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col mt-28 max-md:hidden max-lg:hidden">
                        <p className="text-white font-normal text-xl">Read to start a conversation ?</p>
                        <p className="text-white font-normal text-xl">Get in touch with us now.</p>

                        <button className='flex flex-row justify-center relative p-2 w-40 rounded-full bg-green-500 mt-4'>
                            <text className='text-white text-base font-normal'>Contact Us</text>
                            <FaCircleArrowRight size={25} className='ml-2'/>
                        </button>
                    </div>


                    <div className="flex flex-col mt-12 lg:hidden">
                        <p className="text-white font-normal text-xl">Read to start a conversation ?</p>
                        <p className="text-white font-normal text-xl">Get in touch with us now.</p>

                        <button className='flex flex-row justify-center relative p-2 w-40 rounded-full bg-green-500 mt-4'>
                            <text className='text-white text-base font-normal'>Contact Us</text>
                            <FaCircleArrowRight size={25} className='ml-2'/>
                        </button>

                        <h1 className="text-white font-bold text-xl mt-8">Or</h1>

                        <h1 className="text-white font-normal text-xl mt-8">Read to join your community ?</h1>
                        <h1 className="text-white font-normal text-xl">Subscribe your newsletetter now.</h1>

                        <div className="flex flex-row mt-4">
                            <input className="px-4 rounded-full w-56 h-8" placeholder="Your Email" />
                            <button className='flex flex-row justify-center items-center relative w-12 rounded-full bg-green-500 ml-4'>
                                <FaCircleArrowRight size={25} className='ml-2'/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-12 max-md:hidden max-lg:hidden">
                    <div className="flex flex-row bg-black">

                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0'>
                            {['home', 'About Us', 'Services', 'careers', 'Careers'].map((item, index) => (
                                <a key={index} href={`#${item}`} className='flex justify-center'>
                                    <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </h1>
                                </a>
                            ))}
                        </div>

                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0'>
                            {['Blog', 'FAQs', 'Services', 'Testimonial', 'Support'].map((item, index) => (
                                <a key={index} href={`#${item}`} className='flex justify-center'>
                                    <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </h1>
                                </a>
                            ))}
                        </div>

                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0'>
                            {['Pricing', 'Partner'].map((item, index) => (
                                <a key={index} href={`#${item}`} className='flex justify-center'>
                                    <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </h1>
                                </a>
                            ))}
                        </div>
                    
                    </div>

                    <h1 className="text-white font-normal text-xl mt-8">Read to join your community ?</h1>
                    <h1 className="text-white font-normal text-xl">Subscribe your newsletetter now.</h1>

                    <div className="flex flex-row mt-4">
                        <input className="px-4 rounded-full w-96 h-12" placeholder="Your Email"></input>
                        <button className='flex flex-row justify-center items-center relative w-40 rounded-full bg-green-500 ml-4'>
                            <text className='text-white text-base font-normal text-center'>Subscribe</text>
                            <FaCircleArrowRight size={25} className='ml-2'/>
                        </button>
                    </div>

                </div>

            </div>

            <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 mt-8'>
                <text className='text-black'>----------------------------------</text>
                <text className='text-black flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                <text className='text-black flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                <text className='text-black flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                <text className='text-black flex max-md:hidden max-lg:hidden'>----------------------------------</text>
                <text className='text-black flex max-md:hidden max-lg:hidden'>----------------------------------</text>
            </div>

            <div className="flex flex-row max-md:mb-8 max-lg:mb-8">
                <h1 className="text-white mr-8">2024 Terrafarming. All rights reserved.</h1>
                <h1 className="text-white mr-8">Terms of Service</h1>
                <h1 className="text-white">Policy service</h1>
            </div>
        </div>
    )
}