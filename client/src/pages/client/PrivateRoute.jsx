import Loading from '@/components/Loading';
import { useAuthStore } from '@/stores/useAuthStore'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const { accessToken, refresh } = useAuthStore();
  const [check, setCheck] = useState(true)

  useEffect(() => {
    const resetToken = async () => {
      if(!accessToken) {
        await refresh();
      }

      setCheck(false);
    }

    resetToken();
  }, [])

  if(check) return <Loading />

  return accessToken ? <Outlet /> : <Navigate to={'/'} replace={true}/>
}

export default PrivateRoute
