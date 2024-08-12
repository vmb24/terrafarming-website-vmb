import React from 'react'
import { HeroSection } from './components/HeroSection/HeroSection'
import { AboutSection } from './components/AboutSection/AboutSection'
import { ControlAgricultureSection } from './components/ControlAgricultureSection/ControlAgricultureSection'
import { ServicesSection } from './components/ServicesSection/ServicesSection'
import { WhyChooseUsSections } from './components/WhyChooseUsSections/WhyChooseUsSections'
import { FrequentlyAskedQuestions } from './components/FrequentlyAskedQuestions/FrequentlyAskedQuestions'
import { Footer } from './components/Footer/Footer'
import { JoinUsSection } from './components/JoinUsSection/JoinUsSection'

export const HomeSite = () => {
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