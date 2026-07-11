import React from 'react'
import { Badge } from '../ui/badge'

const JobDescription = ({ job }) => {
  return (
    <div className='pt-2 pb-4 px-4 bg-white border border-gray-300 rounded-lg shadow-lg'>
        <div className='flex gap-2 pt-4'>
            <p className='flex-shrink-0'>Yêu cầu:</p>
            <ul className='flex flex-wrap items-center gap-2'>
                {job?.candidateRequirement.map((requirement) => (
                    <li key={requirement}>
                        <Badge variant='ghost' className={`bg-slate-200 text-slate-900 whitespace-normal`}>{requirement}</Badge>
                    </li>
                ))}
            </ul>
        </div>

        <div className='py-4'>
            <h3 className='border-l-4 border-green-800 pl-2 font-bold pb-2'>Mô tả công việc</h3>
            <ul className='space-y-2'>
                {job?.description.map((description) => (
                    <li>
                        - {description}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default JobDescription
