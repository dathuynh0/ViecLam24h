import { useAuthStore } from '@/stores/useAuthStore'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import Loading from './Loading';

const ProtectedRoute = () => {
    const { accessToken, user, fetchMe, refresh, authLoading } = useAuthStore();
    const [initializing, setInitializing] = useState(true);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const init = async () => {
        if(!accessToken) {
            await refresh();
        }

        if(accessToken && !user) {
            await fetchMe();
        }

        setInitializing(false)
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        if (user?.role === 'company' && !location.pathname.startsWith('/nha-tuyen-dung')) {
            navigate('/nha-tuyen-dung', { replace: true });
        }

        if (user?.role === 'admin' && !location.pathname.startsWith('/quan-tri')) {
            navigate('/quan-tri', { replace: true });
        }
    }, [user?.role])


    if (authLoading || initializing) {
        return <Loading />
    }

    
    if (pathname.startsWith('/nha-tuyen-dung') && user?.role !== 'company') {
        return <Navigate to="/404" replace />;
    }
    if (pathname.startsWith('/admin') && user?.role !== 'admin') {
        return <Navigate to="/404" replace />;
    }
    if(!pathname.includes('/nha-tuyen-dung') && user?.role == 'company') {
        return <Navigate to="/nha-tuyen-dung" replace />;
    }

  return (
    <Outlet />
  )
}

export default ProtectedRoute
