import { useJobStore } from '@/stores/useJobStore'
import React, { useEffect } from 'react'
import FeaturedJobCard from './FeaturedJobCard';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import Loading from '../Loading';

const FeaturedJob = () => {
    const { featuredJob, getFeaturedJob, jobLoading } = useJobStore();

    useEffect(() => {
        getFeaturedJob();
    }, [])

    if(jobLoading) {
      return <Loading />
    }
    
  return (
    <div className='bg-green-50'>
      <div className='max-w-[1200px] mx-auto py-8 lg:py-12'>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <h2 className='font-bold text-3xl'>Việc làm <span className='text-green-700'>nổi bật</span></h2>
            <p className='text-sm text-gray-500'>Rất nhiều công việc hấp dẫn đang chờ bạn</p>
          </div>
          <Link to={`/tim-kiem`} className='flex items-center text-sm hover:text-green-700 hover:underline line-clamp-1'>Xem tất cả <ArrowRight className='h-5 w-5'/></Link>
        </div>
        <ul className='py-6 grid grid-cols-1 md:grid-cols-3 space-y-2 lg:gap-4'>
          {featuredJob?.map((job) => (
              <li key={job.id}>
                  <FeaturedJobCard featuredJob={job}/>
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FeaturedJob
