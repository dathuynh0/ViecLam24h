import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { MapPin } from 'lucide-react'

const ReviewJob = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
        {
            isOpen && 
            <>
                <>
                    <motion.div
                        className="fixed inset-0 z-10 bg-black/10 cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        />
                        <div className="fixed flex inset-0 z-20 items-center justify-center">
                            <motion.div className="bg-white shadow-lg max-w-3xl max-h-[85vh] p-8 rounded-lg overflow-y-auto space-y-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className='text-center text-lg font-bold'>Chi tiết bài đăng: {isOpen?.title}</h1>

                                <div className='border border-gray-300 p-4 shadow-md rounded-lg space-y-4'>
                                    <h2 className='text-lg font-bold border-l-4 border-green-700 pl-2'>Chi tiết công việc</h2>

                                    <div className='flex items-center gap-2'>
                                        <p>Số lượng tuyển: <Badge variant='ghost' className='bg-slate-200 font-bold'>{isOpen?.quantity}</Badge></p>
                                        <p>Hình thức làm viêc: <Badge variant='ghost' className={`bg-green-100 text-green-700 font-bold`}>{isOpen?.workArrangement === 'on_site' ? 'Offline' : isOpen?.workArrangement === 'remote' ? 'Từ xa' : 'Hybrid'}</Badge></p>
                                        <p>Phương thức làm việc: <Badge variant='ghost' className={`bg-blue-100 text-blue-700 font-bold`}>{isOpen?.workType === 'full_time' ? 'Toàn thời gian' : isOpen?.workType === 'part_time' ? 'Bán thời gian' : 'Thực tập sinh'}</Badge></p>
                                    </div>

                                    <div className='flex gap-2'>
                                        <p className='flex-shrink-0'>Yêu cầu:</p>
                                        <ul className='flex flex-wrap items-center gap-2'>
                                            {isOpen?.candidateRequirement.map((requirement) => (
                                                <li key={requirement}>
                                                    <Badge variant='ghost' className={`bg-slate-200 text-slate-900 whitespace-normal`}>{requirement}</Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='space-y-3'>
                                        <h3 className='font-bold border-l-4 border-green-700 pl-2'>Mô tả công việc</h3>
                                        <ul className='space-y-2'>
                                            {isOpen?.description.map((description) => (
                                                <li>
                                                    {description}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='space-y-3'>
                                        <h3 className='font-bold border-l-4 border-green-700 pl-2'>Yêu cầu ứng viên</h3>
                                        <ul className='space-y-2'>
                                            {isOpen?.jobRequirement.map((requirement) => (
                                                <li>
                                                    {requirement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* benefit */}
                                    <div className='space-y-3'>
                                        <h3 className='font-bold border-l-4 border-green-700 pl-2'>Quyền lợi</h3>
                                        <ul className='space-y-2'>
                                            {isOpen?.benefit.map((benefit) => (
                                                <li>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='space-y-3'>
                                        <h3 className='font-bold border-l-4 border-green-700 pl-2'>Địa điểm làm việc</h3>
                                        <p className='flex items-center gap-2'><MapPin className='h-5 w-5'/>{isOpen?.location}</p>

                                        <h3 className='font-bold border-l-4 border-green-700 pl-2'>Thời gian làm việc</h3>
                                        <ul className=''>
                                            {isOpen?.workTime.map((time) => (
                                                <li>
                                                    {time}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className='flex justify-end'>
                                    <Button size='xl' onClick={onClose} variant='outline' className={`cursor-pointer`}>
                                        Thoát
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </>
            </>
        }
    </AnimatePresence>
  )
}

export default ReviewJob
