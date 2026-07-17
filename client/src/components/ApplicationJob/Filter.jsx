import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TabsContent } from '@/components/ui/tabs';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from 'react-router';
import { MapPin } from 'lucide-react';

import { calculateDate } from '@/lib/day';
import { Badge } from '../ui/badge';
import { useApplicationStore } from '@/stores/useApplicationStore';
import Loading from '../Loading';
import { Button } from '../ui/button';

const Filter = ({ onFilterChange, applications }) => {
    const [status, setStatus] = useState('all');
    const { applicationLoading } = useApplicationStore();

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        onFilterChange?.({ status: newStatus });
    };

    if(applicationLoading) {
        return <Loading />
    }
    
  return (
    <Tabs value={status} onValueChange={handleStatusChange}>
        <TabsList variant='line' className={`space-x-4`}>
            <p>Trạng thái</p>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="pending">Tiếp nhận</TabsTrigger>
            <TabsTrigger value="reviewing">Đã xem</TabsTrigger>
            <TabsTrigger value="rejected">Từ chối</TabsTrigger>
            <TabsTrigger value="accepted">Chấp nhận</TabsTrigger>
        </TabsList>

        <TabsContent value={status}>
            <Card className={`p-4`}>
                {
                    applications?.length > 0 ?
                    (
                        <ul className='space-y-2'>
                            {
                                applications?.map((app) => {
                                    const day = calculateDate(app?.createdAt)
                                    return (
                                        <li key={app?.id} className='flex items-center justify-between p-2'>
                                            <div className='flex items-center gap-4'>
                                                <img className='flex h-20 w-20 shrink-0 rounded-lg p-2 shadow-sm object-cover' src={`${import.meta.env.VITE_BACKEND_URL}/${app?.job?.createdBy?.logoUrl}`} alt={app?.job?.createdBy?.companyName} />
                                                <div>
                                                    <CardDescription className='text-lg text-black/80 hover:text-green-800 font-medium'>
                                                        <Link to={`/viec-lam/${app?.job?.slug}`}>
                                                            {app?.job?.title}
                                                        </Link>
                                                    </CardDescription>
                                                    <p>{app?.job?.createdBy?.companyName}</p>
                                                    <p className='flex items-center gap-3 text-sm text-muted-foreground'><MapPin className='h-4 w-4'/> {app?.job?.location}</p>
                                                </div>
                                            </div>

                                            <div className='space-y-2 flex flex-col items-end'>
                                                <p className='tex-sm text-muted-foreground'>{day === 0 ? "Mới đây" : `${day} ngày trước`}</p>
                                                <div>
                                                    <span className='text-muted-foreground'>Trạng thái: </span>
                                                    {
                                                        app?.status === 'pending' ? <Badge variant='ghost' className={`bg-amber-100 text-amber-800`}>Đã gửi</Badge> :
                                                        app?.status === 'reviewing' ? <Badge variant='ghost' className="bg-blue-100 text-blue-800">Đã xem</Badge> : 
                                                        app?.status === 'interviewing' ? <Badge variant='ghost' className="bg-purple-100 text-purple-800">Phỏng vấn</Badge> : 
                                                        app?.status === 'accepted' ? <Badge variant='ghost' className="bg-green-100 text-green-800">Chấp nhận</Badge> : 
                                                        app?.status === 'rejected' ? <Badge variant='ghost' className="bg-red-100 text-red-800">Từ chối</Badge> : ''
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    ) :
                    <div className='flex flex-col items-center justify-center space-y-3'>
                        <h2 className='text-lg'>Bạn chưa ứng tuyển công việc</h2>
                        <p className='text-muted-foreground'>Hãy bắt đầu tìm kiếm công việc phù hợp để kết nối với các nhà tuyển dụng hàng đầu.</p>
                        <Button variant='ghost' className={`text-white bg-green-700`}>
                            <Link to={`/`}>
                                Ứng tuyển ngay
                            </Link>
                        </Button>
                    </div>
                }
            </Card>
        </TabsContent>
    </Tabs>
  )
}

export default Filter
