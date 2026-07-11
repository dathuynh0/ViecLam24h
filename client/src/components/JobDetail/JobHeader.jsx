import React from 'react'
import { Badge } from '../ui/badge'
import { CircleDollarSign, Heart, MapPin } from 'lucide-react'
import { Button } from '../ui/button'
import transformLocationTime from '@/lib/day'
import { toLocation } from '@/lib/location'

const JobHeader = ({ job }) => {
    const countDay = Math.ceil((new Date(job?.expiredAt) - new Date()) / (1000 * 60 * 60 * 24))
    let location;
    if(job) {
      location = toLocation(job?.location)
    }
    
  return (
    <div className='w-full flex flex-wrap justify-between bg-white border border-gray-300 rounded-lg shadow-lg p-6'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold'>{job?.title}</h1>
        <div className='flex flex-wrap items-center gap-2'>
            <Badge variant='ghost' className={`text-green-900 bg-green-200`}><MapPin />{location}</Badge>
            <Badge variant='ghost' className={`text-green-900 bg-green-200`}><CircleDollarSign /> {job?.salaryMin} - {job?.salaryMax}đ</Badge>
        </div>
        <p className='text-gray-500 py-2'>Hạn nộp hồ sơ: <span className='text-black font-medium'>{transformLocationTime(job?.expiredAt)} (Còn {countDay} ngày)</span></p>
      </div>

      <div className='flex pt-2 md:pt-0 md:flex-col gap-4'>
        <Button variant='ghost' size='xl' className={`bg-green-700 text-white`}>
            Ứng tuyển ngay
        </Button>
        <Button variant='ghost' size='xl' className={`border border-green-700`}>
            <Heart />Lưu tin
        </Button>
      </div>
    </div>
  )
}

export default JobHeader
