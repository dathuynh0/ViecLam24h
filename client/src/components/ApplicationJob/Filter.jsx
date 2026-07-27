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
        <TabsList
            variant="line"
            className="flex w-full overflow-x-auto gap-4 sm:gap-6 no-scrollbar"
        >
            <TabsTrigger value="all" className="shrink-0">Tất cả</TabsTrigger>
            <TabsTrigger value="pending" className="shrink-0">Tiếp nhận</TabsTrigger>
            <TabsTrigger value="rejected" className="shrink-0">Từ chối</TabsTrigger>
            <TabsTrigger value="accepted" className="shrink-0">Chấp nhận</TabsTrigger>
        </TabsList>

        <TabsContent value={status}>
            <Card className="p-3 sm:p-4">
            {applications?.length > 0 ? (
                <ul className="space-y-2">
                {applications?.map((app) => {
                    const day = calculateDate(app?.createdAt);
                    return (
                    <li
                        key={app?.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-2 border-b last:border-0 sm:border-0"
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            <img
                                className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg p-2 shadow-sm object-cover"
                                src={`${import.meta.env.VITE_BACKEND_URL}/${app?.job?.createdBy?.logoUrl}`}
                                alt={app?.job?.createdBy?.companyName}
                            />
                            <div className="min-w-0">
                                <CardDescription className="text-base sm:text-lg text-black/80 hover:text-green-800 font-medium">
                                <Link to={`/viec-lam/${app?.job?.slug}`} className="line-clamp-1">
                                    {app?.job?.title}
                                </Link>
                                </CardDescription>
                                <p className="truncate">{app?.job?.createdBy?.companyName}</p>
                                <p className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 shrink-0" /> {app?.job?.location}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pl-[80px] sm:pl-0">
                            <div className="order-2 sm:order-1">
                                <span className="text-muted-foreground text-sm">Trạng thái: </span>
                                {app?.status === 'pending' ? (
                                <Badge variant="ghost" className="bg-amber-100 text-amber-800">Đã gửi</Badge>
                                ) : app?.status === 'reviewing' ? (
                                <Badge variant="ghost" className="bg-blue-100 text-blue-800">Đã xem</Badge>
                                ) : app?.status === 'interviewing' ? (
                                <Badge variant="ghost" className="bg-purple-100 text-purple-800">Phỏng vấn</Badge>
                                ) : app?.status === 'accepted' ? (
                                <Badge variant="ghost" className="bg-green-100 text-green-800">Chấp nhận</Badge>
                                ) : app?.status === 'rejected' ? (
                                <Badge variant="ghost" className="bg-red-100 text-red-800">Từ chối</Badge>
                                ) : ''}
                            </div>
                            <p className="text-sm text-muted-foreground order-1 sm:order-2 whitespace-nowrap">
                                {day === 0 ? 'Mới đây' : `${day} ngày trước`}
                            </p>
                        </div>
                    </li>
                    );
                })}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-3 py-8 px-4 text-center">
                    <h2 className="text-lg">Bạn chưa ứng tuyển công việc</h2>
                    <p className="text-muted-foreground">
                        Hãy bắt đầu tìm kiếm công việc phù hợp để kết nối với các nhà tuyển dụng hàng đầu.
                    </p>
                    <Button variant="ghost" className="text-white bg-green-700">
                        <Link to="/">Ứng tuyển ngay</Link>
                    </Button>
                </div>
            )}
            </Card>
        </TabsContent>
    </Tabs>
  )
}

export default Filter
