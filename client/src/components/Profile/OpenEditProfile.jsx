import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { format, transformText } from '@/lib/formatJsonB'
import { useCandidateStore } from '@/stores/useCandidateStore'
import Loading from '../Loading'

const OpenEditProfile = ({ user, isOpen, onClose }) => {
  const {
    register,
    handleSubmit
  } = useForm({
    defaultValues: {
        fullName: user?.fullName,
        email: user?.email,
        phone: user?.phone,
        location: user?.location,
        bio: transformText(user?.bio),
        major: user?.major,
        skill: transformText(user?.skill)
    },
  })

  const { updateMyProfile } = useCandidateStore();
  

  const submitHandler = async (data) => {
    const { fullName, bio, skill, phone, location, major } = data;

    updateMyProfile(fullName, format(bio), format(skill), phone, location, major);

    onClose()
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

          {/* Panel */}
          <div className="fixed flex inset-0 z-20 items-center justify-center px-4">
            <motion.div
                className="w-full max-w-xl bg-white shadow-lg max-h-[90vh] sm:max-h-[85vh] rounded-lg flex flex-col overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
            >
                <div className="p-4 md:p-6 pb-0 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Chỉnh sửa thông tin</h2>
                    <Button
                        variant='ghost'
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="space-y-4 p-4 md:p-6 overflow-y-auto"
                >
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Họ và tên</Label>
                            <Input
                                id="fullName"
                                {...register('fullName', { required: 'Vui lòng nhập họ tên' })} 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                disabled
                                {...register('email')} 
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input id="phone" 
                                {...register('phone', {
                                    pattern: {
                                    value: /^[0-9]{9,11}$/,
                                    message: 'Số điện thoại không hợp lệ',
                                    },
                                })} 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="major">Chuyên môn</Label>
                            <Input id="major" 
                                {...register('major')} 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Địa chỉ</Label>
                        <Input id="location" {...register('location')} />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='bio'>Giới thiệu bản thân</Label>
                        <Textarea id="bio" {...register('bio')} placeholder='Giới thiệu bản thân'/>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='skill'>Kỹ năng của bản thân</Label>
                        <Textarea id="skill" {...register('skill')} placeholder='Kỹ năng bản thân. VD: HTML, CSS, ...'/>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 bg-white">
                        <Button size='lg' type="button" variant="outline" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button size='lg' variant='ghost' className={`bg-green-700 text-white px-4`} type="submit">
                            Lưu
                        </Button>
                    </div>
                </form>
            </motion.div>
          </div>
          
        </>
      )}
    </AnimatePresence>
  )
}

export default OpenEditProfile