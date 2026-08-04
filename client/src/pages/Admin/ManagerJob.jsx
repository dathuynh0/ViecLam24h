import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { useAdminStore } from '@/stores/useAdminStore'
import { Check, Eye, Filter, Trash, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import { formatDateForInput } from '@/lib/formatJsonB'
import Pagination from './Pagination';
import Loading from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ReviewJob from '@/components/ManagerJob/ReviewJob';
import { AnimatePresence, motion } from 'framer-motion';
import ViewApplicationByJob from '@/components/ManagerJob/ViewApplicationByJob';

const FIELD_STATUS = [
  {
    field: 'Tất cả', value: 'all'
  },
  {
    field: 'Đang chờ duyệt', value: 'pending'
  },
  {
    field: 'Đã từ chối', value: 'rejected'
  },
  {
    field: 'Đã duyệt', value: 'active'
  }
]

const ManagerJob = () => {
  const { jobs, totalPageJob, getAllJob, rejectJob, activeJob } = useAdminStore();

  const [openReview, setOpenReview] = useState(null);
  const [openDeleteJob, setOpenDeleteJob] = useState(null);
  const [openViewApplication, setOpenViewApplication] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status') || 'all';

  useEffect(() => {
    getAllJob({ page, status });
  }, [page, status])
  

  const handleChangePage = (newPage) => {
    if (newPage < 1 || newPage > totalPageJob) return;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', newPage);
      return params;
    });
  }

  const handleChangeStatus = (newStatus) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('status', newStatus);
      params.set('page', 1);
      return params;
    });
  };

  

  return (
    <div className='p-4 mx-auto space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>Quản lý bài đăng</h1>
        <div className='flex items-center gap-3'>
          <p className='flex items-center gap-2 text-sm'><Filter className='h-5 w-5'/> Bộ lọc trạng thái: </p>
          <NativeSelect onChange={(e) => handleChangeStatus(e.target.value)}>
            {
              FIELD_STATUS.map(f => 
                <NativeSelectOption key={f.value} value={f.value}>{f.field}</NativeSelectOption>
              )
            }
          </NativeSelect>
        </div>
      </div>
      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className='p-3 border-b'>#</th>
            <th className='p-3 border-b'>Tên công việc</th>
            <th className='p-3 border-b'>Được tạo bởi</th>
            <th className='p-3 border-b'>Ngày tạo</th>
            <th className='p-3 border-b'>Xem ứng viên</th>
            <th className='p-3 border-b'>Trạng thái</th>
            <th className='p-3 border-b'>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {
            jobs?.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  Chưa có bài đăng nào.
                </td>
              </tr>
            ) :
            (
             jobs?.map((j, index) => (
              <tr key={j.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {(page - 1) * 8 + index + 1}
                </td>

                <td className='p-3 max-w-xs font-bold text-gray-800'>
                  {j?.title}
                </td>

                <td className='p-3'>
                  {j?.createdBy?.companyName}
                </td>

                <td className='p-3'>
                  {formatDateForInput(j?.createdAt)}
                </td>

                <td className='p-3'>
                  <Button className={`text-muted-foreground hover:underline`} variant='ghost' onClick={() => setOpenViewApplication(j)}>
                    Xem ứng viên
                  </Button>
                </td>

                <td>
                  {
                    j?.status === 'pending' ? <Badge variant='ghost' className={`bg-amber-100 text-amber-700`}>Chưa duyệt</Badge> :
                    j?.status === 'rejected' ? <Badge variant='ghost' className={`bg-red-100 text-red-700`}>Đã từ chối</Badge> :
                    j?.status === 'active' ? <Badge variant='ghost' className={`bg-green-100 text-green-700`}>Đã duyệt</Badge> : ''
                  }
                </td>

                <td className='p-3'>
                  {
                    j?.status === 'pending' ?
                    <div className="flex gap-1">
                      <Button
                        onClick={() => setOpenReview(j)}
                        title='Xem chi tiết'
                        variant='ghost'
                        className="bg-blue-100 text-blue-700 hover:underline text-xs disabled:opacity-50"
                      >
                        <Eye />
                      </Button>
                      <Button
                        onClick={() => rejectJob(j?.id)}
                        title='Từ chối duyệt'
                        variant='ghost'
                        className="bg-red-100 text-red-700 hover:underline text-xs disabled:opacity-50"
                      >
                        <X />
                      </Button>
                      <Button
                        onClick={() => activeJob(j?.id)}
                        title='Duyệt'
                        variant='ghost'
                        className="bg-green-100 text-green-700 hover:underline text-xs disabled:opacity-50"
                      >
                        <Check />
                      </Button>
                    </div> 
                    : 
                    <div className="flex gap-1">
                      <Button
                        onClick={() => setOpenReview(j)}
                        title='Xem chi tiết'
                        variant='ghost'
                        className="bg-blue-100 text-blue-700 hover:underline text-xs disabled:opacity-50"
                      >
                        <Eye />
                      </Button>
                      <Button
                        onClick={() => setOpenDeleteJob(j?.id)}
                        title='Xóa'
                        variant='ghost'
                        className="bg-red-100 text-red-700 hover:underline text-xs disabled:opacity-50"
                      >
                        <Trash />
                      </Button>
                    </div>
                  }
                </td>
              </tr>
             ))
            )
          }
        </tbody>
      </table>
      
      {
        jobs?.length !== 0 && <Pagination currentPage={page} totalPage={totalPageJob} onChangePage={handleChangePage}/>
      }

      <ReviewJob isOpen={openReview} onClose={() => setOpenReview(null)}/>
      <PopupDeleteJob open={openDeleteJob} onClose={() => setOpenDeleteJob(null)}/>
      <ViewApplicationByJob isOpen={openViewApplication} onClose={() => setOpenViewApplication(null)}/>
    </div>
  )
}

const PopupDeleteJob = ({ open, onClose }) => {
  const { deleteJob } = useAdminStore();

  return (
    <AnimatePresence>
      {
        open && (
          <>
            <motion.div
            className="fixed inset-0 z-10 bg-black/10 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            />

            <div className='fixed flex inset-0 z-20 items-center justify-center'>
              <motion.div className=" bg-white shadow-lg max-w-3xl max-h-[85vh] p-8 rounded-lg overflow-y-auto space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1>Bạn có chắn chắn muốn xóa bài tuyển dụng?</h1>
                <div className='flex items-center justify-end gap-3'>
                  <Button className={`cursor-pointer`} size='xl' variant='outline' onClick={onClose}>
                    Thoát
                  </Button>
                  <Button onClick={() => {
                    deleteJob(open)
                    onClose();
                  }} size='xl' variant='ghost' className={`text-white bg-green-700`}>
                    Xóa
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

export default ManagerJob
