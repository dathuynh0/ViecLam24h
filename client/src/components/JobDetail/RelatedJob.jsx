import { useJobStore } from '@/stores/useJobStore'
import React, { useEffect } from 'react'
import { Link } from 'react-router';
import { Badge } from '../ui/badge';
import { CircleDollarSignIcon } from 'lucide-react';
import { toLocation } from '@/lib/location';
import Loading from '../Loading';

const RelatedJob = ({ job }) => {
    const { getRelatedJob, relatedJob, jobLoading } = useJobStore();

    const location = toLocation(job?.location)

    useEffect(() => {
        getRelatedJob(job?.id)
    }, [job])

    if (jobLoading) {
        return <Loading />
    }

   
  return (
    <>
        {
            relatedJob?.length !== 0 &&
            <div className='border border-gray-300 rounded-lg shadow-lg p-4 space-y-4'>
                <h1 className='text-lg font-bold'>Công việc liên quan</h1>
                <ul className='space-y-4'>
                    {
                        relatedJob?.map((j) => {
                            return (
                                <li key={j.id}>
                                    <div className='w-full border border-gray-300 rounded-lg p-4'>
                                        <div className='flex justify-between gap-4'>
                                            <div className='flex items-center gap-4'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/${j?.createdBy?.logoUrl}`} alt={`Logo nhà tuyển dụng`} className='flex h-18 w-18 shrink-0 rounded-xl p-2 shadow-sm object-contain border border-gray-400' />

                                                <div className='flex flex-col'>
                                                    <Link target='_blank' to={`/viec-lam/${j?.slug}`} className='text-green-700 text-lg font-medium hover:underline line-clamp-1'>{j?.title}</Link>
                                                    <p className='text-muted-foreground font-medium'>{j?.createdBy?.companyName}</p>
                                                    <span className='text-sm flex items-center gap-3 font-medium text-muted-foreground'><CircleDollarSignIcon className='h-5 w-5 text-muted-foreground'/>{j?.salaryMin} - {j?.salaryMax}đ</span>
                                                    <Badge variant='ghost' title={j?.location} className={`text-green-800 bg-green-200 mt-1`}>{location}</Badge>
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
