import { useCategoryStore } from '@/stores/useCategoryStore';
import { Badge } from '../ui/badge';
import { Link } from 'react-router';
import SearchJob from '../SearchJob';


const HeroSection = () => {
    const { categories } = useCategoryStore();
    
    let filterCategory = categories?.slice(0, 4);
    
  return (
    <div className='max-w-[1100px] mx-auto py-6 lg:py-12'>
      <h1 className='text-5xl font-bold md:w-2xl leading-tight'>Tìm kiếm <span className='text-green-900'>việc làm</span> mơ ước phù hợp với bản thân</h1>
      <p className='md:w-2xl text-lg font-light py-2 lg:py-4'>Kết nối với các nhà tuyển dụng uy tín và khám phá hàng ngàn cơ hội nghề nghiệp mỗi ngày.</p>
      <SearchJob />
        <div className='py-6 hidden md:flex items-center gap-4'>
            <p className='text-gray-500'>Công việc phổ biến:</p>
            <ul className='flex items-center gap-2'>
                {filterCategory?.map((c) => 
                    <li key={c?.id}>
                        <Link to={`/danh-muc/${c.slug}`}>
                            <Badge variant='ghost' key={c.title} className={`bg-slate-200 text-slate-900`}>{c.title}</Badge>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    </div>
  )
}

export default HeroSection
