import { useJobStore } from '@/stores/useJobStore'
import React, { useEffect } from 'react'
import FeaturedJobCard from './FeaturedJobCard';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const FeaturedJob = () => {
    const { featuredJob, getFeaturedJob } = useJobStore();

    useEffect(() => {
        getFeaturedJob();
    }, [])
    
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <h2 className='font-bold text-3xl'>Việc làm <span className='text-green-700'>nổi bật</span></h2>
          <p className='text-sm text-gray-500'>Rất nhiều công việc hấp dẫn đang chờ bạn</p>
        </div>
        <Link to={`/viec-lam`} className='flex items-center text-sm hover:text-green-700 hover:underline'>Xem tất cả <ArrowRight className='h-5 w-5'/></Link>
      </div>
      <ul className='py-6 grid grid-cols-1 md:grid-cols-3 space-y-4 lg:gap-4'>
        {featuredJob?.map((job) => (
            <li key={job.id}>
                <FeaturedJobCard featuredJob={job}/>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default FeaturedJob
