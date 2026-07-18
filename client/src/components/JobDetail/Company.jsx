import { Earth, MapPin } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import { Link } from 'react-router';

const Company = ({ job }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
  return (
    <div className='w-full p-4 border border-gray-300 rounded-lg shadow-lg'>
      <h2 className='font-bold text-lg pb-3'>Thông tin công ty</h2>
      <div className='flex items-center gap-3'>
        <img className='flex h-18 w-18 shrink-0 rounded-xl p-2 shadow-sm object-cover border border-gray-400' src={`${backendUrl}/${job?.createdBy?.logoUrl}`} alt="Logo công ty" />
        <div>
            <h2 className='font-bold'>{job?.createdBy?.companyName}</h2>
            <p className='text-gray-500 text-sm'>Quy mô: <span className='text-black font-medium'>{job?.createdBy?.companySize} nhân viên</span></p>
        </div>
      </div>
      <p className='flex items-center text-gray-500 text-sm gap-2 py-3'><MapPin className='h-5 w-5'/>{job?.createdBy?.address}</p>
      {job?.createdBy?.website && 
        <a href={job?.createdBy?.website} target='_blank' className='flex items-center gap-2 text-sm text-green-700 pb-4'><Earth className='h-5 w-5'/>{job?.createdBy?.website}</a>
      }
      <Button variant='ghost' className={`border border-green-700 text-green-800 hover:bg-green-700 hover:text-white max-w-xs block mx-auto`}>
        <Link to={`/cong-ty/${job?.createdBy?.slug}`} className='w-full'>
            Xem chi tiết
        </Link>
      </Button>
    </div>
  )
}

export default Company
