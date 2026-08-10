import BreadCrumb from '@/components/BreadCrumb'
import CompanyHeader from '@/components/Company/CompanyHeader';
import Content from '@/components/Company/Content';
import JobCompany from '@/components/Company/JobCompany';
import More from '@/components/Company/More';
import Loading from '@/components/Loading';
import { useCompanyStore } from '@/stores/useCompanyStore'
import React, { useEffect } from 'react'
import { useParams } from 'react-router';

const CompanyPage = () => {
    const { company, getCompanyBySlug, companyLoading } = useCompanyStore();

    const { slug } = useParams();

    useEffect(() => {
        getCompanyBySlug(slug)
    }, [slug]);

    useEffect(() => {
        document.title = `${company?.companyName} - Việc làm 24h`;
    }, [company])
    
    const parent = {
        "title": "Công ty",
        "slug": `${`/cong-ty`}`
    }

    if (companyLoading) {
        return <Loading />
    }
    

  return (
    <div className='p-4 md:p-0 max-w-[1100px] mx-auto py-2 space-y-4'>
      
      <div className='pt-2'>
        <BreadCrumb parent={parent} currentPage={company?.companyName}/>
      </div>

      <CompanyHeader company={company}/>
      <div className='md:grid md:grid-cols-10'>
        <div className='col-span-6 space-y-4'>
            <Content company={company}/>

            <JobCompany company={company}/>
        </div>
        <div className='hidden md:block py-4 md:py-0 md:col-span-4 md:ml-4 space-y-4'>
            <More company={company}/>
        </div>
        </div>
    </div>
  )
}

export default CompanyPage
