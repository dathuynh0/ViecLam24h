import Contact from '@/components/Profile/Contact'
import Content from '@/components/Profile/Content'
import CV from '@/components/Profile/CV'
import OpenEditProfile from '@/components/Profile/OpenEditProfile'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import Skill from '@/components/Profile/Skill'
import { useAuthStore } from '@/stores/useAuthStore'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const user = useAuthStore(s => s.user)

    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        document.title = `Thông tin ứng viên - ${user?.fullName}`
    }, [])

  return (
    <div className='max-w-[1200px] mx-auto py-4 space-y-4'>
      <ProfileHeader setOpenEdit={() => setOpenEdit(true)} user={user}/>
      <OpenEditProfile user={user} isOpen={openEdit} onClose={() => setOpenEdit(false)}/>

      <div className='grid grid-cols-10 space-x-4'>
            <div className='col-span-6'>
                <Content user={user}/>
            </div>
            <div className='col-span-4 space-y-4'>
                <Contact user={user}/>
                <Skill user={user} />
                <CV user={user}/>
            </div>
      </div>
    </div>
  )
}

export default Profile
