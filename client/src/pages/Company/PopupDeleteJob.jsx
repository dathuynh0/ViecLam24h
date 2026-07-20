import { Button } from '@/components/ui/button';
import { useJobStore } from '@/stores/useJobStore'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const PopupDeleteJob = ({ isOpen, onClose }) => {
    const { deleteJob } = useJobStore();

    const handleDeleteJob = () => {
        deleteJob(isOpen?.id)
        onClose();
    }

  return (
        <AnimatePresence>
            {
                isOpen &&
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
                            className='bg-white p-8 shadow-lg rounded-lg space-y-4'
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <h1 className='text-lg font-bold'>Bạn có chắc chắn xóa?</h1>
                            <div className='flex items-center justify-center gap-3'>
                                <Button onClick={onClose} size='lg' variant='outline' className={`cursor-pointer`}>
                                    Thoát
                                </Button>
                                <Button onClick={handleDeleteJob} size='lg' variant='ghost' className={`bg-red-700 text-white px-4 py-4 cursor-pointer`}>
                                    Xóa
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            }
        </AnimatePresence>
  )
}

export default PopupDeleteJob
