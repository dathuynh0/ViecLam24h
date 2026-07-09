import React, { useState } from 'react'
import { Input } from '../ui/input'
import { ChevronDown, MapPin, Search } from 'lucide-react'
import { Button } from '../ui/button'


const area = [
  "Toàn quốc",
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Bình Dương",
  "Đồng Nai",
  "Vĩnh Long",
  "Trà Vinh",
  "Long An",
  "An Giang",
  "Khánh Hòa",
  "Bắc Ninh",
  "Nghệ An",
  "Thanh Hóa",
];

const HeroSection = () => {
    const [location, setLocation] = useState('Toàn quốc');
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");
 
    const filtered = area.filter((a) =>
        a.toLowerCase().includes(query.toLowerCase())
    );
    

  return (
    <div className='py-18'>
      <h1 className='text-5xl font-bold md:w-2xl leading-tight'>Tìm kiếm <span className='text-green-900'>việc làm</span> mơ ước phù hợp với bản thân</h1>
      <p className='md:w-2xl text-lg font-light py-4'>Kết nối với các nhà tuyển dụng uy tín và khám phá hàng ngàn cơ hội nghề nghiệp mỗi ngày.</p>
      <form className='w-full max-w-5xl flex flex-col sm:flex-row items-center gap-2 sm:gap-0 bg-white rounded-2xl shadow-lg border border-slate-200 p-2'>
        <div className='flex items-center flex-1 px-4 py-2 gap-3'>
            <Search className="w-5 h-5 text-gray-400 shrink-0"/>
            <Input type={`text`} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full inline-block border-none px-4 py-4" placeholder='Vị trí tuyển dụng, công ty'/>
        </div>

        <div className='relative border-l border-gray-300 flex-1 max-w-xs'>
            <Button onClick={() => setOpen((open) => !open)} variant='ghost' className="w-full flex items-center gap-3 px-4 py-2 text-left">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="flex-1 text-sm text-slate-800 truncate">
                    {location}
                </span>
                 <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                    open ? "rotate-180" : ""
                    }`}
                />
            </Button>

            {open && (
            <div className="absolute z-10 top-full left-0 mt-2 w-full sm:w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2">
                <div className="flex items-center gap-2 px-2 py-1.5 mb-1 border-b border-slate-100">
                    <Search className="w-4 h-4 text-slate-400" />
                    <Input
                        value={query}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Tìm tỉnh / thành..."
                        className="w-full text-sm py-1"
                    />
                </div>
                <div className="max-h-56 overflow-y-auto">
                    {filtered.length === 0 && (
                        <p className="text-sm text-slate-500 px-3 py-2">
                        Không tìm thấy địa điểm
                        </p>
                    )}
                    {filtered.map((a) => (
                        <Button
                        variant='ghost'
                        key={a}
                        type="button"
                        onClick={() => {
                            setLocation(a);
                            setOpen(false);
                            setQuery("");
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-teal-50 cursor-pointer ${
                            location === a
                            ? "bg-teal-100 text-teal-700 font-medium"
                            : "text-slate-700"
                        }`}
                        >
                        {a}
                        </Button>
                    ))}
                </div>
            </div>
            )}
        </div>
        <Button type="submit" size='lg' variant='ghost' className={`text-white bg-green-700`}>Tìm kiếm</Button>
      </form>
    </div>
  )
}

export default HeroSection
