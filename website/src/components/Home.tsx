import React from 'react'
import { HeroSection } from './HeroSection/HeroSection'
import { AboutSection } from './AboutSection/AboutSection'
import { ControlAgricultureSection } from './ControlAgricultureSection/ControlAgricultureSection'
import { ServicesSection } from './ServicesSection/ServicesSection'
import { WhyChooseUsSections } from './WhyChooseUsSections/WhyChooseUsSections'
import { FrequentlyAskedQuestions } from './FrequentlyAskedQuestions/FrequentlyAskedQuestions'
import { Footer } from './Footer/Footer'
import { JoinUsSection } from './JoinUsSection/JoinUsSection'

export const Home = () => {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <ControlAgricultureSection />
            <ServicesSection />
            <WhyChooseUsSections />
            <FrequentlyAskedQuestions />
            <JoinUsSection />
            <Footer />
        </div>
    )
}