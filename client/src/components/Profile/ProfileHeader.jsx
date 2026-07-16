import { FileText, Mail, MapPin } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const ProfileHeader = ({ user }) => {
  return (
    <div className='md:flex items-center justify-between bg-white px-4 py-6 border border-gray-300 rounded-lg shadow-lg'>
      <div className='flex items-center gap-6'>
            <img className='h-20 w-20 rounded-full object-cover' src={`${import.meta.env.VITE_BACKEND_URL}/${user?.avatarUrl || user?.logoUrl}`} 
            alt={user?.fullName || user?.companyName} />

            <div>
                <h1 className='text-lg font-bold'>{user?.fullName || user?.companyName}</h1>
                <span className='text-green-800 font-medium'>{user?.major}</span>
                <p className='flex items-center gap-3 text-sm text-muted-foreground'><MapPin className='h-4 w-4'/>{user?.location}</p>
            </div>
        </div>

        {user?.role === 'candidate' && 
            <div className='pt-4 md:pt-0 flex items-center gap-4'>
                <Button size='xl' variant='ghost' className={`border-green-700 text-green-700`}>
                    <Mail /> Liên hệ qua mail
                </Button>
                <Button size='xl' variant='ghost' className={`border-green-700 bg-green-700 text-white`}>
                    <FileText /> Tải CV
                </Button>
        </div>
        }
    </div>
  )
}

export default ProfileHeader
