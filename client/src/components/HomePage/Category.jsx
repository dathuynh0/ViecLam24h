import { useCategoryStore } from '@/stores/useCategoryStore'
import React from 'react'
import {
  Code2,          // Công nghệ thông tin
  HardHat,        // Lao động phổ thông
  Megaphone,      // Marketing
  Briefcase,      // Nhân viên kinh doanh
  Calculator,     // Kế toán
  Palette,        // Thiết kế đồ họa
  Stethoscope,    // Y tế / Dược
  Scale,          // Luật / Pháp lý
  FlaskConical,   // Hóa học
  Building2,      // Nhân viên văn phòng
  Users,          // Hành chính nhân sự
  Construction,   // Kỹ sư xây dựng
  GraduationCap,  // Giáo dục
} from "lucide-react";
import { Link } from 'react-router';

const categoryIconMap = {
  "viec-lam-cong-nghe-thong-tin": Code2,
  "viec-lam-lao-dong-pho-thong": HardHat,
  "viec-lam-marketing": Megaphone,
  "viec-lam-nhan-vien-kinh-doanh": Briefcase,
  "viec-lam-ke-toan": Calculator,
  "viec-lam-thiet-ke-do-hoa": Palette,
  "viec-lam-y-te-duoc": Stethoscope,
  "viec-lam-luat-phap-ly": Scale,
  "viec-lam-hoa-hoc": FlaskConical,
  "viec-lam-nhan-vien-van-phong": Building2,
  "viec-lam-hanh-chinh-nhan-su": Users,
  "viec-lam-ky-su-xay-dung": Construction,
  "viec-lam-giao-duc": GraduationCap,
};

const getCategoryIcon = (slug) => {
  return categoryIconMap[slug] || Briefcase;
}

const Category = () => {
    const categories = useCategoryStore(s => s.categories);
    
  return (
    <div className='my-8'>
      <div className='max-w-[1200px] mx-auto lg:py-12 space-y-6'>
        <h2 className='text-2xl text-green-700 font-bold'>Top những ngành nghề nổi bậc</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {categories?.slice(0, 9).map((c) => {
                const Icon = getCategoryIcon(c.slug);
                return (
                <li key={c?.id}>
                    <Link
                    to={`/danh-muc/${c.slug}`}
                    className="flex flex-col items-center text-center gap-2 p-5 rounded-xl border bg-white hover:border-primary hover:shadow-md transition-all duration-200 group"
                    >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-700 text-white">
                        <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-sm md:text-base line-clamp-1">
                        {c?.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                        {c?.jobCount} việc làm
                    </p>
                    </Link>
                </li>
                );
            })}
        </ul>
      </div>
    </div>
  )
}

export default Category
