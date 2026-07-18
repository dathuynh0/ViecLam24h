import React from 'react'

const Content = ({ company }) => {
  return (
    <div className='border border-gray-300 p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-bold pt-1 py-3'>Giới thiệu công ty</h2>
      <ul className='space-y-3'>
        {
            company?.description.map((desc) => (
                <li className='text-slate-800'>
                    {desc}
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default Content
