import SearchNameCompany from '@/components/Company/SearchNameCompany'
import Loading from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import { useCompanyStore } from '@/stores/useCompanyStore'
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router';
import Navigation from '@/pages/Admin/Pagination'

const ListCompany = () => {
    const { companies, getAllCompany, totalPageCompany, companyLoading } = useCompanyStore();

    const [name, setName] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        getAllCompany({ page, name });
    }, [page])

    useEffect(() => {
        document.title = 'Danh sách công ty'
    }, [])


    const handleSearchJob = (e) => {
        e.preventDefault();

        getAllCompany({ page: 1, name });
    }

    const handleChangePage = (newPage) => {
        if (newPage < 1 || newPage > totalPageCompany || newPage === page) return;

        setSearchParams({ page: newPage });
    }

    if (companyLoading) {
        return <Loading />
    }

  return (
    <section className='space-y-8'>
        <div className='bg-green-100 py-18'>
            <div className='max-w-[1200px] mx-auto space-y-2'>
                <h1 className='text-2xl font-bold text-green-700'>Khám phá với hơn {companies?.length} doanh nghiệp đang tuyển dụng</h1>
                <p className='pb-6 font-medium text-muted-foreground'>Tra cứu thông tin công ty và tìm kiếm nói làm việc tốt nhất giành cho bạn</p>
                    
                <SearchNameCompany onSubmit={handleSearchJob} name={name} setName={(e) => setName(e.target.value)}/>
            </div>
        </div>

        <div className='max-w-[1200px] mx-auto space-y-6'>
            <h2 className='text-2xl font-bold text-center'>Danh sách các công ty nổi bậc</h2>

            {
                companies?.length === 0 ? (
                    <p className='text-center'>Chưa có công ty nào...</p>
                ) : (
                    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            companies?.map((c) => (
                                <li
                                    key={c?.id}
                                    className='group border rounded-xl p-4 bg-white shadow-sm transition-shadow duration-200'
                                >
                                    <div className='flex items-center gap-3'>
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}/${c?.logoUrl}`}
                                            alt="Tên công ty"
                                            className='w-20 h-20 rounded-lg object-contain border shrink-0'
                                        />
                                        <div className='min-w-0 space-y-2'>
                                            <h3 className='font-semibold text-base truncate hover:text-green-700 hover:underline transition-colors'>
                                                <Link to={`/cong-ty/${c?.slug}`}>
                                                    {c?.companyName}
                                                </Link>
                                            </h3>
                                            <div className='flex flex-wrap gap-2 mt-1'>
                                                <Badge variant='ghost' className='bg-green-100 text-green-700'>{c?.field}</Badge>
                                                <Badge variant='ghost' className='bg-green-100 text-green-700'>
                                                    {c?.jobCount} công việc đang tuyển
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`${c?.description && 'line-clamp-6'} text-muted-foreground mt-3`}>
                                        {c?.description ? c?.description : 'Chưa cập nhật'}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>

        { companies.length !== 0 && <Navigation currentPage={page} totalPage={totalPageCompany} onChangePage={handleChangePage} />}
    </section>
  )
}

export default ListCompany
