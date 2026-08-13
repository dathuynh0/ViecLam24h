import { useJobStore } from '@/stores/useJobStore'
import React, { useEffect, useRef, useState } from 'react'
import FeaturedJobCard from './FeaturedJobCard';
import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LOCATIONS = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Hải Phòng",
  "Huế",
  "Đà Nẵng",
  "Cần Thơ",
  "An Giang",
  "Bắc Ninh",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Tĩnh",
  "Hưng Yên",
  "Khánh Hòa",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Nghệ An",
  "Ninh Bình",
  "Phú Thọ",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sơn La",
  "Tây Ninh",
  "Thái Nguyên",
  "Thanh Hóa",
  "Tuyên Quang",
  "Vĩnh Long",
];

const FILTERS = [
  'Địa điểm làm việc',
  'Mức lương'
]

const FeaturedJob = () => {
    const { featuredJob, getFeaturedJob } = useJobStore();
    const [location, setLocation] = useState('all');
    const [filter, setFilter] = useState('Địa điểm làm việc')
    const scrollRef = useRef(null);

    useEffect(() => {
        getFeaturedJob(location);
    }, [location])

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = 240; // px mỗi lần bấm
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };
    
  return (
    <div className='bg-green-50'>
      <div className='max-w-[1100px] mx-auto py-8 lg:py-12'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold text-3xl'>Việc làm <span className='text-green-700'>nổi bật</span></h2>
          <Link target='_blank' to={`/tim-kiem/?name=&location=Toàn%20quốc`} className='flex items-center text-sm hover:text-green-700 hover:underline line-clamp-1'>Xem tất cả <ArrowRight className='h-5 w-5'/></Link>
        </div>

        <div className='relative flex items-center justify-between gap-2 mt-4'>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-gray-600 whitespace-nowrap'>Lọc theo:</p>
            <Select value={filter} className='flex'>
              <SelectTrigger className='w-[200px] bg-white'>
                <SelectValue placeholder='Chọn địa điểm' />
              </SelectTrigger>
              <SelectContent>
                {FILTERS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          
          <div className='max-w-2xl flex items-center gap-2'>
            <Button
              variant='ghost'
              type='button'
              onClick={() => scroll('left')}
              className='shrink-0 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-white border border-gray-300 hover:border-green-700 hover:text-green-700 shadow-sm'
              aria-label='Cuộn trái'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>

            <div
              ref={scrollRef}
              className='flex items-center gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
            >
              <Button
                variant='ghost'
                type='button'
                onClick={() => setLocation('all')}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  location === 'all'
                    ? 'bg-green-700 text-white border-green-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-700 hover:text-green-700'
                }`}
              >
                Toàn quốc
              </Button>
              {LOCATIONS.map((loc) => (
                <Button
                  variant='ghost'
                  key={loc}
                  type='button'
                  onClick={() => setLocation(loc)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm border transition-colors ${
                    location === loc
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-700 hover:text-green-700'
                  }`}
                >
                  {loc}
                </Button>
              ))}
            </div>

            <Button
              variant='ghost'
              type='button'
              onClick={() => scroll('right')}
              className='shrink-0 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-white border border-gray-300 hover:border-green-700 hover:text-green-700 shadow-sm'
              aria-label='Cuộn phải'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <ul className='py-6 grid grid-cols-1 md:grid-cols-3 space-y-2 lg:gap-4'>
          {featuredJob?.length > 0 ? (
            featuredJob.map((job) => (
              <li key={job.id}>
                <FeaturedJobCard featuredJob={job}/>
              </li>
            ))
          ) : (
            <li className='col-span-full text-center text-gray-500 py-6'>
              Không có việc làm phù hợp với địa điểm này
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default FeaturedJob