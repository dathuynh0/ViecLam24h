import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { useAdminStore } from '@/stores/useAdminStore';
import { Check, Edit, Filter, Lock, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import { formatDateForInput } from '@/lib/formatJsonB';
import { Badge } from '@/components/ui/badge';
import Pagination from './Pagination';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { AnimatePresence, motion } from 'framer-motion';

const FIELD_STATUS = [
  { field: 'Tất cả', value: 'all' },
  { field: 'Đang hoạt đông', value: 'active' },
  { field: 'Đang ngưng hoạt động', value: 'inactive' }
]

const ManagerCandidate = () => {
  const { candidates, getAllCandidate, totalPageCandidate, adminLoading, blockLoginCandidate, activeCandidate } = useAdminStore();

  const [openDelete, setOpenDelete] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status') || 'all';

  useEffect(() => {
    getAllCandidate({ page, status });
  }, [page, status])
  

  const handleChangePage = (newPage) => {
    if (newPage < 1 || newPage > totalPageCandidate) return;
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

  if (adminLoading) {
    return <Loading />
  }

  return (
    <div className='p-4 mx-auto space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>Quản lý bài đăng</h1>
        <div className='flex items-center gap-3'>
          <p className='flex items-center gap-2 text-sm'><Filter className='h-5 w-5'/> Bộ lọc trạng thái: </p>
          <NativeSelect value={status} onChange={(e) => handleChangeStatus(e.target.value)}>
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
            <th className='p-3 border-b'>STT</th>
            <th className='p-3 border-b'>Tên người dùng</th>
            <th className='p-3 border-b'>Email</th>
            <th className='p-3 border-b'>CV</th>
            <th className='p-3 border-b'>Ngày tham gia</th>
            <th className='p-3 border-b'>Trạng thái</th>
            <th className='p-3 border-b'>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {
            candidates?.length === 0 ?
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  Chưa có bất kỳ người dùng nào tồn tại.
                </td>
              </tr> 
              :
              (
                candidates?.map((c, index) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      {(page - 1) * 8 + index + 1}
                    </td>

                    <td className='p-3 max-w-xs font-bold text-gray-800 line-clamp-1'>
                      {c?.fullName}
                    </td>

                    <td className="p-3 text-muted-foreground">
                      {c?.user?.email}
                    </td>

                    <td className='p-3 text-muted-foreground'>
                      {
                        c?.cvUrl ? 
                        <a href={`${import.meta.env.VITE_BACKEND_URL}/${c?.cvUrl}`} target='_blank'>
                          Xem CV
                        </a> :
                        <p>Chưa cập nhật CV</p>
                      }
                    </td>

                    <td className='p-3'>
                      {formatDateForInput(c?.createdAt)}
                    </td>

                    <td className='p-3'>
                      {
                        c?.user?.status === 'active' ? <Badge variant='ghost' className={`bg-green-100 text-green-700`}>Hoạt động</Badge> : <Badge variant='ghost' className={`bg-red-100 text-red-700`}>Khóa</Badge>
                      }
                    </td>

                    <td className='p-3'>
                      {
                        c?.user?.status === 'active' ?
                          <div className="flex gap-1">
                            <Button
                              onClick={() => blockLoginCandidate(c?.id)}
                              title='Khóa'
                              variant='ghost'
                              className="bg-amber-100 text-amber-700 hover:underline text-xs disabled:opacity-50"
                            >
                              <Lock />
                            </Button>
                            <Button
                              onClick={() => setOpenDelete(c?.id)}
                              title='Xóa'
                              variant='ghost'
                              className="bg-red-100 text-red-700 hover:underline text-xs disabled:opacity-50"
                            >
                              <Trash />
                            </Button>
                          </div> 
                        :
                          <div className="flex gap-1">
                            <Button
                              onClick={() => activeCandidate(c?.id)}
                              title='Mở khóa'
                              variant='ghost'
                              className="bg-blue-100 text-blue-700 hover:underline text-xs disabled:opacity-50"
                            >
                              <Check />
                            </Button>
                            <Button
                              onClick={() => setOpenDelete(c?.id)}
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

      { candidates.length !== 0 && <Pagination currentPage={page} totalPage={totalPageCandidate} onChangePage={handleChangePage}/>}

      <PopupDeleteJob open={openDelete} onClose={() => setOpenDelete(null)}/>
    </div>
  )
}

const PopupDeleteJob = ({ open, onClose }) => {
  const { deleteCandidate } = useAdminStore();

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
                <h1>Bạn có chắn chắn muốn xóa tài khoản người dùng?</h1>
                <div className='flex items-center justify-end gap-3'>
                  <Button className={`cursor-pointer`} size='xl' variant='outline' onClick={onClose}>
                    Thoát
                  </Button>
                  <Button onClick={() => {
                    deleteCandidate(open)
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

export default ManagerCandidate
