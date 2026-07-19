import React from 'react'
import not_found from '@/assets/404.png'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/')
  }

  return (
    <div className='p-4 min-h-screen flex flex-col items-center justify-center'>
      <img src={not_found} alt={`404`} className='max-w-md max-h-md'/>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-center text-lg text-muted-foreground font-bold'>Trang tìm kiếm của bạn đã bị xóa hoặc đang ẩn. Hãy kiểm tra lại đường dẫn</h1>
        <Button onClick={handleReturnHome} size='xl' variant='ghost' className={`bg-green-700 text-white`}>
          <Home /> Trờ về trang chủ
        </Button>
      </div>
    </div>
  )
}

export default NotFound
