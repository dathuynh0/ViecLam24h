import React, { useState } from 'react'
import { Button } from '../ui/button'
import { CircleDollarSign, Heart, MapPin } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Link } from 'react-router'
import { toLocation } from '@/lib/location'
import Popup from '../Popup'
import { useCandidateStore } from '@/stores/useCandidateStore'
import { useAuthStore } from '@/stores/useAuthStore'
import Loading from '../Loading'

const FeaturedJobCard = ({ featuredJob }) => {
  const location = toLocation(featuredJob.location);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const accessToken = useAuthStore((s) => s.accessToken);
  const { candidateLoading, saveJob } = useCandidateStore();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleSaveJob = async () => {
    if(!accessToken) {
      setOpenLoginDialog(true);
      return;
    }

    await saveJob(featuredJob?.id);
  }

  if(candidateLoading) {
    return <Loading />
  }

  return (
    <div className='border px-4 py-4 rounded-xl shadow-md'>
      <div className='flex justify-between'>
        <img src={`${backendUrl}/${featuredJob.createdBy.logoUrl}`} alt={'Logo công ty'}
        className='flex h-18 w-18 shrink-0 rounded-xl p-2 shadow-sm object-cover'
        />
        <Button onClick={handleSaveJob} variant='ghost' className={`h-8 w-8 border border-green-300 text-green-700 hover:bg-green-300 hover:text-white rounded-full cursor-pointer`}><Heart /></Button>
        
        <Popup openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog}/>

      </div>
      <div>
        <h2 className='text-lg font-medium hover:underline hover:text-green-700 cursor-pointer'>
            <Link className='w-full' to={`/viec-lam/${featuredJob.slug}`}>
                {featuredJob.title}
            </Link>
        </h2>
        <p className='text-gray-500 text-sm font-medium'>{featuredJob.createdBy.companyName}</p>
        <div className='py-5'>
            <div className='flex items-center gap-2'>
                <Badge variant='ghost' className={`bg-slate-200 text-slate-900`}><CircleDollarSign />{featuredJob.salaryMin} - {featuredJob.salaryMax}đ</Badge>
                <Badge variant='ghost' className={`bg-slate-200 text-slate-900`}><MapPin />{location}</Badge>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedJobCard
