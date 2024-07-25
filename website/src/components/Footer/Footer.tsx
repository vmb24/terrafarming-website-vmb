import { FaCircleArrowRight } from "react-icons/fa6"

export const Footer = () => {
    return (
        <div className="flex flex-col h-[50vh] mt-32 bg-black px-12 ">
            
            <div className="flex flex-row justify-between items-center">

                <div className="flex flex-col">
                    <h1 className="text-green-500 font-bold text-3xl mt-20">Terrafarming</h1>

                    <p className="text-white font-normal text-xl mt-28">Read to start a conversation ?</p>
                    <p className="text-white font-normal text-xl">Get in touch with us now.</p>

                    <button className='flex flex-row justify-center relative p-2 w-40 rounded-full bg-green-500 mt-4'>
                        <text className='text-white text-base font-normal'>Contact Us</text>
                        <FaCircleArrowRight size={25} className='ml-2'/>
                    </button>
                </div>

                <div className="flex flex-col mt-12">
                    <div className="flex flex-row bg-black">
                        <div className="flex flex-col mr-40">
                            <a href="#home" className="mb-2">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    Home
                                </h1>
                            </a>
                            <a href="#home" className="mb-2">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    About Us
                                </h1>
                            </a>
                            <a href="#home" className="mb-2">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    Services
                                </h1>
                            </a>
                            <a href="#home" className="mb-2">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    Careers
                                </h1>
                            </a>
                        </div>
                        <div className="flex flex-col mr-40">
                            <a href="#home" className="mb-2">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    Blog
                                </h1>
                            </a>
                            <a href="#home" className="mb-2">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    FAQs
                                </h1>
                            </a>
                            <a href="#home" className="mb-2">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    Testimonial
                                </h1>
                            </a>
                            <a href="#home" className="mb-2">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    Support
                                </h1>
                            </a>
                        </div>
                        <div className="flex flex-col mr-20">
                            <a href="#home" className="mb-2">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    Pricing
                                </h1>
                            </a>
                            <a href="#home">
                                <h1 className='text-white text-normal font-normal group-hover:text-white transition-colors duration-300 cursor-pointer hover:bg-green-300 rounded'>
                                    Partner
                                </h1>
                            </a>
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
                <text className='text-black'>----------------------------------</text>
                <text className='text-black'>----------------------------------</text>
                <text className='text-black'>----------------------------------</text>
                <text className='text-black'>----------------------------------</text>
                <text className='text-black'>----------------------------------</text>
            </div>

            <div className="flex flex-row">
                <h1 className="text-white mr-8">2024 Terrafarming. All rights reserved.</h1>
                <h1 className="text-white mr-8">Terms of Service</h1>
                <h1 className="text-white">Policy service</h1>
            </div>
        </div>
    )
}