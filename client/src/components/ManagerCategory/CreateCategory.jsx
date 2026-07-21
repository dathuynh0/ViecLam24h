import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { useAdminStore } from '@/stores/useAdminStore'

const CreateCategory = ({ isOpen, onClose }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: ''
        }
    });

    const { createCategory } = useAdminStore();

    const handleCreate = (data) => {
        createCategory(data.title)
        onClose();
    }

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
                    <div className="fixed flex inset-0 z-20 items-center justify-center">
                        <motion.div className="bg-white shadow-lg max-w-3xl max-h-[85vh] p-8 rounded-lg overflow-y-auto space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            <h1 className='text-center text-lg font-bold'>Tạo danh mục việc làm</h1>
                            <form onSubmit={handleSubmit(handleCreate)}>
                                <div className='space-y-2'>
                                    <Label htmlFor='title'>Tên danh mục việc làm</Label>
                                    <Input {...register('title')} type={`text`} id='title' placeholder='VD: Việc làm Công nghệ thông tin' className={`min-w-xs`}/>
                                </div>

                                <div className="flex justify-end gap-3 py-4">
                                    <Button onClick={onClose} size='lg' type="button" variant="outline" className={`px-4 cursor-pointer`}>
                                        Hủy
                                    </Button>
                                    <Button size='lg' type="submit" variant='ghost' className={`bg-green-700 text-white px-4`}>
                                        Tạo danh mục
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )
        }
    </AnimatePresence>
  )
}

export default CreateCategory
