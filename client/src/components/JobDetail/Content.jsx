import React from 'react'
import { Badge } from '../ui/badge'
import { Heart, MapPin } from 'lucide-react'
import { Button } from '../ui/button'

const Content = ({ job }) => {
  return (
    <div className='bg-white border border-gray-300 shadow-lg p-4 rounded-lg space-y-3'>
        <h2 className='text-lg font-bold'>Chi tiết công việc</h2>
        <div>
            <div className='flex gap-2'>
                <p className='flex-shrink-0'>Yêu cầu:</p>
                <ul className='flex flex-wrap items-center gap-2'>
                    {job?.candidateRequirement.map((requirement) => (
                        <li key={requirement}>
                            <Badge variant='ghost' className={`bg-slate-200 text-slate-900 whitespace-normal`}>{requirement}</Badge>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className='font-bold py-3'>Mô tả công việc</h3>
                <ul className='space-y-2'>
                    {job?.description.map((description) => (
                        <li>
                            - {description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        {/* requirement */}
        <div>
            <h3 className='font-bold pb-2'>Yêu cầu ứng viên</h3>
            <ul className='space-y-2'>
                {job?.jobRequirement.map((requirement) => (
                    <li>
                        - {requirement}
                    </li>
                ))}
            </ul>
        </div>
        {/* benefit */}
        <div>
            <h3 className='font-bold pb-2'>Quyền lợi</h3>
            <ul className='space-y-2'>
                {job?.benefit.map((benefit) => (
                    <li>
                        - {benefit}
                    </li>
                ))}
            </ul>
        </div>

        <div className=''>
            <h3 className='font-bold pb-2'>Địa điểm làm việc</h3>
            <p className='flex items-center gap-2'><MapPin className='h-5 w-5'/>{job?.location}</p>

            <h3 className='font-bold py-2'>Thời gian làm việc</h3>
            <ul className=''>
                {job?.workTime.map((time) => (
                    <li>
                        - {time}
                    </li>
                ))}
            </ul>

            <h3 className='font-bold'>Cách thức ứng tuyển</h3>
            <p className='pt-2 pb-3'>Nộp hồ sơ trực tuyến bằng cách nhấn <span className='font-bold'>Ứng tuyển</span> bên dưới</p>
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

export default Content
