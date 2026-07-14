import BreadCrumb from '@/components/BreadCrumb';
import Company from '@/components/JobDetail/Company';
import JobBenefit from '@/components/JobDetail/JobBenefit';
import JobDescription from '@/components/JobDetail/JobDescription';
import JobHeader from '@/components/JobDetail/JobHeader';
import JobInformation from '@/components/JobDetail/JobInformation';
import JobMore from '@/components/JobDetail/JobMore';
import JobRequirement from '@/components/JobDetail/JobRequirement';
import Loading from '@/components/Loading';
import SearchJob from '@/components/SearchJob';
import { useJobStore } from '@/stores/useJobStore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router'

const JobDetail = () => {
    const { slug } = useParams();
    const { jobDetail, getJobBySlug, jobLoading } = useJobStore();
    
    useEffect(() => {
        getJobBySlug(slug);
    }, [slug]);

    useEffect(() => {
        document.title = `${jobDetail?.createdBy?.companyName} - ${jobDetail?.title}`
    }, [jobDetail])

    if(jobLoading) {
        return <Loading /> 
    }

    console.log(slug, jobDetail);
    
  return (
    <div className=''>
      <div className='w-full py-6 px-4 flex items-center justify-center bg-green-700'>
        <SearchJob />
      </div>

      <div className='space-y-4 max-w-[1200px] mx-auto px-4 lg:px-12 py-4'>
        
        <BreadCrumb category={jobDetail?.category} jobName={jobDetail?.title}/>

        <JobHeader job={jobDetail}/>
        <div className='md:grid md:grid-cols-10'>
          <div className='col-span-6 space-y-4'>
              <JobDescription job={jobDetail}/>
              <JobRequirement job={jobDetail}/>
              <JobBenefit job={jobDetail}/>
              <JobMore job={jobDetail}/>
          </div>
          <div className='hidden md:block py-4 md:py-0 md:col-span-4 md:ml-4 space-y-4'>
              <Company job={jobDetail}/>
              <JobInformation job={jobDetail}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
