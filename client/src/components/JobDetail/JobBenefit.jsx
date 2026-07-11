import React from 'react'

const JobBenefit = ({ job }) => {
  return (
    <div className='pt-2 pb-4 px-4 bg-white border border-gray-300 rounded-lg shadow-lg'>
        <div className='py-4'>
            <h3 className='border-l-4 border-green-800 pl-2 font-bold pb-2'>Quyền lợi</h3>
            <ul className='space-y-2'>
                {job?.benefit.map((benefit) => (
                    <li>
                        - {benefit}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default JobBenefit
