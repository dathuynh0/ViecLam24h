import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { Heart, MapPin, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { useCandidateStore } from '@/stores/useCandidateStore'
import { useAuthStore } from '@/stores/useAuthStore'
import Popup from '../Popup'
import ApplyJob from './ApplyJob'

const Content = ({ job, hasApplyJob, isSave }) => {
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openApplyDialog, setOpenApplyDialog] = useState(false);

    const { saveJob, deleteJobSave } = useCandidateStore();
    const accessToken = useAuthStore(s => s.accessToken);

    const openDialog = async () => {
    if(!accessToken) {
      setOpenLoginDialog(true);
      return;
    }

    setOpenApplyDialog(true)
  }

  const handleSaveJob = () => {
    if(!accessToken) {
      setOpenLoginDialog(true)
      return;
    }

    saveJob(job?.id);
  }

  const handleDeleteSaveJob = () => {
    deleteJobSave(isSave?.id)
  }


  return (
    <div className='bg-white border border-gray-300 shadow-lg p-4 rounded-lg space-y-3'>
        <h2 className='text-lg font-bold border-l-4 border-green-700 pl-2'>Chi tiết công việc</h2>
        <div>
            <div className='flex gap-2 pb-4'>
                <p className='flex-shrink-0'>Yêu cầu:</p>
                <ul className='flex flex-wrap items-center gap-2 pb-3'>
                    {job?.jobRequirement.map((requirement) => (
                        <li key={requirement}>
                            <Badge variant='ghost' className={`bg-slate-200 text-slate-900 whitespace-normal`}>{requirement}</Badge>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='space-y-3 border-t py-6'>
                <h3 className='font-bold border-l-4 border-green-700 pl-2'>Mô tả công việc</h3>
                <ul className='space-y-2'>
                    {job?.description.map((description) => (
                        <li>
                            {description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        {/* requirement */}
        <div className='space-y-3 border-t py-6'>
            <h3 className='font-bold border-l-4 border-green-700 pl-2'>Yêu cầu ứng viên</h3>
            <ul className='space-y-2'>
                {job?.candidateRequirement.map((requirement) => (
                    <li>
                        {requirement}
                    </li>
                ))}
            </ul>
        </div>
        {/* benefit */}
        <div className='space-y-3 border-t py-6'>
            <h3 className='font-bold border-l-4 border-green-700 pl-2'>Quyền lợi</h3>
            <ul className='space-y-2'>
                {job?.benefit.map((benefit) => (
                    <li>
                        {benefit}
                    </li>
                ))}
            </ul>
        </div>

        <div className='space-y-3 border-t py-6'>
            <h3 className='font-bold border-l-4 border-green-700 pl-2'>Địa điểm làm việc</h3>
            <p className='flex items-center gap-2'><MapPin className='h-5 w-5'/>{job?.location}</p>

            <h3 className='font-bold border-l-4 border-green-700 pl-2'>Thời gian làm việc</h3>
            <ul className=''>
                {job?.workTime.map((time) => (
                    <li>
                        {time}
                    </li>
                ))}
            </ul>

            <div>
                <h3 className='font-bold'>Cách thức ứng tuyển</h3>
                <p className='pb-3'>Nộp hồ sơ trực tuyến bằng cách nhấn <span className='font-bold'>Ứng tuyển</span> bên dưới</p>
                {
                    hasApplyJob ? (
                        <Button variant='ghost' size='xl' className={`bg-white text-green-700 border-green-700`}>
                            Đã ứng tuyển
                        </Button>
                    ) : (
                        <div className='hidden md:flex items-center gap-4'>
                            <Button onClick={openDialog} variant='ghost' size='xl' className={`bg-green-700 text-white`}>
                                Ứng tuyển ngay
                            </Button>
                            {
                                isSave ?
                                <Button onClick={handleDeleteSaveJob} variant='ghost' size='xl' className={`border border-red-700 bg-red-100 text-red-700`}>
                                    <Trash />Xóa khỏi tin đã lưu
                                </Button> 
                                : 
                                <Button onClick={handleSaveJob} variant='ghost' size='xl' className={`border border-green-700`}>
                                    <Heart />Lưu tin
                                </Button>
                            }

                            <Popup openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog}/>
                            <ApplyJob openApplyDialog={openApplyDialog} setOpenApplyDialog={setOpenApplyDialog} job={job}/>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Content
