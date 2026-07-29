import { useJobStore } from '@/stores/useJobStore'
import React, { useEffect } from 'react'
import { Link } from 'react-router';
import { Badge } from '../ui/badge';
import { CircleDollarSignIcon } from 'lucide-react';
import { toLocation } from '@/lib/location';
import Loading from '../Loading';

const RelatedJob = ({ job }) => {
    const { getRelatedJob, relatedJob } = useJobStore();

    const location = toLocation(job?.location)

    useEffect(() => {
        getRelatedJob(job?.id)
    }, [job])
   
  return (
    <>
        {
            relatedJob?.length !== 0 &&
            <div className='border border-gray-300 rounded-lg shadow-lg p-4 space-y-4'>
                <h1 className='text-lg font-bold'>Công việc liên quan</h1>
                <ul className='space-y-4'>
                    {
                        relatedJob?.map((job) => {
                            return (
                                <li key={job.id}>
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
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            
        }
    </>
  )
}

export default RelatedJob
