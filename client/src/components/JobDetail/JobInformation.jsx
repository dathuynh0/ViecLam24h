import { BriefcaseBusiness, Clock, Users2 } from 'lucide-react'
import React from 'react'

const JobInformation = ({ job }) => {
  return (
    <div className='border border-gray-300 rounded-lg shadow-lg p-4 space-y-4'>
      <h2 className='text-lg font-bold'>Thông tin chung</h2>

      <div className='flex items-center gap-4'>
        <Users2 className='text-muted-foreground h-5 w-5'/>
        <div className='text-sm'>
          <p className='text-muted-foreground'>Số lượng tuyển</p>
          <span className='font-bold'>
            {job?.quantity}
          </span>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <BriefcaseBusiness className='text-muted-foreground h-5 w-5'/>
        <div className='text-sm'>
          <p className='text-muted-foreground'>Hình thức làm việc</p>
          <span className='font-bold'>
            {job?.workArrangement === 'remote' ? 'Làm việc từ xa'
            : job?.workArrangement === 'on_site' ? 'Làm việc tại văn phòng / Onsite' : 'Làm việc linh hoạt'
            }
          </span>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Clock className='text-muted-foreground h-5 w-5'/>
        <div className='text-sm'>
          <p className='text-muted-foreground'>Loại hình làm việc</p>
          <span className='font-bold'>
            {
              job?.workType === 'full_time' ? 'Toàn thời gian / Full time'
              : job?.workType === 'part_time' ? 'Bán thời gian / Part time' : 'Intership / Thực tập'
            }
          </span>
        </div>
      </div>
    </div>
  )
}

export default JobInformation
