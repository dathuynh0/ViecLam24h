import BreadCrumb from '@/components/BreadCrumb';
import JobCard from '@/components/CategoryJob/JobCard';
import JobFilter from '@/components/CategoryJob/JobFilter';
import Loading from '@/components/Loading';
import SearchJob from '@/components/SearchJob'
import { Button } from '@/components/ui/button';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useJobStore } from '@/stores/useJobStore'
import { SlidersHorizontal, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router';

const CategoryJob = () => {
  const { slug } = useParams();
  const { jobOfCategory, getJobByCategory } = useJobStore();
  const { category, getCategoryBySlug, categoryLoading } = useCategoryStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const salary = searchParams.get('salary');
  const field = searchParams.get('field');
  const work_type = searchParams.get('work_type');
  const work_arrangement = searchParams.get('work_arrangement');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const parent = {
    title: 'Việc làm',
    slug: 'viec-lam'
  }

  useEffect(() => {
    getJobByCategory(slug, salary, field, work_type, work_arrangement);
    getCategoryBySlug(slug);
    
  }, [slug]);


  useEffect(() => {
    document.title = `Việc làm 24h - ${category?.title}`
  }, [category]);

  const handleFilterChange = async (newFilters) => {
    const { salary, companyField, workType, workArrangement } = newFilters;
    // set lại URL, ví dụ: /jobs?salary=10-15&workType=full-time
     const queryParams = {
        salary,
        field: companyField,
        work_type: workType,
        work_arrangement: workArrangement,
      };

      setSearchParams(queryParams);
      await getJobByCategory(slug, queryParams);
  };

  if(categoryLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className='w-full py-3 px-4 flex items-center justify-center bg-green-700'>
        <SearchJob />
      </div>

      <div className='p-4 md:p-0 space-y-4 max-w-[1200px] mx-auto py-2 my-2'>

        <BreadCrumb parent={parent} currentPage={category?.title} />
        
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
            <JobFilter onFilterChange={handleFilterChange} />
          </div>

          {/* Filter cho mobile - dạng overlay/drawer */}
          {isFilterOpen && (
            <div className='md:hidden fixed inset-0 z-50 flex'>
              <div
                className='absolute inset-0 bg-black/50'
                onClick={() => setIsFilterOpen(false)}
              />

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
                />
              </div>
            </div>
          )}

          <div className='md:col-span-7'>
            {jobOfCategory.length > 0 ? (
              <ul className='space-y-4'>
                {jobOfCategory?.map((job) => (
                  <li key={job.id}>
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className='flex items-center justify-center py-8 text-gray-500 text-center'>
                Chưa có công việc liên quan đến {category?.title}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default CategoryJob
