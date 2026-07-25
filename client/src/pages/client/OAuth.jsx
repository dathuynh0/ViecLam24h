import Loading from '@/components/Loading';
import { useAuthStore } from '@/stores/useAuthStore';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router';

const OAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  useEffect(() => {
    const token = searchParams.get('accessToken');
    if (token) {
      setAccessToken(token);
      navigate('/', { replace: true });
    } else {
      navigate('/signin', { replace: true });
    }
  }, []);

  return <Loading />
}

export default OAuth
