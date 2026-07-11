import Footer from '@/components/HomePage/Footer'
import NavBar from '@/components/HomePage/NavBar'
import React from 'react'
import { Outlet } from 'react-router'

const MainLayOut = () => {
  return (
    <div className='min-h-screen'>
      <header className='sticky top-0 z-20 bg-white border-b border-green-500 p-4 flex items-center justify-between'>
        <nav className='w-full'>
          <NavBar/>
        </nav>
        
      </header>
      <main className=''>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayOut
