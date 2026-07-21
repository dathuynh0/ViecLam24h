import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { useAdminStore } from '@/stores/useAdminStore'
import { Edit, Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import { useSearchParams } from 'react-router';
import CreateCategory from '@/components/ManagerCategory/CreateCategory';

const ManagerCategory = () => {
  const { categories, getAllCategory, totalPageCategory, adminLoading } = useAdminStore();
  
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  

  useEffect(() => {
    getAllCategory(page);
  }, [page])


  const handleChangePage = (newPage) => {
    if (newPage < 1 || newPage > totalPageCategory) return;
    setSearchParams({ page: newPage });
  }
  
  if(adminLoading) {
    return <Loading />
  }

  return (
    <div className='p-4 mx-auto space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>Quản lý danh mục</h1>
        <Button onClick={() => setOpenCreateCategory(true)} variant='ghost' className={`bg-green-700 text-white`}>
          <Plus /> Tạo danh mục mới
        </Button>

        <CreateCategory isOpen={openCreateCategory} onClose={() => setOpenCreateCategory(false)}/>
      </div>
      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className='p-3 border-b'>STT</th>
            <th className='p-3 border-b'>Tên danh mục</th>
            <th className='p-3 border-b'>Đường dẫn</th>
            <th className='p-3 border-b'>Số bài đăng</th>
            <th className='p-3 border-b'>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {
            categories?.length === 0 ?
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  Chưa có danh mục nào được tạo. Hãy nhấn nút tạo ngay.
                </td>
              </tr> 
              :
              (
                categories?.map((c, index) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      {(page - 1) * 8 + index + 1}
                    </td>

                    <td className='p-3 max-w-xs font-bold text-gray-800 line-clamp-1'>
                      {c.title}
                    </td>

                    <td className="p-3 text-muted-foreground">
                      {c.slug}
                    </td>

                    <td className='p-3 font-bold'>
                      {c.jobCount}
                    </td>

                    <td className='p-3'>
                      <div className="flex gap-1">
                        <Button
                          variant='ghost'
                          className="bg-amber-100 text-amber-600 hover:underline text-xs disabled:opacity-50"
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant='ghost'
                          className="bg-red-100 text-red-600 hover:underline text-xs disabled:opacity-50"
                        >
                          <Trash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )
          }
        </tbody>
      </table>
      
      {
        categories.length !== 0 && <Pagination currentPage={page} totalPage={totalPageCategory} onChangePage={handleChangePage}/>
      }
    </div>
  )
}

export default ManagerCategory
