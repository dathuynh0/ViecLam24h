import { List, MapPin, Trash, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useCandidateStore } from '@/stores/useCandidateStore'
import { Link } from 'react-router'
import { Badge } from '../ui/badge'
import { calculateDate } from '@/lib/day'
import Loading from '../Loading'

const Content = ({ user }) => {
    const { jobSaves, getAllJobSave, deleteJobSave, candidateLoading } = useCandidateStore();

    useEffect(() => {
        getAllJobSave();
    }, [])

    if(candidateLoading) {
        return <Loading />
    }

  return (
    <div className='border border-gray-300 rounded-lg bg-white shadow-lg px-4 py-6'>
        <h2 className='flex items-center gap-3 text-lg font-bold pb-4'>
            <Button variant='ghost' className={`h-5 w-5 bg-green-100 p-5`}>
                <User /> 
            </Button> Giới thiệu bản thân
        </h2>
        {
            user?.bio ? 
            <ul className='space-y-4'>
                {user?.bio.map((bio) => (
                    <li key={bio}>
                        - {bio}
                    </li>
                ))}
            </ul> : 
            <p className='text-center'>Bạn chưa cập nhập thông tin cá nhân</p>
        }

        <h2 className='flex items-center gap-3 text-lg font-bold py-4'>
            <Button variant='ghost' className={`h-5 w-5 bg-green-100 p-5`}>
                <List /> 
            </Button>
            Việc làm đã lưu
        </h2>

        {
            jobSaves ? (
                <ul className='space-y-2'>
                    {jobSaves?.map((job) => {
                        const day = calculateDate(job?.savedAt);

                        return (
                            <li key={job?.id} className='flex items-center justify-between border border-gray-300 p-4 rounded-lg'>
                                <div className=''>
                                    <Link className='text-lg hover:underline text-green-700' to={`/viec-lam/${job?.job.slug}`}>
                                        {job?.job?.title}
                                    </Link>
                                    
                                    <div className='flex items-center gap-3 pt-1'>
                                        <p className='flex items-center text-sm gap-2 text-muted-foreground'><MapPin className='h-4 w-4'/> {job?.job.location}</p>
                                        <Badge variant='ghost' className={`text-slate-800 bg-slate-200`}>{job?.job.salaryMin} - {job?.job.salaryMax}đ</Badge>
                                    </div>
                                </div>

                                <div className='flex flex-col items-end space-y-2'>
                                    <p className='text-sm text-muted-foreground'>Đã lưu: {day} ngày trước</p>
                                    <Button onClick={() => deleteJobSave(job?.id)} variant='ghost' className={`bg-red-100 text-red-800`}>
                                        <Trash /> Xóa
                                    </Button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            ) : <p>Bạn chưa có lưu công việc nào</p>
        }
    </div>
  )
}

export default Content
