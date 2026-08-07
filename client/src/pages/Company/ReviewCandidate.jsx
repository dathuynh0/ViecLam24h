import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, X } from 'lucide-react'
import React from 'react'

const ReviewCandidate = ({ isOpen, onClose }) => {

  return (
    <AnimatePresence>
        {
            isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 z-10 bg-black/10 cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <div className="fixed flex inset-0 z-20 items-center justify-center px-4">
                        <motion.div
                            className="bg-white shadow-lg w-full max-w-xl max-h-[85vh] rounded-lg flex flex-col overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Thông tin ứng viên
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body - scrollable */}
                            <div className="px-6 py-4 overflow-y-auto flex-1 space-y-5">
                                {/* Avatar + tên + email */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_URL}/${isOpen?.avatarUrl}`}
                                        alt={isOpen?.fullName}
                                        className="w-16 h-16 rounded-full object-cover border border-gray-200"
                                    />
                                    <div>
                                        <p className="text-base font-medium text-gray-800">
                                            {isOpen?.fullName || "Chưa cập nhật"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {isOpen?.user?.email}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>{isOpen?.major}</p>
                                    </div>
                                </div>

                                {/* Thông tin cơ bản */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-400">Số điện thoại:</p>
                                        <p className="text-gray-700 font-medium">
                                            {isOpen?.phone || "—"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Địa chỉ:</p>
                                        <p className="text-gray-700 font-medium">
                                            {isOpen?.location || "—"}
                                        </p>
                                    </div>
                                </div>

                                {/* Giới thiệu bản thân */}
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Giới thiệu</p>
                                    {isOpen?.bio ? (
                                        <ul>
                                            {
                                                isOpen.bio.map((b, index) => (
                                                    <li key={index} className="text-gray-700 text-sm mb-1">
                                                        {b}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ) : (
                                        <p className="text-gray-400 text-sm italic">Không có</p>
                                    )}
                                </div>

                                {/* Kỹ năng */}
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">Kỹ năng</p>
                                    <div className="flex flex-wrap gap-2">
                                        {isOpen?.skill?.length ? (
                                            isOpen.skill.map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant='ghost'
                                                    className="bg-green-100 text-green-700"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">Chưa cập nhật</p>
                                        )}
                                    </div>
                                </div>

                                {/* CV đính kèm */}
                                {isOpen?.cvUrl && (
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">CV đính kèm</p>
                                        <a
                                            href={`${import.meta.env.VITE_BACKEND_URL}/${isOpen.cvUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
                                        >
                                            <FileText size={16} />
                                            Xem CV
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
                                <Button
                                    variant='outline'
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                    Đóng
                                </Button>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    <a href={`mailto:${isOpen?.user?.email}`}>
                                        Liên hệ ứng viên
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )
        }
    </AnimatePresence>
  )
}

export default ReviewCandidate
