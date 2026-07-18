import React from 'react'
import { Button } from '../ui/button'
import { FileCheck, ShieldCheck, Users } from 'lucide-react'

const More = ({ company }) => {
  return (
    <div className='border border-gray-300 p-4 rounded-lg shadow-md'>
        <h2 className='text-lg font-bold pt-1 py-3'>Thông tin chung</h2>
        <div className='space-y-4'>
            <MoreContent icon={<FileCheck />} title={`Mã số thuế`} content={company?.taxCode}/>
            <MoreContent icon={<Users />} title={`Quy mô công ty`} content={`${company?.companySize} nhân viên`}/>
            <MoreContent icon={<ShieldCheck />} title={'Lĩnh vực hoạt động'} content={company?.field}/>
        </div>
    </div>
  )
}

const MoreContent = ({ icon, title, content }) => {
    return (
        <div className='flex items-center gap-4 text-sm'>
            <Button variant='ghost' className={`h-10 w-10 p-2 bg-slate-100 text-muted-foreground`}>
                {icon}
            </Button>
            <div className='flex flex-col gap-1'>
                <h3 className='text-muted-foreground'>{title}</h3>
                <p className='font-bold'>{content}</p>
            </div>
        </div>
    )
}

export default More
