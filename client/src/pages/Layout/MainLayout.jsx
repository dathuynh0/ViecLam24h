import Footer from '@/components/HomePage/Footer'
import NavBar from '@/components/HomePage/NavBar'
import Loading from '@/components/Loading'
import { useAuthStore } from '@/stores/useAuthStore'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router'

const MainLayOut = () => {
  const { authLoading, accessToken, fetchMe, refresh, user } = useAuthStore();

  const init = async () => {
      if(!accessToken) {
        await refresh();
      }
  
      if(accessToken && !user) {
        await fetchMe();
      }
    }
  
  useEffect(() => {
    init();
  }, [])

  if(authLoading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col'>
      <header className='sticky top-0 z-20 bg-white border-b border-green-500 p-4 flex items-center justify-between'>
        <nav className='w-full'>
          <NavBar/>
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
