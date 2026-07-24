import MainLayOut from '@/Layout/MainLayout'
import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './HomePage'
import JobDetail from './JobDetail'
import CategoryJob from './CategoryJob'
import SearchJobPage from './SearchJobPage'
import CompanyPage from './CompanyPage'
import PrivateRoute from './PrivateRoute'
import Profile from './Profile'
import Application from './Application'
import NotFound from '../404/NotFound'
import ListCompany from './ListCompany'

const Main = () => {
  return (
    <Routes>
        <Route path='/' element={<MainLayOut />}>
            <Route index element={<HomePage />} />
            <Route path='viec-lam/:slug' element={<JobDetail />} />
            <Route path="danh-muc/:slug" element={<CategoryJob />} />
            <Route path="tim-kiem" element={<SearchJobPage /> } />
            <Route path='cong-ty' element={<ListCompany />}/>
            <Route path="cong-ty/:slug" element={<CompanyPage /> } />
            <Route element={<PrivateRoute /> }>
                <Route path="ho-so" element={<Profile />} />
                <Route path="lich-su-ung-tuyen" element={<Application />} />
            </Route>
        </Route>

        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default Main
