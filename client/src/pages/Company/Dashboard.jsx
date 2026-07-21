import { label } from 'framer-motion/client'
import { BriefcaseBusiness, FilePlusCorner } from 'lucide-react'
import React from 'react'

const FIELD = [
  {
    icon: <BriefcaseBusiness />,
    label: 'Công việc đang đăng',
    content: 20
  },
  {
    icon: <FilePlusCorner />,
    label: 'CV đã nhận',
    content: 30
  },
  {
    icon: <BriefcaseBusiness />,
    label: 'Tổng lượt theo dõi',
    content: 1000
  }
]

const Dashboard = () => {
  return (
    <div className={'p-4 space-y-4'}>
      <h1 className='text-xl font-bold'>Thống kê</h1>
      <div>
        <ul className='flex items-center gap-6'>
          {
            FIELD.map((f) => (
              <li
                key={f.label}
                className='w-full gap-4 space-y-3 rounded-md bg-slate-300 p-6 shadow-md'
              >
                <span className='block'>
                  {f.icon}
                </span>
                <h2 className='text-sm text-muted-foreground font-medium'>{f.label}</h2>
                <p className='text-2xl text-slate-800 font-bold'>{f.content}</p>
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
