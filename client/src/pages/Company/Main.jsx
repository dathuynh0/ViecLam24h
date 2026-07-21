import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from './Dashboard'
import CreateJob from './CreateJob'
import CompanyLayout from '@/Layout/CompanyLayout'
import MyCompany from './MyCompany'
import ManagerJob from './ManagerJob'
import NotFound from '../404/NotFound'

const Main = () => {
  return (
    <Routes>
        <Route element={<CompanyLayout />}>
            <Route index element={<Dashboard />}/>
            <Route path="dang-tin" element={<CreateJob />}/>
            <Route path='quan-ly-bai-dang' element={<ManagerJob />}/>
            <Route path='cong-ty' element={<MyCompany />}/>
        </Route>

        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default Main
