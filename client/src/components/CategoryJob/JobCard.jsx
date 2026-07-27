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
        <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>

            
            <div className='flex items-start sm:items-center gap-3 sm:gap-4 min-w-0'>
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${job?.createdBy?.logoUrl}`}
                    alt={`Logo nhà tuyển dụng`}
                    className='h-14 w-14 md:h-22 md:w-22 shrink-0 rounded-xl p-2 shadow-sm object-contain border border-gray-400'
                />

                <div className='flex flex-col space-y-1 min-w-0'>
                    <Link
                        to={`/viec-lam/${job?.slug}`}
                        className='text-green-700 text-base md:text-lg font-medium hover:underline line-clamp-2 sm:line-clamp-1'
                    >
                        {job?.title}
                    </Link>
                    <p className='text-muted-foreground font-medium text-sm md:text-base truncate'>
                        {job?.createdBy?.companyName}
                    </p>
                    <span className='text-sm flex items-center gap-2 font-medium text-muted-foreground flex-wrap'>
                        <CircleDollarSignIcon className='h-5 w-5 text-muted-foreground shrink-0' />
                        {job?.salaryMin} - {job?.salaryMax}đ
                    </span>
                    <Badge variant='ghost' title={job?.location} className='text-green-800 bg-green-200 mt-1 w-fit'>
                        {location}
                    </Badge>
                </div>
            </div>

            
            <div className='flex items-center justify-between sm:flex-col sm:items-end sm:justify-start gap-2 sm:gap-2 sm:shrink-0'>
                <p className='text-muted-foreground text-xs md:text-sm font-medium order-2 sm:order-1'>
                    {day === 0 ? 'Mới đây' : `Đăng ${day} ngày trước`}
                </p>
                <div className='flex items-center gap-2 order-1 sm:order-2'>
                    <Button
                        title='Thêm vào danh sách yêu thích'
                        onClick={handleSaveJob}
                        variant='ghost'
                        className='h-8 w-8 border-green-300 text-green-700 rounded-full cursor-pointer'
                    >
                        <Heart />
                    </Button>
                    <Popup openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog} />
                </div>
            </div>

        </div>
    </div>
  )
}

export default JobCard
