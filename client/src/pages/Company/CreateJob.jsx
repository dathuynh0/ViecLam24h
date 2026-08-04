import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { useCategoryStore } from '@/stores/useCategoryStore'
import { useForm } from 'react-hook-form'
import { useJobStore } from '@/stores/useJobStore'
import Loading from '@/components/Loading'
import { toast } from 'sonner'
import { format } from '@/lib/formatJsonB'

const CreateJob = () => {
    const { categories, getAllCategory } = useCategoryStore();
    const { createJob, jobLoading } = useJobStore();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            categoryId: ``,
            title: '',
            jobRequirement: '',
            description: '',
            candidateRequirement: '',
            benefit: '',
            salaryMin: '',
            salaryMax: '',
            location: '',
            workTime: '',
            workType: 'full_time',
            workArrangement: 'on_site',
            quantity: '',
            expiredAt: ''
        }
    })

    useEffect(() => {
        getAllCategory();
    }, [])

    const handleCreateJob = async (data) => {
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
            !expiredAt
        ) {
            toast.error('Hãy điền đầy đủ thông tin');
            return;
        }

        const formatJobRequirement = format(jobRequirement);
        const formatDescription = format(description);
        const formatCandidateRequirement = format(candidateRequirement);
        const formatBenefit = format(benefit);
        const formatWorkTime = format(workTime);

        const success = await createJob (
            categoryId,
            title,
            formatJobRequirement,
            formatDescription,
            formatCandidateRequirement,
            formatBenefit,
            salaryMin,
            salaryMax,
            location,
            formatWorkTime,
            workType,
            workArrangement,
            quantity,
            expiredAt
        )

        if (success) {
            reset();
        }
    }

    if (jobLoading) {
        return <Loading />
    }
    
  return (
    <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-6">Đăng tin tuyển dụng</h2>

        <form onSubmit={handleSubmit(handleCreateJob)} className="space-y-5">
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
                        placeholder="Từ : 15.000.000đ"
                        />
                        <span>-</span>
                        <Input
                        {...register('salaryMax')}
                        id="salaryMax"
                        name="salaryMax"
                        placeholder="Đến: 20.000.000đ"
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
                        placeholder="Thời gian làm việc. VD: Thứ 2 - Thứ 6 (08:30 - 17:30)"
                    />
                </div>
            </div>

            
            <div className="flex justify-end gap-3 py-4">
                <Button size='lg' type="button" variant="outline" className={`px-4`}>
                    Hủy
                </Button>
                <Button size='lg' type="submit" variant='ghost' className={`bg-green-700 text-white px-4`}>
                    Đăng tin
                </Button>
            </div>
        </form>
    </div>
  )
}

export default CreateJob