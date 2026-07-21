import React from 'react'
import { Button } from '../ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import { MapPin } from 'lucide-react'

const ReviewCompany = ({ isOpen, onClose }) => {
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
                                <h1 className='text-center text-lg font-bold'>Chi tiết công ty: {isOpen?.companyName}</h1>

                                <div className='border border-gray-300 p-4 shadow-md rounded-lg space-y-4'>
                                    <h2 className='text-lg font-bold border-l-4 border-green-700 pl-2'>Chi tiết công ty</h2>

                                    <div className='flex items-center gap-2'>
                                        <p>Mã số thuế: <Badge variant='ghost' className='bg-slate-200 font-bold'>{isOpen?.taxCode ? isOpen?.taxCode : 'Chưa cập nhật'}</Badge></p>
                                        <p>Quy mô công ty: <Badge variant='ghost' className={`bg-green-100 text-green-700 font-bold`}>{isOpen?.companySize} nhân viên</Badge></p>
                                        <p>Trạng thái: 
                                            {
                                                isOpen?.status === 'pending' ? <Badge variant='ghost' className={`bg-amber-100 text-amber-700`}>Chưa duyệt</Badge> :
                                                isOpen?.status === 'rejected' ? <Badge variant='ghost' className={`bg-red-100 text-red-700`}>Đã từ chối</Badge> :
                                                isOpen?.status === 'active' ? <Badge variant='ghost' className={`bg-green-100 text-green-700`}>Đã duyệt</Badge> : ''
                                            }
                                        </p>
                                    </div>

                                    {isOpen?.address && (
                                        <div className="flex items-start gap-2 text-sm text-gray-700 pt-1">
                                        <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
                                        <span>{isOpen.address}</span>
                                        </div>
                                    )}

                                    <div className="pt-2 space-y-3">
                                        <p className="text-lg font-bold border-l-4 border-green-700 pl-2">Giới thiệu về công ty</p>
                                        {!isOpen?.description || isOpen.description.length < 1 ? (
                                        <p className="text-sm text-gray-400">Chưa cập nhật thông tin</p>
                                        ) : (
                                        <ul className="flex flex-wrap gap-2">
                                            {isOpen.description.map((d) => (
                                            <li
                                                key={d}
                                                className="text-sm bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-gray-700"
                                            >
                                                {d}
                                            </li>
                                            ))}
                                        </ul>
                                        )}
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

export default ReviewCompany
