import Loading from '@/components/Loading'
import api from '@/lib/api'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner'

const VerifyEmail = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const navigate = useNavigate()

    
    useEffect(() => {
        if (!token) {
            toast.error('Xác thực thất bại')
            return
        }

        const verify = async () => {
            try {
                const response = await api.post('/auth/verify', { token })
                toast.success('Xác thực email thành công')
                navigate('/signin')
            } catch (error) {
                toast.error('Xác thực tài khoản thất bại')
            }
        }

        verify()
    }, [])

  return <Loading />
}

export default VerifyEmail
