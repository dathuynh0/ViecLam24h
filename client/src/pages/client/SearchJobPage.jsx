import BreadCrumb from '@/components/BreadCrumb';
import JobCard from '@/components/CategoryJob/JobCard';
import SearchJob from '@/components/SearchJob';
import JobFilter from '@/components/SearchJob/JobFilter';
import { useJobStore } from '@/stores/useJobStore';
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router';

const SearchJobPage = () => {
  const { searchJob, getSearchJob } = useJobStore();

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
      getSearchJob(queryParams)
  }

  useEffect(() => {
    getSearchJob({ name, location, salary, field, work_type, work_arrangement });
  } , [name, location])

  useEffect(() => {
    document.title = 'Việc làm 24h - Tìm kiếm'
  }, [])


  const parent = {
    'title': 'Tìm kiếm',
    'slug': '/tim-kiem',
  }

  return (
    <div>
        <div className='w-full py-3 px-4 flex items-center justify-center bg-green-700'>
          <SearchJob />
        </div>

        <div className='space-y-4 max-w-[1200px] mx-auto py-2'>

          <BreadCrumb  parent={parent} currentPage={`Việc làm ${name} và ${location}`}/>

          <div className='grid grid-cols-10'>
            <div className='col-span-3'>
              <JobFilter onFilterChange={handleFilterChange} name={name} location={location}/>
            </div>

            <div className='col-span-7'>
              {
                searchJob.length > 0 ?
                (
                  <ul className='space-y-4'>
                    {searchJob?.map((job) => (
                      <li key={job?.id}>
                        <JobCard job={job}/>
                      </li>
                    ))}
                  </ul>
                )
                :
                <p className='flex items-center justify-center'>Chưa có công việc liên quan</p>
              }
            </div>
          </div>

        </div>
    </div>
  )
}

export default SearchJobPage