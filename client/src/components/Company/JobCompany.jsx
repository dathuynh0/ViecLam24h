import React from 'react'
import SearchJob from '../SearchJob'
import Job from './Job'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

const JobCompany = ({ company }) => {
  return (
    <div className='border border-gray-300 p-4 rounded-lg shadow-md'>
        <h2 className='text-lg font-bold pt-1 py-3'>Tin tuyển dụng</h2>
        <SearchJob />

        {
            company?.job?.length > 0 ? (
                <ul className='space-y-4 pt-4 pb-2'>
                    {
                        company.job.map((job) => (
                            <li key={job.id}>
                                <Job job={job} company={company}/>
                            </li>
                        ))
                    }
                    <div className='flex items-center justify-center'>
                        <Button size='xl' variant='ghost' className={`border border-green-700 text-green-700 hover:bg-green-700 hover:text-white`}>
                            <Link to={`/`} className='flex items-center gap-2'>
                                Xem thêm <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </ul>
            ) : <p className='text-muted-foreground text-lg text-center py-6'>Công ty chưa có bất kỳ bài tuyển dụng nào</p>
        }
    </div>
  )
}

export default JobCompany
