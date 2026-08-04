import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/stores/useAuthStore'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { format, transformText } from '@/lib/formatJsonB';
import { useCompanyStore } from '@/stores/useCompanyStore';
import Loading from '@/components/Loading';
import { Camera } from 'lucide-react';


const COMPANY_FIELD = [
  { field: 'Công nghệ thông tin' },
  { field: 'Tài chính - Ngân hàng' },
  { field: 'Bảo hiểm' },
  { field: 'Bất động sản' },
  { field: 'Giáo dục - Đào tạo' },
  { field: 'Y tế - Dược phẩm' },
  { field: 'Sản xuất - Chế biến' },
  { field: 'Xây dựng' },
  { field: 'Vận tải - Logistics' },
  { field: 'Bán lẻ - Thương mại' },
  { field: 'Hàng tiêu dùng nhanh (FMCG)' },
  { field: 'Marketing - Quảng cáo - PR' },
  { field: 'Truyền thông - Báo chí' },
  { field: 'Du lịch - Nhà hàng - Khách sạn' },
  { field: 'Nông - Lâm - Ngư nghiệp' },
  { field: 'Năng lượng - Điện - Dầu khí' },
  { field: 'Viễn thông' },
  { field: 'Ô tô - Xe máy' },
  { field: 'Pháp lý - Luật' },
  { field: 'Nhân sự - Tuyển dụng' },
  { field: 'Tư vấn' },
  { field: 'Thời trang - Làm đẹp' },
  { field: 'Thực phẩm - Đồ uống' },
  { field: 'Sản xuất' }
];

const MyCompany = () => {
  const { updateMyCompany, companyLoading, updateLogo } = useCompanyStore();

  const { user } = useAuthStore();

  const fileInputRef = useRef(null);


  const { register, handleSubmit } = useForm({
    defaultValues: {
      companyName: user?.companyName,
      website: user?.website,
      field: user?.field,
      address: user?.address,
      taxCode: user?.taxCode,
      companySize: user?.companySize,
      description: transformText(user?.description),
    }
  })

  const handleUpdateMyCompany = (data) => {
    const {
      companyName, description, address, taxCode, companySize, website, field
    } = data;
    
    updateMyCompany(companyName, format(description), address, taxCode, companySize, website, field);
  }

  const handleUploadLogo = (e) => {
    const file = e.target.files?.[0];
    if(!file) return;

    updateLogo(file);
  }

  if (companyLoading) {
    return <Loading />
  }

  
  
  return (
    <form onSubmit={handleSubmit(handleUpdateMyCompany)} className='p-4 mx-auto grid grid-cols-10 gap-4'>
    
      <div className='col-span-6 space-y-4 shadow-md p-4 border border-gray-300 rounded-lg'>
        <h1 className='text-lg font-bold'>Thông tin công ty</h1>

        <div className='flex gap-4'>
          <div className='relative group h-25 w-25'>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${user?.logoUrl}`}
              alt={user?.companyName}
              className='h-25 w-25 p-2 border border-gray rounded-lg shadow-md object-contain'
            />
            <Button
              variant='ghost'
              onClick={() => fileInputRef.current?.click()}
              type='button'
              className='absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 disabled:opacity-100'
            >
              <Camera className='h-6 w-6' />
            </Button>

            <Input
                onChange={handleUploadLogo}
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
              />
          </div>

           <div className='space-y-2 flex-1'>
              <Label htmlFor='companyName'>Tên hiển thị</Label>
              <Input {...register('companyName')} id='companyName' name='companyName' />
            </div>
        </div>

         

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email liên hệ</Label>
            <Input value={user?.email} id='email' name='email' type='email' disabled='true'/>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='website'>Website công ty</Label>
            <Input {...register('website')} id='website' name='website' placeholder='https://...' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='field'>Lĩnh vực hoạt động</Label>
            <NativeSelect id='field' {...register('field')}>
              {
                COMPANY_FIELD.map(f => 
                  <NativeSelectOption key={f.field} value={f.field}>{f.field}</NativeSelectOption>
                )
              }
              {/* <NativeSelectOption value="on_site">Tại văn phòng</NativeSelectOption> */}
            </NativeSelect>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='companySize'>Quy mô nhân sự (người)</Label>
            <Input {...register('companySize')} id='companySize' name='companySize' placeholder='VD: 1500 - 2000' />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='address'>Địa chỉ</Label>
            <Input {...register('address')} id='address' name='address' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='taxCode'>Mã số thuế</Label>
            <Input {...register('taxCode')} id='taxCode' placeholder='VD: 092831123'/>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='description'>Giới thiệu công ty</Label>
          <Textarea
            {...register('description')}
            id='description'
            name='description'
            rows={5}
            placeholder='Mô tả về công ty...'
          />
        </div>

        <Button size='xl' variant='ghost' type='submit' className={`bg-green-700 text-white px-4`}>
          Lưu thay đổi
        </Button>
      </div>

      {/* Cột phải: thông tin phụ, không chỉnh sửa trực tiếp */}
      <div className='col-span-4 space-y-4 shadow-md p-4 border border-gray-300 rounded-lg h-fit'>
        <h2 className='text-lg font-bold'>Trạng thái tài khoản</h2>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-500'>Trạng thái</span>
          <Badge variant={`ghost`} className={
            user?.status === 'active' ? 'bg-green-100 text-green-700' : 'text-red-700 bg-red-100'
          }>
            {user?.status === 'active' ? 'Đang hoạt động' : user?.status}
          </Badge>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-500'>Đường dẫn công ty</span>
          <span className='text-sm font-medium truncate max-w-[150px]'>/{user?.slug}</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-500'>Ngày tham gia</span>
          <span className='text-sm font-medium'>
            {user?.createdAt && new Date(user.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>
      </div>
    </form>
  )
}

export default MyCompany