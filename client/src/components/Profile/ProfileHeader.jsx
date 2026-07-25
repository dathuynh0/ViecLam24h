import { Camera, MapPin, Settings, Upload } from 'lucide-react'
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useCandidateStore } from '@/stores/useCandidateStore'

const ProfileHeader = ({ user, setOpenEdit }) => {
    const fileInputRef = useRef(null);
    const cvInputRef = useRef(null);

    const { updateAvatar, updateCV } = useCandidateStore();

    const handleChangeAvatar = (e) => {
        const file = e.target.files?.[0];
        if(!file) return;

        updateAvatar(file);
    }

    const handleChangeCv = (e) => {
        const file = e.target.files?.[0];
        if(!file) return;

        updateCV(file)
    }

  return (
    <div className='md:flex items-center justify-between bg-white px-4 py-6 border border-gray-300 rounded-lg shadow-lg'>
        <div className='flex items-center gap-6'>
            <div className='group relative h-20 w-20 shrink-0'>
                <img className='h-20 w-20 rounded-full object-contain' src={`${import.meta.env.VITE_BACKEND_URL}/${user?.avatarUrl}`} 
                    alt={user?.fullName} 
                />

                <Button
                    variant='ghost'
                    onClick={() => fileInputRef.current?.click()}
                    type='button'
                    className='absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 disabled:opacity-100'
                >
                    <Camera className='h-8 w-8' />
                </Button>

                <Input
                    onChange={handleChangeAvatar}
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    className='hidden'
                />
            </div>

            <div>
                <h1 className='text-lg font-bold'>{user?.fullName}</h1>
                <span className='text-green-800 font-medium'>{user?.major}</span>
                <p className='flex items-center gap-3 text-sm text-muted-foreground'><MapPin className='h-4 w-4'/>{user?.location}</p>
            </div>
        </div>

        {user?.role === 'candidate' && 
            <div className='pt-4 md:pt-0 flex items-center gap-4'>
                <Button onClick={setOpenEdit} size='xl' variant='ghost' className={`border-green-700 text-green-700`}>
                    <Settings /> Chỉnh sửa
                </Button>
                <Button
                    variant='ghost'
                    type='button'
                    size='xl'
                    onClick={() => cvInputRef.current?.click()}
                    className='bg-green-700 text-white'
                >
                    <Upload className='h-5 w-5' />
                    Tải CV lên
                </Button>

                <Input
                    ref={cvInputRef}
                    onChange={handleChangeCv}
                    type='file'
                    accept='.pdf,.doc,.docx'
                    className='hidden'
                />
        </div>
        }
    </div>
  )
}

export default ProfileHeader
