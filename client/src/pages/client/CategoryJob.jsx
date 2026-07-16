import BreadCrumb from '@/components/BreadCrumb';
import JobCard from '@/components/CategoryJob/JobCard';
import JobFilter from '@/components/CategoryJob/JobFilter';
import Loading from '@/components/Loading';
import SearchJob from '@/components/SearchJob'
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useJobStore } from '@/stores/useJobStore'
import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router';

const CategoryJob = () => {
  const { slug } = useParams();
  const { jobOfCategory, getJobByCategory, jobLoading } = useJobStore();
  const { category, getCategoryBySlug, categoryLoading } = useCategoryStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const salary = searchParams.get('salary');
  const field = searchParams.get('field');
  const work_type = searchParams.get('work_type');
  const work_arrangement = searchParams.get('work_arrangement');
  
  
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

  if(jobLoading || categoryLoading) {
    return <Loading />
  }

  return (
    <div>
        <div className='w-full py-3 px-4 flex items-center justify-center bg-green-700'>
          <SearchJob />
        </div>

        <div className='space-y-4 max-w-[1200px] mx-auto py-2'>

          <BreadCrumb  parent={parent} currentPage={category?.title}/>

          <div className='grid grid-cols-10'>
            <div className='col-span-3'>
              <JobFilter onFilterChange={handleFilterChange}/>
            </div>

            <div className='col-span-7'>
              {jobOfCategory.length > 0 ? (
                <ul className='space-y-4'>
                  {jobOfCategory?.map((job) => (
                    <li key={job.id}>
                      <JobCard job={job}/>
                    </li>
                  ))}
              </ul>
              ) : <p className='flex items-center justify-center'>Chưa có công việc liên quan đến {category?.title}</p>}
            </div>
          </div>

        </div>
    </div>
  )
}

export default CategoryJob
