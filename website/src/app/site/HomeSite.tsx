import React from 'react'
import { HeroSection } from './components/HeroSection/HeroSection'
import { AboutSection } from './components/AboutSection/AboutSection'
import { ControlAgricultureSection } from './components/ControlAgricultureSection/ControlAgricultureSection'
import { ServicesSection } from './components/ServicesSection/ServicesSection'
import { WhyChooseUsSections } from './components/WhyChooseUsSections/WhyChooseUsSections'
import { FrequentlyAskedQuestions } from './components/FrequentlyAskedQuestions/FrequentlyAskedQuestions'
import { Footer } from './components/Footer/Footer'
import { JoinUsSection } from './components/JoinUsSection/JoinUsSection'
import IAgrixiAssistantSection from './components/IAgrixiAssistantSection/IAgrixiAssistantSection'
import AccessibilityAssistantSection from './components/AccessibilityAssistantSection/AccessibilityAssistantSection'

export const HomeSite = () => {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <ControlAgricultureSection />
            <ServicesSection />
            <IAgrixiAssistantSection />
            <WhyChooseUsSections />
            <AccessibilityAssistantSection />
            <FrequentlyAskedQuestions />
            <JoinUsSection />
            <Footer />
        </div>
    )
}