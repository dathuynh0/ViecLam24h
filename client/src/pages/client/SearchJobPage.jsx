import BreadCrumb from '@/components/BreadCrumb';
import JobCard from '@/components/CategoryJob/JobCard';
import SearchJob from '@/components/SearchJob';
import JobFilter from '@/components/SearchJob/JobFilter';
import { Button } from '@/components/ui/button';
import { useJobStore } from '@/stores/useJobStore';
import { SlidersHorizontal, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import Pagination from '../Admin/Pagination';

const SearchJobPage = () => {
  const { searchJob, getSearchJob, totalPageSearch } = useJobStore();
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name')
  const location = searchParams.get('location');
  const salary = searchParams.get('salary');
  const field = searchParams.get('field');
  const work_type = searchParams.get('work_type');
  const work_arrangement = searchParams.get('work_arrangement');
  
  const handleFilterChange = (newFilters) => {
    const { salary, companyField, workType, workArrangement } = newFilters;
    // set lại URL, ví dụ: /jobs?salary=10-15&workType=full-time
     const queryParams = {
        name,
        location,
        salary,
        field: companyField,
        work_type: workType,
        work_arrangement: workArrangement,
      };

      setSearchParams(queryParams);
      getSearchJob(queryParams);
  }

  useEffect(() => {
    getSearchJob({ page, name, location, salary, field, work_type, work_arrangement });
  } , [page, name, location])

  useEffect(() => {
    document.title = 'Việc làm 24h - Tìm kiếm'
  }, [])


  const parent = {
    'title': 'Tìm kiếm',
    'slug': `${`tim-kiem`}`,
  }

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <div className='w-full py-3 px-4 flex items-center justify-center bg-green-700 mb-2'>
        <SearchJob />
      </div>

      <div className='p-4 md:p-0 space-y-4 max-w-[1100px] mx-auto py-2'>

        <BreadCrumb parent={parent} currentPage={`Việc làm ${name} và ${location}`} />

        
        <Button
          variant='outline'
          onClick={() => setIsFilterOpen(true)}
          className='md:hidden w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium'
        >
          <SlidersHorizontal size={18} />
          Bộ lọc
        </Button>

        <div className='grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-0'>

          
          <div className='hidden md:block md:col-span-3'>
            <JobFilter onFilterChange={handleFilterChange} name={name} location={location} />
          </div>

          
          {isFilterOpen && (
            <div className='md:hidden fixed inset-0 z-50 flex'>
             
              <div
                className='absolute inset-0 bg-black/50'
                onClick={() => setIsFilterOpen(false)}
              />

              {/* Panel filter trượt từ trái vào */}
              <div className='relative bg-white w-[85%] max-w-sm h-full overflow-y-auto p-4 animate-in slide-in-from-left'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-semibold text-lg'>Bộ lọc</h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X size={22} />
                  </button>
                </div>

                <JobFilter
                  onFilterChange={(filters) => {
                    handleFilterChange(filters);
                    setIsFilterOpen(false);
                  }}
                  name={name}
                  location={location}
                />
              </div>
            </div>
          )}

          <div className='md:col-span-7'>
            {
              searchJob.length > 0 ? (
                <ul className='space-y-4'>
                  {searchJob?.map((job) => (
                    <li key={job?.id}>
                      <JobCard job={job} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='flex items-center justify-center py-8 text-gray-500'>
                  Chưa có công việc liên quan
                </p>
              )
            }
          </div>
        </div>
            { searchJob.length > 0 &&  <Pagination currentPage={page} onChangePage={(newPage) => {
              setPage(newPage)
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
            }} totalPage={totalPageSearch} />}
      </div>
    </div>
  )
}

export default SearchJobPage