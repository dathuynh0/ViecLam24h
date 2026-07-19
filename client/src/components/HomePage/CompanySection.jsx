import { useCompanyStore } from '@/stores/useCompanyStore'
import { ArrowRight } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router'
import FeaturedCompanyCard from './FeaturedCompanyCard'
import Loading from '../Loading'

const CompanySection = () => {
    const { featuredCompany, getFeaturedCompany, companyLoading } = useCompanyStore();

    useEffect(() => {
        getFeaturedCompany();
    }, [])


    if(companyLoading) {
        return <Loading />
    }
    
  return (
    <div className='py-18'>
        <div className='flex items-center justify-between'>
            <div className='space-y-2'>
                <h2 className='font-bold text-3xl'>Đối tác <span className='text-green-700'>chiến lược</span></h2>
                <p className='text-sm text-gray-500'>Những công ty hàng đầu đang tìm kiếm ứng viên</p>
            </div>
            <Link to={`/cong-ty`} className='flex items-center text-sm hover:text-green-700 hover:underline line-clamp-1'>Xem tất cả <ArrowRight className='h-5 w-5'/></Link>
        </div>
        <ul className='py-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
            {featuredCompany.map((company) => (
                <li key={company.id}>
                    <FeaturedCompanyCard featuredCompany={company} />
                </li>
            ))}
        </ul>
    </div>
  )
}

export default CompanySection
