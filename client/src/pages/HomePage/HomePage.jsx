import CompanySection from '@/components/HomePage/CompanySection'
import FeaturedJob from '@/components/HomePage/FeaturedJob'
import Footer from '@/components/HomePage/Footer'
import HeroSection from '@/components/HomePage/HeroSection'
import NavBar from '@/components/HomePage/NavBar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router'

const HomePage = () => {
  return (
    <div>
      <header className='sticky top-0 z-20 bg-white border-b border-green-500 p-4 flex items-center justify-between'>
        <div className='flex items-center gap-12'>
            <a href="/" className='text-green-900 font-semibold'>ViệcLàm24h</a>
            <NavBar/>
        </div>
        <div className='flex items-center gap-4'>
            <Button variant='ghost' className={`bg-white text-green-700 hover:text-white hover:bg-green-700 border-green-700 cursor-pointer`}>
                <Link to={`/signup`}>Đăng ký</Link>
            </Button>
            <Button variant='ghost' className={`bg-green-700 text-white hover:text-green-700 hover:bg-white border-green-700 cursor-pointer`}>
                <Link to={`/signin`}>Đăng nhập</Link>
            </Button>
        </div>
      </header>
      <main className='container mx-auto px-12 py-12'>
        <HeroSection />
        <FeaturedJob />
        <CompanySection />
      </main>

      
      <Footer />
    </div>
  )
}

export default HomePage
