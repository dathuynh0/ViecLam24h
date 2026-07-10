import React from 'react'
import HeroSection from '@/components/HomePage/HeroSection'
import CompanySection from '@/components/HomePage/CompanySection'
import FeaturedJob from '@/components/HomePage/FeaturedJob'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedJob />
      <CompanySection />
    </div>
  )
}

export default HomePage
