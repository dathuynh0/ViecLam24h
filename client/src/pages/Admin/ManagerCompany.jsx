import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { useAdminStore } from '@/stores/useAdminStore';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import Pagination from './Pagination';
import { Check, Eye, Filter, Lock, LockKeyholeOpen, Trash, X } from 'lucide-react';
import Loading from '@/components/Loading';
import { formatDateForInput } from '@/lib/formatJsonB';
import ReviewCompany from '@/components/ManagerCompany/ReviewCompany';
import { AnimatePresence, motion } from 'framer-motion';

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

const ManagerCompany = () => {
  const { getAllCompany, companies, totalPageCompany, adminLoading, rejectCompany, activeCompany, blockLoginCompany } = useAdminStore();


  const [openViewCompany, setOpenViewCompany] = useState(null);
  const [openDeleteCompany, setOpenDeleteCompany] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status') || 'all';

  useEffect(() => {
    getAllCompany({ page, status });
  }, [page, status])
  

  const handleChangePage = (newPage) => {
    if (newPage < 1 || newPage > totalPageCompany) return;
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
            <th className='p-3 border-b'>Tên công ty</th>
            <th className='p-3 border-b'>Lĩnh vực hoạt động</th>
            <th className='p-3 border-b'>Mã số thuế</th>
            <th className='p-3 border-b'>Website</th>
            <th className='p-3 border-b'>Ngày tham gia</th>
            <th className='p-3 border-b'>Trạng thái</th>
            <th className='p-3 border-b'>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {
            companies?.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  Chưa có công ty nào.
                </td>
              </tr>
            ) :
            (
             companies?.map((c, index) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {(page - 1) * 8 + index + 1}
                </td>


                <td className='p-3'>
                  {c?.companyName}
                </td>

                <td className='p-3'>
                  <Badge variant='ghost' className={`bg-blue-100 text-blue-700`}>{c?.field}</Badge>
                </td>

                <td className='p-3 text-muted-foreground font-bold'>
                  {c?.taxCode ? c?.taxCode : 'Chưa cập nhật' }
                </td>

                <td className='p-3'>
                  {
                    c?.website ? <a href={c?.website} target='_blank' className='hover:underline'>{c?.website}</a> : 'Chưa cập nhật'
                  }
                </td>

                <td className='p-3'>
                  {formatDateForInput(c?.createdAt)}
                </td>

                <td className='p-3'>
                  {
                    c?.status === 'pending' ? <Badge variant='ghost' className={`bg-amber-100 text-amber-700`}>Chưa duyệt</Badge> :
                    c?.status === 'rejected' ? <Badge variant='ghost' className={`bg-red-100 text-red-700`}>Đã từ chối</Badge> :
                    c?.status === 'inactive' ? <Badge variant='ghost' className={`bg-red-100 text-red-700`}>Đã khóa</Badge> :
                    c?.status === 'active' ? <Badge variant='ghost' className={`bg-green-100 text-green-700`}>Đã duyệt</Badge> : ''
                  }
                </td>
                  
                <td className='p-3'>
                  <div className='flex items-center gap-2'>
                    <Button
                      onClick={() => setOpenViewCompany(c)}
                      title='Xem chi tiết'
                      variant='ghost'
                      className="bg-blue-100 text-blue-700 hover:underline text-xs disabled:opacity-50">
                      <Eye />
                    </Button>

                    {c?.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => rejectCompany(c?.id, { page, status })}
                          title='Từ chối duyệt'
                          variant='ghost'
                          className="bg-red-100 text-red-700 hover:underline text-xs disabled:opacity-50">
                          <X />
                        </Button>
                        <Button
                          onClick={() => activeCompany(c?.id, { page, status })}
                          title='Duyệt'
                          variant='ghost'
                          className="bg-green-100 text-green-700 hover:underline text-xs disabled:opacity-50">
                          <Check />
                        </Button>
                      </>
                    )}

                    {(c?.status === 'rejected' || c?.status === 'inactive') && (
                      <Button
                        onClick={() => activeCompany(c?.id, { page, status })}
                        title='Mở khóa tài khoản'
                        variant='ghost'
                        className="bg-amber-100 text-amber-700 hover:underline text-xs disabled:opacity-50">
                        <LockKeyholeOpen />
                      </Button>
                    )}

                    {c?.status === 'active' && (
                      <Button
                        onClick={() => blockLoginCompany(c?.id, { page, status })}
                        title='Khóa tài khoản'
                        variant='ghost'
                        className="bg-amber-100 text-amber-700 hover:underline text-xs disabled:opacity-50">
                        <Lock />
                      </Button>
                    )}

                    {c?.status !== 'pending' && (
                      <Button
                        onClick={() => setOpenDeleteCompany(c?.id)}
                        title='Xóa tài khoản'
                        variant='ghost'
                        className="bg-red-100 text-red-700 hover:underline text-xs disabled:opacity-50">
                        <Trash />
                      </Button>
                    )}
                  </div>
                </td>
                
              </tr>
             ))
            )
          }
        </tbody>
      </table>

      { companies?.length !== 0 && <Pagination currentPage={page} totalPage={totalPageCompany} onChangePage={handleChangePage}/> }

      <ReviewCompany isOpen={openViewCompany} onClose={() => setOpenViewCompany(null)}/>
      <PopupDeleteJob open={openDeleteCompany} onClose={() => setOpenDeleteCompany(null)}/>
    </div>
  )
}

const PopupDeleteJob = ({ open, onClose }) => {
  const { deleteCompany } = useAdminStore();

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
                <h1>Bạn có chắn chắn muốn xóa tài khoản công ty?</h1>
                <div className='flex items-center justify-end gap-3'>
                  <Button className={`cursor-pointer`} size='xl' variant='outline' onClick={onClose}>
                    Thoát
                  </Button>
                  <Button onClick={() => {
                    deleteCompany(open)
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

export default ManagerCompany
