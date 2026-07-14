import React from 'react'
import HeroSection from '@/components/HomePage/HeroSection'
import CompanySection from '@/components/HomePage/CompanySection'
import FeaturedJob from '@/components/HomePage/FeaturedJob'

const HomePage = () => {
  return (
    <div className='max-w-[1200px] mx-auto px-4 lg:px-12 lg:py-12'>
      <HeroSection />
      <FeaturedJob />
      <CompanySection />
    </div>
  )
}

export default HomePage
