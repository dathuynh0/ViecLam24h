import Loading from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useJobStore } from '@/stores/useJobStore'
import { Edit, Eye, ToggleLeft, ToggleRight, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import EditJob from './EditJob';
import { useCategoryStore } from '@/stores/useCategoryStore';
import ViewApplication from './ViewApplication';
import PopupDeleteJob from './PopupDeleteJob';
import { useSearchParams } from 'react-router';
import Pagination from '../Admin/Pagination';


const formatSalary = (min, max) => {
  const fmt = (n) => (n / 1000000);
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
};


const ManagerJob = () => {
    const { jobCreated, totalPageJob, getJobCreated, jobLoading, toggleJobStatus } = useJobStore();
    const { categories, getAllCategory } = useCategoryStore();

    const [openEdit, setOpenEdit] = useState(null);
    const [openView, setOpenView] = useState(null);
    const [openDelete, setOpenDelete] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1

    useEffect(() => {
        getJobCreated(page);
        getAllCategory();
    },  [page])


    if (jobLoading) {
        return <Loading />
    }
    
    const handleChangePage = (newPage) => {
      setSearchParams({ page: newPage })
    }
    
    const handleToggleStatus = async (jobId, page) => {
      await toggleJobStatus(jobId, page);
    }

  return (
    <div className="p-4 mx-auto space-y-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="p-3 border-b">#</th>
            <th className="p-3 border-b">Tiêu đề</th>
            <th className="p-3 border-b">Mức lương</th>
            <th className="p-3 border-b">Số lượng tuyển</th>
            <th className="p-3 border-b">Hình thức</th>
            <th className="p-3 border-b">Trạng thái</th>
            <th className="p-3 border-b">Đơn ứng tuyển</th>
            <th className="p-3 border-b">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {jobCreated?.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-6 text-center text-gray-400">
                Chưa có bài đăng nào.
              </td>
            </tr>
          ) : (
            jobCreated?.map((job, index) => {
              return (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 max-w-xs">
                    <p className="font-bold text-gray-800 line-clamp-1">{job.title}</p>
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {formatSalary(job.salaryMin, job.salaryMax)} triệu
                  </td>

                  <td className="p-3">{job.quantity}</td>

                  <td className="p-3">
                    <Badge variant='ghost' className={`bg-slate-200 text-slate-800`}>
                        {
                            job?.workArrangement === 'on_site' ? 'Tại văn phòng' :
                            job?.workArrangement === 'remote' ? 'Làm từ xa' : 'Hybrid'
                        }
                    </Badge>
                  </td>

                  <td className="p-3">
                    {
                        job?.status === 'pending' ? <Badge variant='ghost' className={`text-amber-800 bg-amber-200`}>Chờ duyệt</Badge> :
                        job?.status === 'rejected' ? <Badge variant='ghost' className={`text-red-800 bg-red-200`}>Từ chối</Badge> :
                        job?.status === 'active' ? <Badge variant='ghost' className={`text-green-800 bg-green-200`}>Đã duyệt</Badge> : ''
                        
                    }
                  </td>

                  <td className="p-3">
                    <Badge variant='ghost' className={`bg-blue-200 text-blue-800`}>
                        {job?.applications?.length || 0} đơn ứng tuyển
                    </Badge>
                  </td>

                  <td className="p-3">
                    <div className="flex gap-1">
                      {
                        job?.status === 'active' ? 
                          <Button onClick={() => handleToggleStatus(job?.id, page)} variant='ghost' className={`bg-green-200 text-green-800`} title='Ẩn bài đăng'><ToggleRight /></Button> 
                        : 
                          <Button onClick={() => handleToggleStatus(job?.id, page)} variant='ghost' className={`bg-gray-200 text-gray-800`} title='Hiện bài đăng'><ToggleLeft /></Button>
                      }
                        <Button
                          onClick={() => setOpenView(job)}
                            variant='ghost'
                            className="bg-blue-100 text-blue-600 hover:underline text-xs"
                        >
                            <Eye />
                        </Button>

                        <ViewApplication isOpen={openView} onClose={() => setOpenView(null)} job={openView}/>

                        <Button
                            onClick={() => setOpenEdit(job)}
                            variant='ghost'
                            className="bg-amber-100 text-amber-600 hover:underline text-xs disabled:opacity-50"
                        >
                            <Edit />
                        </Button>

                        <EditJob isOpen={openEdit} onClose={() => setOpenEdit(null)} job={openEdit} categories={categories}/>

                        <Button
                            onClick={() => setOpenDelete(job)}
                            variant='ghost'
                            className="bg-red-100 text-red-600 hover:underline text-xs disabled:opacity-50"
                        >
                            <Trash />
                        </Button>

                        <PopupDeleteJob isOpen={openDelete} onClose={() => setOpenDelete(null)}/>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {
        jobCreated.length !== 0 && <Pagination currentPage={page} totalPage={totalPageJob} onChangePage={handleChangePage}/>
      }
    </div>
  )
}

export default ManagerJob
