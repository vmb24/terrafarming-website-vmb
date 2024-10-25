// components/SlideHomePage.tsx
import { useState, useEffect } from 'react'
import Image from 'next/image'

import analyseSoilRobotImage from '@/assets/analyse-soil-robot.png'
import analyseHealthHarvestImage from '@/assets/analysis-metrics.png'
import smartHarvestRobotImage from '@/assets/smart-harvest-robots.png'
import sustainableAgriculture from '@/assets/sustainable-agriculture-join-us.jpg'

const slides = [
  { image: analyseSoilRobotImage, text: 'Texto para a imagem 1' },
  { image: analyseHealthHarvestImage, text: 'Texto para a imagem 2' },
  { image: sustainableAgriculture, text: 'Texto para a imagem 3' },
]

export const SlideHomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative w-screen h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image src={slide.image} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
            {/* <div className="absolute bottom-10 left-10 text-white text-4xl bg-black bg-opacity-50 p-4">
              {slide.text}
            </div> */}
          </div>
        ))}
      </div>
    )
}