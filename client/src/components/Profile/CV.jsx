import React from 'react'
import { Button } from '../ui/button'
import { FileBarChart2Icon } from 'lucide-react'
import { Input } from '../ui/input'

const CV = ({ user }) => {
  return (
    <div className='border border-gray-300 rounded-lg shadow-lg p-4'>
        <h2 className='flex items-center gap-3 pb-3'>
            <Button variant='ghost' className={`h-5 w-5 p-5 bg-green-100`}>
                <FileBarChart2Icon />
            </Button>
            CV đính kèm
        </h2>

        {
            user?.cvUrl ? (
                <a 
                    href={`${import.meta.env.VITE_BACKEND_URL}/${user.cvUrl}`} 
                    target="_blank" 
                    download
                    className="text-blue-500 underline text-center"
                >
                    Xem hoặc tải xuống CV
                </a>
            ) : <p className='text-center'>Bạn chưa tải bất kỳ CV nào</p>
        }
    </div>
  )
}

export default CV
