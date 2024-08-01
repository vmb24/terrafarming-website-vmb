'use client'

import React, { useState } from 'react'
import { IoArrowDownCircleOutline } from 'react-icons/io5'

interface FAQItemProps {
  question: string
  answer: string
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col border border-gray-100 px-4 py-4 rounded-md mt-8 max-md:mt-8 max-lg:mt-8 bg-white">
      <div className="flex flex-row justify-between items-center cursor-pointer" onClick={handleToggle}>
        <h1>{question}</h1>
        <IoArrowDownCircleOutline size={25} className={`${isOpen ? 'rotate-180' : ''} transition-transform`} />
      </div>
      {isOpen && (
        <div className="mt-2 p-2 bg-gray-100 rounded-md">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

export const FrequentlyAskedQuestions: React.FC = () => {
  return (
    <div className="flex flex-col px-12 mt-20">
      <div className='flex flex-row mt-20'>
          <h1 className='text-[#020405] text-xl max-md:text-sm max-lg:text-sm max-md:mt-1 max-lg:mt-1 font-normal'>Frequently Asked Questions</h1>
          <div className='flex flex-row border-t-2 border-gray-400 border-x-gray-400 max-md:mt-4 max-lg:mt-4 mt-4 ml-2'>
              <text className='text-white flex lg:hidden'>--</text>
              <text className='text-white flex max-md:hidden max-lg:hidden'>-------------------</text>
              <text className='text-white flex max-md:hidden max-lg:hidden'>-------------------</text>
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

      <FAQItem 
        question="1. What is TerraRobot technology and how does it work in fruit picking ?"
        answer="TerraRobot technology uses advanced sensors and AI to efficiently pick fruits..."
      />
      <FAQItem 
        question="2. Are the TerraRobot robots safe for the fruit trees and plants ?"
        answer="Yes, TerraRobot robots are designed with care to ensure the safety of trees and plants..."
      />
      <FAQItem 
        question="3. How does TerraRobot fruit transportation work and what are its benefits ?"
        answer="The transportation system uses secure containers and optimized routes to deliver fruits..."
      />
      <FAQItem 
        question="4. How do I integrate TerraRobot technology into my farm operations ?"
        answer="Integration involves a few steps, including installation of sensors and calibration..."
      />
    </div>
  )
}
