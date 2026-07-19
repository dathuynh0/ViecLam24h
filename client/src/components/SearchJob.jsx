import React, { useState } from 'react'
import { Input } from './ui/input';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';

const area = [
  "Toàn quốc",
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

const SearchJob = () => {
    const [location, setLocation] = useState('Toàn quốc');
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [jobName, setJobName] = useState("");

    const navigate = useNavigate();
 
    const filtered = area.filter((a) =>
        a.toLowerCase().includes(query.toLowerCase())
    );

    const handleSearchJob = (e) => {
        e.preventDefault();
        if(!jobName && !location) {
            return;
        }

        navigate(`/tim-kiem/?name=${jobName}&location=${location}`)
    }

  return (
    <form onSubmit={handleSearchJob} className='w-full max-w-5xl flex flex-row items-center gap-2 sm:gap-0 bg-white rounded-lg shadow-lg border border-slate-200 p-1'>
        <div className='flex items-center flex-1 px-2'>
            <Search className="w-5 h-5 text-gray-400 shrink-0"/>
            <Input type={`text`} value={jobName} onChange={(e) => setJobName(e.target.value)} className="w-full inline-block border-none" placeholder='Vị trí tuyển dụng, công ty'/>
        </div>

        <div className='hidden lg:block relative border-l border-gray-300 flex-1 max-w-xs'>
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
                        onChange={(e) => setQuery(e.target.value)}
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
        <Button type="submit" size='xl' variant='ghost' className={`text-white bg-green-700 cursor-pointer`}>Tìm kiếm</Button>
      </form>
  )
}

export default SearchJob
