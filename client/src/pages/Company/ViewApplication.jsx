import Loading from '@/components/Loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useApplicationStore } from '@/stores/useApplicationStore'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Mail, Trash, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { transformText } from '@/lib/formatJsonB.js'
import ReviewCandidate from './ReviewCandidate'
import Pagination from '../Admin/Pagination'

const ViewApplication = ({ job, isOpen, onClose }) => {
    const { applicationOfJob, totalPageApplication, getApplicationOfJob, applicationLoading, acceptedApplication, rejectedApplication, deleteApplication } = useApplicationStore()


    const [reviewCandidate, setReviewCandidate] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (isOpen) {
            getApplicationOfJob(job.id, page)
        }
    }, [isOpen, job])

    if (applicationLoading) {
        return <Loading />
    }


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 z-10 bg-black/10 cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <div className="fixed flex inset-0 z-20 items-center justify-center">
                        <motion.div
                            className="bg-white shadow-lg min-w-xl max-h-[85vh] rounded-lg flex flex-col overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <h2 className="text-center text-xl font-medium p-6 pb-0">
                                Ứng viên ứng tuyển: {job?.title}
                            </h2>

                            <div className="overflow-y-auto px-8 py-4 flex-1 space-y-3">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead>
                                        <tr className="border-b bg-gray-50 text-gray-600">
                                            <th className="px-4 py-3 font-medium">Ảnh đại diện</th>
                                            <th className="px-4 py-3 font-medium">Họ tên ứng viên</th>
                                            <th className="px-4 py-3 font-medium">Ngày ứng tuyển</th>
                                            <th className="px-4 py-3 font-medium">Giới thiệu</th>
                                            <th className="px-4 py-3 font-medium">CV</th>
                                            <th className="px-4 py-3 font-medium">Trạng thái</th>
                                            <th className="px-4 py-3 font-medium text-right">Hành động</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {applicationOfJob?.length > 0 ? (
                                            applicationOfJob.map((app) => (
                                                <tr key={app.id} className="border-b hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <img
                                                            className="h-12 w-12 rounded-full object-cover"
                                                            src={`${import.meta.env.VITE_BACKEND_URL}/${app?.candidate?.avatarUrl}`}
                                                            alt={app.candidate?.fullName || 'avatar'}
                                                        />
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <p className="font-medium text-gray-900">{app?.candidate?.fullName}</p>
                                                        <p className="text-sm text-gray-500">{app?.candidate?.user?.email}</p>
                                                        <button type='button' onClick={() => setReviewCandidate(app.candidate)} className={`text-xs text-green-700 cursor-pointer hover:underline`}>
                                                            Xem chi tiết
                                                        </button>

                                                        <ReviewCandidate isOpen={reviewCandidate} onClose={() => setReviewCandidate(null)}/>
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-600">
                                                        {new Date(app?.createdAt).toLocaleDateString('vi-VN')}
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-600 max-w-[300px] truncate">
                                                        {
                                                            app?.introduction ? 
                                                                <Textarea readOnly defaultValue={app?.introduction} className={`max-w-[150px] max-h-[100px]`}/>
                                                            : <p>Không có</p>
                                                        }
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        {app?.applyCVUrl ? (
                                                            <a
                                                                href={`${import.meta.env.VITE_BACKEND_URL}/${app?.applyCVUrl}`}
                                                                target="_blank"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                Xem CV
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-400">Không có</span>
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <Badge variant='ghost'>
                                                            {
                                                                app?.status === 'pending' ? <Badge variant='ghost' className={`bg-amber-100 text-amber-800`}>Đã gửi</Badge> :
                                                                app?.status === 'reviewing' ? <Badge variant='ghost' className="bg-blue-100 text-blue-800">Đã xem</Badge> : 
                                                                app?.status === 'interviewing' ? <Badge variant='ghost' className="bg-purple-100 text-purple-800">Phỏng vấn</Badge> : 
                                                                app?.status === 'accepted' ? <Badge variant='ghost' className="bg-green-100 text-green-800">Chấp nhận</Badge> : 
                                                                app?.status === 'rejected' ? <Badge variant='ghost' className="bg-red-100 text-red-800">Từ chối</Badge> : ''
                                                            }
                                                        </Badge>
                                                    </td>

                                                    <td className="px-4 py-3 text-right space-x-1">
                                                        {
                                                            app?.status === 'accepted' ? 
                                                                <Button onClick={() => deleteApplication(app?.id, job?.id)} title='Xóa' size="sm" variant="ghost" className={`bg-red-100 text-red-800`}>
                                                                    <Trash />
                                                                </Button>
                                                            :
                                                                <Button onClick={() => rejectedApplication(app?.id, job?.id)} title='Từ chối' size="sm" variant="ghost" className={`bg-red-100 text-red-800`}>
                                                                    <X />
                                                                </Button>
                                                        }
                                                        {
                                                            app?.status === 'accepted' ? 
                                                                <Button title='Gửi mail' size="sm" variant="ghost" className={`bg-green-100 text-green-800`}>
                                                                    <a href={`mailto:${app?.candidate?.user?.email}`} target="_blank">
                                                                        <Mail />
                                                                    </a>
                                                                </Button> 
                                                            :
                                                                <Button onClick={() => acceptedApplication(app?.id, job?.id)} title='Chấp nhận' size="sm" variant="ghost" className={`bg-green-100 text-green-800`}>
                                                                    <Check />
                                                                </Button> 
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="text-center text-gray-400 py-8">
                                                    Chưa có ứng viên nào ứng tuyển
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            
                            <div className="flex justify-end gap-3 px-8 py-4 border-t">
                                { applicationOfJob?.length > 0 && <Pagination totalPage={totalPageApplication} currentPage={page} onPageChange={(newPage) => { setPage(newPage); getApplicationOfJob(job.id, newPage) }} /> }
                                <Button onClick={onClose} size="lg" variant="outline" className="px-4">
                                    Đóng
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

export default ViewApplication;
