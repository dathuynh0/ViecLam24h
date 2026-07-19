import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { CircleDollarSign, Heart, MapPin } from 'lucide-react'
import { Button } from '../ui/button'
import transformLocationTime from '@/lib/day'
import { toLocation } from '@/lib/location'
import { useAuthStore } from '@/stores/useAuthStore'
import Popup from '../Popup'
import { useApplicationStore } from '@/stores/useApplicationStore'
import Loading from '../Loading'
import ApplyJob from './ApplyJob'
import { useCandidateStore } from '@/stores/useCandidateStore'

const JobHeader = ({ job }) => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  
  const { applicationLoading } = useApplicationStore();
  const { saveJob, candidateLoading } = useCandidateStore();
  const accessToken = useAuthStore(s => s.accessToken);

  const countDay = Math.ceil((new Date(job?.expiredAt) - new Date()) / (1000 * 60 * 60 * 24))

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

  if(applicationLoading || candidateLoading) {
    return <Loading />
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
        <Button onClick={openDialog} variant='ghost' size='xl' className={`bg-green-700 text-white`}>
            Ứng tuyển ngay
        </Button>
        <Button onClick={handleSaveJob} variant='ghost' size='xl' className={`border border-green-700`}>
            <Heart />Lưu tin
        </Button>

        <Popup openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog}/>
        <ApplyJob openApplyDialog={openApplyDialog} setOpenApplyDialog={setOpenApplyDialog} job={job}/>
      </div>
    </div>
  )
}

export default JobHeader
