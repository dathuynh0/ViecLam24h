import NavBar from '@/components/HomePage/NavBar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router'

const HomePage = () => {
  return (
    <div>
      <header className='p-4 flex items-center justify-between'>
        <div className='flex items-center gap-12'>
            <a href="/" className='text-green-900 font-semibold'>ViệcLàm24h</a>
            <NavBar/>
        </div>
        <div className='flex items-center gap-4'>
            <Button variant='ghost' className={`bg-white text-green-700 border-green-500`}>
                <Link to={`/signup`}>Đăng ký</Link>
            </Button>
            <Button variant='ghost' className={`bg-green-500 text-white`}>
                <Link to={`/signin`}>Đăng nhập</Link>
            </Button>
        </div>
      </header>
    </div>
  )
}

export default HomePage
