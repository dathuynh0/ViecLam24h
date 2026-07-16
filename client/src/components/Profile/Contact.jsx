import React from 'react'
import { Button } from '../ui/button'
import { FileUser, Mail, Phone } from 'lucide-react'

const Contact = ({ user }) => {
  return (
    <div className='border border-gray-300 rounded-lg bg-white shadow-lg p-4 space-y-4'>
        <h2 className='text-lg font-bold flex items-center gap-3'>
            <Button variant='ghost' className={`h-5 w-5 bg-green-100 rounded-lg p-5`}>
                <FileUser />
            </Button>
            Thông tin liên hệ
        </h2>
        <ContactForm icon={<Mail />} title={`Email`} content={user?.email}/>
        <ContactForm icon={<Phone />} title={`Số điện thoại`} content={user?.phone}/>
    </div>
  )
}

const ContactForm = ({ icon, title, content }) => {
    return (
        <div className='flex items-center gap-4'>
            <Button variant='ghost' className={`h-5 w-5 rounded-full bg-slate-200 p-5`}>
                {icon}
            </Button>
            <div className='flex flex-col'>
                <span className='text-slate-500'>{title}</span>
                <span className='font-bold'>{content}</span>
            </div>
        </div>
    )
}

export default Contact
