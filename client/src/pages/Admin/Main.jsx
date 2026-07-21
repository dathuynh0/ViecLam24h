import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from './Dashboard'
import AdminLayout from '@/Layout/AdminLayout'
import ManagerCompany from './ManagerCompany'
import ManagerCandidate from './ManagerCandidate'
import ManagerJob from './ManagerJob'
import ManagerCategory from './ManagerCategory'
import NotFound from '../404/NotFound'

const Main = () => {
  return (
    <Routes>
        <Route path='/' element={<AdminLayout />}>
            <Route index element={<Dashboard />}/>
            <Route path='nha-tuyen-dung' element={<ManagerCompany />}/>
            <Route path='nguoi-dung' element={<ManagerCandidate />}/>
            <Route path='bai-dang' element={<ManagerJob />}/>
            <Route path='danh-muc' element={<ManagerCategory />}/>
        </Route>

        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default Main
