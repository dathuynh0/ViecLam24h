import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { format, transformText, formatDateForInput } from "@/lib/formatJsonB";
import { useJobStore } from "@/stores/useJobStore";
import { toast } from "sonner";



const EditJob = ({ job, isOpen, onClose, categories}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      
    }
  })

  const { updateJob } = useJobStore();

  const handleEditJob = (data) => {
    const {
      categoryId,
      title,
      jobRequirement,
      description,
      candidateRequirement,
      benefit,
      salaryMin,
      salaryMax,
      location,
      workTime,
      workType,
      workArrangement,
      quantity,
      expiredAt
    } = data;

    if (
      !categoryId ||
      !title ||
      !jobRequirement ||
      !description ||
      !candidateRequirement ||
      !benefit ||
      !salaryMin ||
      !salaryMax ||
      !location ||
      !workTime ||
      !workType ||
      !workArrangement ||
      !quantity ||
      !expiredAt ) {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return;
      }

    updateJob(job?.id, 
      categoryId,
      title,
      format(jobRequirement),
      format(description),
      format(candidateRequirement),
      format(benefit),
      salaryMin,
      salaryMax,
      location,
      format(workTime),
      workType,
      workArrangement,
      quantity,
      expiredAt )

      onClose();
  }

  useEffect(() => {
    if(job) {
      reset({
        categoryId: job?.categoryId,
        title: job?.title,
        jobRequirement: transformText(job?.jobRequirement),
        description: transformText(job?.description),
        candidateRequirement: transformText(job?.candidateRequirement),
        benefit: transformText(job?.benefit),
        salaryMin: job?.salaryMin,
        salaryMax: job?.salaryMax,
        location: job?.location,
        workTime: transformText(job?.workTime),
        workType: job?.workType || 'full_time',
        workArrangement: job?.workArrangement || 'on_site',
        quantity: job?.quantity || 1,
        expiredAt: formatDateForInput(job?.expiredAt)
      })
    }
  }, [job, reset])
  
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
    

            <div className="fixed flex inset-0 z-20 items-center justify-center">
              <motion.div
                className="bg-white shadow-lg max-w-3xl max-h-[85vh] p-8 rounded-lg overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-center text-xl font-medium">{job?.title}</h2>
                <form onSubmit={handleSubmit(handleEditJob)} className="space-y-5">
                  {/* Tiêu đề */}
                  <div className="space-y-2">
                      <Label htmlFor="title">Tiêu đề công việc</Label>
                      <Input
                          {...register('title')}
                          id="title"
                          name="title"
                          placeholder="Ví dụ: Tuyển Frontend Developer (ReactJS)"
                      />
                  </div>

                  <div className='flex items-center gap-4'>
                      <div className='space-y-2'>
                          <Label htmlFor='category'>
                              Danh mục việc làm
                          </Label>
                          <NativeSelect id='category' {...register('categoryId')}>
                              {
                                  categories?.map((c) => (
                                      <NativeSelectOption key={c?.id} value={c?.id}>{c?.title}</NativeSelectOption>
                                  ))
                              }
                              {/* <NativeSelectOption value="#">Danh mục</NativeSelectOption> */}
                          </NativeSelect>
                      </div>

                      <div className="space-y-2">
                          <Label htmlFor="quantity" >Số lượng cần tuyển</Label>
                          <Input
                              {...register('quantity')}
                              id="quantity"
                              name="quantity"
                              placeholder="Ví dụ: 2"
                          />
                      </div>

                      <div className='space-y-2'>
                          <Label htmlFor='workArrangement'>
                              Hình thức làm việc
                          </Label>
                          <NativeSelect id='workArrangement' {...register('workArrangement')}>
                              <NativeSelectOption value="on_site">Tại văn phòng</NativeSelectOption>
                              <NativeSelectOption value="remote">Làm từ xa</NativeSelectOption>
                              <NativeSelectOption value="hybrid">Hybrid</NativeSelectOption>
                          </NativeSelect>
                      </div>

                      <div className='space-y-2'>
                          <Label htmlFor='workType'>
                              Loại hình
                          </Label>
                          <NativeSelect id='workType' {...register('workType')}>
                              <NativeSelectOption value="full_time">Toàn thời gian</NativeSelectOption>
                              <NativeSelectOption value="part_time">Bán thời gian</NativeSelectOption>
                              <NativeSelectOption value="internship">Thực tập</NativeSelectOption>
                          </NativeSelect>
                      </div>
                  </div>


                  {/* Mô tả */}
                  <div className="space-y-2">
                      <Label htmlFor="description">Mô tả công việc</Label>
                      <Textarea
                          {...register('description')}
                          id="description"
                          name="description"
                          placeholder="Mô tả chi tiết công việc"
                          className="min-h-[180px]"
                      />
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="jobRequirement">Yêu cầu công việc</Label>
                      <Textarea
                          {...register('jobRequirement')}
                          id="jobRequirement"
                          name="jobRequirement"
                          placeholder="Mô tả chi tiết yêu cầu công việc"
                          className="min-h-[180px]"
                      />
                  </div>

                  
                  <div className="space-y-2">
                      <Label htmlFor="candidateRequirement">Yêu cầu ứng viên</Label>
                      <Textarea
                          {...register('candidateRequirement')}
                          id="candidateRequirement"
                          name="candidateRequirement"
                          placeholder="Yêu cầu ứng viên ứng tuyển công việc"
                          className="min-h-[180px]"
                      />
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="benefit">Quyền lợi khi tham gia ứng tuyển</Label>
                      <Textarea
                          {...register('benefit')}
                          id="benefit"
                          name="benefit"
                          placeholder="Miêu tả chi tiết các quyền lợi"
                          className="min-h-[180px]"
                      />
                  </div>

                  {/* Lương + Địa điểm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                          <Label htmlFor="salaryMin">Mức lương</Label>
                          <div className='flex gap-2'>
                              <Input
                              {...register('salaryMin')}
                              id="salaryMin"
                              name="salaryMin"
                              placeholder="Từ : 15000000đ"
                              />
                              <span>-</span>
                              <Input
                              {...register('salaryMax')}
                              id="salaryMax"
                              name="salaryMax"
                              placeholder="Đến: 20000000đ"
                              />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <Label htmlFor="location">Địa điểm làm việc</Label>
                          <Input
                          {...register('location')}
                          id="location"
                          name="location"
                          placeholder="Ví dụ: 123 D5, Phường Hòa Thuận, Tỉnh Vĩnh Long"
                          />
                      </div>
                  </div>

                  <div className='flex gap-4'>
                      {/* Hạn nộp */}
                      <div className="space-y-2 sm:w-1/2">
                          <Label htmlFor="expiredAt">Hạn nộp hồ sơ</Label>
                          <Input
                              {...register('expiredAt')}
                              id="expiredAt"
                              name="expiredAt"
                              type="date"
                          />
                      </div>

                      <div className="space-y-2">
                          <Label htmlFor="workTime">Thời gian làm việc</Label>
                          <Textarea
                              {...register('workTime')}
                              id="workTime"
                              name="workTime"
                              placeholder="Thời gian làm việc. VD: Thứ 2 - Thứ 6 
                                                                  08:30 - 17:30"
                          />
                      </div>
                  </div>

                  
                  <div className="flex justify-end gap-3 py-4">
                      <Button onClick={onClose} size='lg' type="button" variant="outline" className={`px-4 cursor-pointer`}>
                          Hủy
                      </Button>
                      <Button size='lg' type="submit" variant='ghost' className={`bg-green-700 text-white px-4`}>
                          Lưu thông tin
                      </Button>
                  </div>
              </form>
              </motion.div>
            </div>
          </>
        )}
    </AnimatePresence>
  );
};

export default EditJob;