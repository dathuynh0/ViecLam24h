import React from 'react'
import { Link } from 'react-router'
import { Badge } from '../ui/badge'
import { BriefcaseBusiness } from 'lucide-react'

const FeaturedCompanyCard = ({ featuredCompany }) => {
  return (
    <div className='border px-4 py-4 rounded-xl shadow-md'>
      <div className='py-2 flex gap-4'>
        <img src={`http://localhost:8080/${featuredCompany.logoUrl}`} alt={'Logo công ty'}
        className='flex h-18 w-18 shrink-0 rounded-xl p-2 shadow-sm object-cover border border-gray-400'
        />
        <div className='space-y-2'>
            <h2 className='text-lg font-medium hover:underline hover:text-green-700 cursor-pointer'>
                <Link className='w-full' to={`/viec-lam/${featuredCompany.slug}`}>
                    {featuredCompany.companyName}
                </Link>
            </h2>
            <Badge variant='ghost' className={`text-green-900 bg-green-200`}>{featuredCompany.field}</Badge>
        </div>
      </div>
        <p className='flex items-center gap-2 text-sm py-2 text-slate-900'><BriefcaseBusiness className='h-4 w-4'/>{featuredCompany.job.length} công việc đang tuyển</p>
    </div>
  )
}

export default FeaturedCompanyCard
