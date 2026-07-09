import HeroSection from '@/components/HomePage/HeroSection'
import NavBar from '@/components/HomePage/NavBar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router'

const HomePage = () => {
  return (
    <div className='h-[10000px]'>
      <header className='sticky top-0 bg-white border-b border-green-500 p-4 flex items-center justify-between'>
        <div className='flex items-center gap-12'>
            <a href="/" className='text-green-900 font-semibold'>ViệcLàm24h</a>
            <NavBar/>
        </div>
        <div className='flex items-center gap-4'>
            <Button variant='ghost' className={`bg-white text-green-700 hover:text-white hover:bg-green-500 border-green-500 cursor-pointer`}>
                <Link to={`/signup`}>Đăng ký</Link>
            </Button>
            <Button variant='ghost' className={`bg-green-500 text-white hover:text-green-700 hover:bg-white border-green-500 cursor-pointer`}>
                <Link to={`/signin`}>Đăng nhập</Link>
            </Button>
        </div>
      </header>
      <main className='px-12'>
        <HeroSection />
      </main>
    </div>
  )
}

export default HomePage
