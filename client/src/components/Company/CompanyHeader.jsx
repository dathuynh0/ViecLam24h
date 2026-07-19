import { EarthIcon, MapPin, Plus, Trash, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { toLocation } from '@/lib/location'
import { Button } from '../ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import Popup from '../Popup'
import { useCompanyStore } from '@/stores/useCompanyStore'
import Loading from '../Loading'

const CompanyHeader = ({ company }) => {
    const location = toLocation(company?.address)
    const [openLoginDialog, setOpenLoginDialog] = useState(false)

    const { accessToken, user } = useAuthStore();
    const { followCompany, follows, unFollow, countFollow, companyLoading } = useCompanyStore();

    const isFollow = follows.some(f => f.candidateId === user?.profileId)

    useEffect(() => {
      countFollow(company?.id);
    }, [])

    const handleFollow = () => {
      if (!accessToken) {
        setOpenLoginDialog(true);
        return;
      }

      followCompany(company?.id);
    }

    const handleUnFollow = () => {
      unFollow(company?.id)
    }

    if(companyLoading) {
      return <Loading />
    }

    

  return (
    <div className='border border-gray-300 p-4 rounded-lg md:flex justify-between items-center space-y-3'>
      <div className='flex items-center gap-4'>
            <img src={`${import.meta.env.VITE_BACKEND_URL}/${company?.logoUrl}`} alt={company?.companyName} className='h-30 w-30 bg-white border border-gray-300 rounded-lg object-contain p-4'/>
        
            <div className='flex flex-col gap-3'>
                <h1 className='text-xl font-bold text-slate-800'>{company?.companyName}</h1>
                <div className='flex items-center flex-wrap gap-4 text-muted-foreground'>
                    <p className='flex items-center gap-2 text-sm'><MapPin className='h-4 w-4'/>{location}</p>
                    <p className='flex items-center gap-2 text-sm'><Users className='h-4 w-4'/>{follows.length} người theo dõi</p>
                    {
                        company?.website &&
                        <a className='flex items-center gap-2 text-sm hover:underline' href={company?.website} target='_blank'>
                            <EarthIcon className='h-4 w-4'/>{company?.website}
                        </a>
                    }
                </div>
            </div>
      </div>

      {
        isFollow ? (
          <Button onClick={handleUnFollow} size='xl' variant='ghost' className={`text-green-700 bg-white border border-green-700 w-full md:w-35`}>
            <Trash /> Bỏ theo dõi
          </Button>
        ) : (
          <Button onClick={handleFollow} size='xl' variant='ghost' className={`text-white bg-green-700 w-full md:w-35`}>
            <Plus /> Theo dõi
          </Button>
        )
      }
      
      <Popup openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog}/>
    </div>
  )
}

export default CompanyHeader
