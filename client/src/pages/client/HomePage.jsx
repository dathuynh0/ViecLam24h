import React, { useEffect } from 'react'
import HeroSection from '@/components/HomePage/HeroSection'
import CompanySection from '@/components/HomePage/CompanySection'
import FeaturedJob from '@/components/HomePage/FeaturedJob'
import Category from '@/components/HomePage/Category'
import Hotline from '@/components/HomePage/Hotline'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Việc làm 24h'
  }, [])

  return (
    <div className='p-4 md:p-0 lg:py-12'>
      <HeroSection />
      <FeaturedJob />
      <Category />
      <CompanySection />
      <Hotline />
    </div>
  )
}

export default HomePage
