import Filter from '@/components/ApplicationJob/Filter'
import { useApplicationStore } from '@/stores/useApplicationStore';
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router';



const Application = () => {
    const { applications, getApplicationByCandidate } = useApplicationStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get('status')

    useEffect(() => {
        getApplicationByCandidate({ status });
    }, [])

    useEffect(() => {
        document.title = 'Việc làm 24h - Lịch sử ứng tuyển'
    }, [])

    const handleFilterChange = async (newFilters) => {
        const { status } = newFilters;
        // set lại URL, ví dụ: /jobs?salary=10-15&workType=full-time
        const queryParams = {
            status
        };

        setSearchParams(queryParams);
        await getApplicationByCandidate(queryParams);
    };
    

  return (
    <div className='max-w-[1200px] mx-auto py-4'>
        <div className='border border-gray-300 p-4 rounded-lg'>
            <h1 className='text-lg font-bold pb-4'>Việc làm đã ứng tuyển</h1>

            <Filter onFilterChange={handleFilterChange} applications={applications}/>
        </div>
        
    </div>
  )
}

export default Application
