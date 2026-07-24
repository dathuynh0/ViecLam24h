import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SearchNameCompany = ({ onSubmit, name, setName }) => {
  return (
    <form onSubmit={onSubmit} className='flex max-w-md'>
        <div className='flex items-center flex-1 pl-4 border bg-white rounded-lg'>
            <Search className="w-5 h-5 text-gray-400"/>
            <Input value={name} onChange={setName} type={`text`} className="w-full inline-block border-none" placeholder='Vị trí tuyển dụng, công ty'/>
            <Button type="submit" size='xl' variant='ghost' className={`text-white bg-green-700 cursor-pointer`}>Tìm kiếm</Button>
        </div>
    </form>
  )
}

export default SearchNameCompany
