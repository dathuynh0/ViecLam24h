import React from 'react'
import { Button } from '../ui/button'
import { Zap } from 'lucide-react'
import { Badge } from '../ui/badge'

const Skill = ({ user }) => {
  return (
    <div className='border border-gray-300 rounded-lg bg-white shadow-lg p-4 space-y-4'>
        <h2 className='font-bold text-lg flex items-center gap-3'>
            <Button variant='ghost' className={`h-5 w-5 p-5 rounded-lg bg-green-100`}>
                <Zap />
            </Button>
            Kỹ năng
        </h2>
        
        <ul className='flex flex-wrap gap-3'>
            {user?.skill.map((skill) => (
                <li key={skill}>
                    <Badge className={`text-slate-800 bg-slate-200`}>{skill}</Badge>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Skill
