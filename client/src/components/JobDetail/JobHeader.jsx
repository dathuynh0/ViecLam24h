import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { CircleDollarSign, Heart, MapPin, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import transformLocationTime from '@/lib/day'
import { toLocation } from '@/lib/location'
import { useAuthStore } from '@/stores/useAuthStore'
import Popup from '../Popup'
import Loading from '../Loading'
import ApplyJob from './ApplyJob'
import { useCandidateStore } from '@/stores/useCandidateStore'

const JobHeader = ({ job, hasApplyJob, isSave }) => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  
  const { saveJob, deleteJobSave } = useCandidateStore();
  const accessToken = useAuthStore(s => s.accessToken);



  const countDay = Math.ceil((new Date(job?.expiredAt) - new Date()) / (1000 * 60 * 60 * 24))
  // const isSaveJob = saveJobs?.some(s => )
    
  let location;
  if(job) {
    location = toLocation(job?.location)
  }

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
    <div className='w-full flex flex-wrap justify-between items-center bg-white border border-gray-300 rounded-lg shadow-lg p-6'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold'>{job?.title}</h1>
        <div className='flex flex-wrap items-center gap-2'>
            <Badge variant='ghost' className={`text-green-900 bg-green-200`}><MapPin />{location}</Badge>
            <Badge variant='ghost' className={`text-green-900 bg-green-200`}><CircleDollarSign /> {job?.salaryMin} - {job?.salaryMax}đ</Badge>
        </div>
        <p className='text-gray-500 py-2'>Hạn nộp hồ sơ: <span className='text-black font-medium'>{transformLocationTime(job?.expiredAt)} (Còn {countDay} ngày)</span></p>
      </div>

      {
        hasApplyJob ? (
          <Button variant='ghost' size='xl' className={`bg-white text-green-700 border-green-700`}>
            Đã ứng tuyển
          </Button>
        ) : (
          <div className='flex pt-2 md:pt-0 md:flex-col gap-4'>
            <Button onClick={openDialog} variant='ghost' size='xl' className={`bg-green-700 text-white`}>
              Ứng tuyển ngay
            </Button>
            {
              isSave ?
                <Button onClick={handleDeleteSaveJob} variant='ghost' size='xl' className={`border border-red-700 bg-red-100 text-red-700`}>
                  <Trash />Xóa khỏi tin đã lưu
                </Button> : 
                <Button onClick={handleSaveJob} variant='ghost' size='xl' className={`border border-green-700`}>
                  <Heart />Lưu tin
                </Button>
            }
          </div>
        )
      }

      <Popup openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog}/>
      <ApplyJob openApplyDialog={openApplyDialog} setOpenApplyDialog={setOpenApplyDialog} job={job}/>
    </div>
  )
}

export default JobHeader
