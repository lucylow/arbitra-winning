import React from 'react'
import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { HowItWorks } from '../components/HowItWorks'
import { InteractiveProcess } from '../components/InteractiveProcess'
import { DemoSimulator } from '../components/DemoSimulator'
import { EvidenceAnchorVisualizer } from '../components/EvidenceAnchorVisualizer'
import { Technology } from '../components/Technology'
import { UseCases } from '../components/UseCases'
import { TestimonialsCarousel } from '../components/TestimonialsCarousel'
import { Testimonials } from '../components/Testimonials'
import { CTASection } from '../components/CTASection'
import { Footer } from '../components/Footer'

interface LandingPageProps {
  onEnterApp?: () => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-white">
      <Hero onGetStarted={onEnterApp} />
      <Features />
      <InteractiveProcess />
      <HowItWorks />
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DemoSimulator />
        </div>
      </div>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EvidenceAnchorVisualizer />
        </div>
      </div>
      <Technology />
      <UseCases />
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialsCarousel />
        </div>
      </div>
      <Testimonials />
      <CTASection onGetStarted={onEnterApp} />
      <Footer />
    </div>
  )
}

