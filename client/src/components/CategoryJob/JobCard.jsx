import { CircleDollarSignIcon, Heart } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'
import { toLocation } from '@/lib/location'
import { calculateDate } from '@/lib/day'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { useCandidateStore } from '@/stores/useCandidateStore'
import Loading from '../Loading'
import Popup from '../Popup'

const JobCard = ({ job }) => {
    const location = toLocation(job?.location)
    const day = calculateDate(job?.createdAt)

    const { candidateLoading, saveJob } = useCandidateStore();
    const accessToken = useAuthStore((s) => s.accessToken);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);

    const handleSaveJob = async () => {
        if(!accessToken) {
            setOpenLoginDialog(true);
            return;
        }

        await saveJob(job?.id);
    }

    if(candidateLoading) {
        return <Loading />
    }
    

  return (
    <div className='w-full border border-gray-300 rounded-lg p-4'>
        <div className='flex justify-between gap-4'>
            <div className='flex items-center gap-4'>
                <img src={`${import.meta.env.VITE_BACKEND_URL}/${job?.createdBy?.logoUrl}`} alt={`Logo nhà tuyển dụng`} className='flex h-22 w-22 shrink-0 rounded-xl p-2 shadow-sm object-contain border border-gray-400' />

                <div className='flex flex-col space-y-1'>
                    <Link to={`/viec-lam/${job?.slug}`} className='text-green-700 text-lg font-medium hover:underline'>{job?.title}</Link>
                    <p className='text-muted-foreground font-medium'>{job?.createdBy?.companyName}</p>
                    <span className='text-sm flex items-center gap-3 font-medium text-muted-foreground'><CircleDollarSignIcon className='h-5 w-5 text-muted-foreground'/>{job?.salaryMin} - {job?.salaryMax}đ</span>
                    <Badge variant='ghost' title={job?.location} className={`text-green-800 bg-green-200 mt-1`}>{location}</Badge>
                </div>
            </div>

            <div className='flex h-full items-center gap-2'>
                <p className='text-muted-foreground text-sm font-medium'>Đăng {day} ngày trước</p>
                <Button title='Thêm vào danh sách yêu thích' onClick={handleSaveJob} variant='ghost' className={`h-8 w-8 border-green-300 text-green-700 rounded-full cursor-pointer`}><Heart /></Button>
                <Popup openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog}/>
            </div>
        </div>
    </div>
  )
}

export default JobCard
