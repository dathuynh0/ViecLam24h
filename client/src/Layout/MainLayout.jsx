import Footer from '@/components/HomePage/Footer'
import NavBar from '@/components/HomePage/NavBar'
import useSocket from '@/hooks/useSocket'
import { useNotification } from '@/stores/useNotification'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

const MainLayOut = () => {
  useSocket()

  const getAllNotification = useNotification(s => s.getAllNotification)

  useEffect(() => {
    getAllNotification()
  }, [getAllNotification])

  return (
    <div className='flex flex-col'>
      <header className='sticky top-0 z-20 bg-white border-b border-green-500 p-4 flex items-center justify-between'>
        
        <nav className='w-full'>
          <NavBar />
        </nav>
        
      </header>
      <main className='flex-1 min-h-screen'>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayOut
