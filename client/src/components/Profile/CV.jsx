import React from 'react'
import { Button } from '../ui/button'
import { FileBarChart2Icon } from 'lucide-react'

const CV = ({ user }) => {
    const cvUrl = user?.cvUrl
        ? `${import.meta.env.VITE_BACKEND_URL}/${user.cvUrl}`
        : null

    const isImage = cvUrl && /\.(jpe?g|png|webp|gif)$/i.test(cvUrl)
    const isPdf = cvUrl && /\.pdf$/i.test(cvUrl)

  return (
    <div className='border border-gray-300 rounded-lg shadow-lg p-4'>
        <h2 className='flex items-center gap-3 pb-3 font-bold'>
            <Button variant='ghost' className={`h-5 w-5 p-5 bg-green-100`}>
                <FileBarChart2Icon />
            </Button>
            CV đính kèm
        </h2>

        {
            user?.cvUrl ? (
                <div className='flex flex-col items-center gap-3'>
                    {/* Phần preview */}
                    <div className='w-full h-64 border rounded-md overflow-hidden bg-gray-50'>
                        {isImage && (
                            <img
                                src={cvUrl}
                                alt='Xem CV'
                                className='w-full h-full object-contain'
                            />
                        )}

                        {isPdf && (
                            <iframe
                                src={`${cvUrl}#toolbar=0&navpanes=0`}
                                title='Xem CV'
                                className='w-full h-full'
                            />
                        )}
                    </div>
                </div>
            ) : <p className='text-center'>Bạn chưa tải bất kỳ CV nào</p>
        }
    </div>
  )
}

export default CV
