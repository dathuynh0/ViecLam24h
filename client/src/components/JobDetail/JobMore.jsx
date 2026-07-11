import { Heart, MapPin } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const JobMore = ({ job }) => {
  return (
    <div className='pt-2 pb-4 px-4 bg-white border border-gray-300 rounded-lg shadow-lg'>
        <div className='py-4'>
            <h3 className='border-l-4 border-green-800 pl-2 font-bold pb-2'>Địa điểm làm việc</h3>
            <p className='flex items-center gap-2 py-3'><MapPin className='h-5 w-5'/>{job?.location}</p>

            <h3 className='border-l-4 border-green-800 pl-2 font-bold pb-2'>Thời gian làm việc</h3>
            <ul className='py-3'>
                {job?.workTime.map((time) => (
                    <li>
                        - {time}
                    </li>
                ))}
            </ul>

            <h3 className='border-l-4 border-green-800 pl-2 font-bold pb-2'>Cách thức ứng tuyển</h3>
            <p className='py-3'>Nộp hồ sơ trực tuyến bằng cách nhấn <span className='font-bold'>Ứng tuyển</span> bên dưới</p>
            <div className='flex items-center gap-4'>
                <Button variant='ghost' size='xl' className={`bg-green-700 text-white`}>
                    Ứng tuyển ngay
                </Button>
                <Button variant='ghost' size='xl' className={`border border-green-700`}>
                    <Heart />Lưu tin
                </Button>
            </div>
        </div>
    </div>
  )
}

export default JobMore
