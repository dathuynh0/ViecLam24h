import React from 'react'
import { Spinner } from './ui/spinner'

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center gap-4">
      <Spinner className="size-6 text-white" />
      <p className='text-white'>Đang tải dữ liệu...</p>
    </div>
  )
}

export default Loading
