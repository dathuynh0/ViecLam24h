import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Briefcase, Eye, FileText, UserCheck, Plus
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

// ==== MOCK DATA ====
const mockStats = {
  activeJobs: 12,
  totalViews: 4380,
  totalApplications: 156,
  hiredCount: 8,
  applicationsOverTime: [
    { date: '18/07', count: 6 },
    { date: '19/07', count: 9 },
    { date: '20/07', count: 4 },
    { date: '21/07', count: 12 },
    { date: '22/07', count: 8 },
    { date: '23/07', count: 15 },
    { date: '24/07', count: 10 },
  ],
  applicationStatusBreakdown: [
    { name: 'Chờ duyệt', value: 62, color: '#f59e0b' },
    { name: 'Đã phỏng vấn', value: 41, color: '#3b82f6' },
    { name: 'Đã nhận', value: 8, color: '#16a34a' },
    { name: 'Từ chối', value: 45, color: '#dc2626' },
  ],
  jobs: [
    { id: 1, title: 'Frontend Developer (ReactJS)', views: 890, applications: 34, status: 'active' },
    { id: 2, title: 'Backend Developer (NodeJS)', views: 720, applications: 28, status: 'active' },
    { id: 3, title: 'UI/UX Designer', views: 540, applications: 19, status: 'active' },
    { id: 4, title: 'Business Analyst', views: 410, applications: 15, status: 'closed' },
    { id: 5, title: 'DevOps Engineer', views: 615, applications: 22, status: 'active' },
  ],
}
// ==== END MOCK DATA ====

const StatCard = ({ title, value, icon: Icon, suffix = '' }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value.toLocaleString('vi-VN')}{suffix}</div>
    </CardContent>
  </Card>
)

const statusBadge = (status) =>
  status === 'active'
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-600'

const Dashboard = () => {
  const [stats] = useState(mockStats)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Thống kê tuyển dụng</h1>
        </div>
        <Button size='xl' variant='outline' className="flex items-center gap-2 px-4 py-2 border border-green-700 text-green-700">
          <Link to={`/nha-tuyen-dung/dang-tin`} className='flex items-center gap-2'>
            <Plus className="h-4 w-4" /> Đăng tin mới
          </Link>
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Tin đang tuyển" value={stats.activeJobs} icon={Briefcase} />
        <StatCard title="Lượt xem tin" value={stats.totalViews} icon={Eye} />
        <StatCard title="Hồ sơ ứng tuyển" value={stats.totalApplications} icon={FileText} />
        <StatCard title="Ứng viên đã nhận" value={stats.hiredCount} icon={UserCheck} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Hồ sơ ứng tuyển theo ngày (7 ngày qua)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.applicationsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Trạng thái hồ sơ</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.applicationStatusBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {stats.applicationStatusBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {stats.applicationStatusBreakdown.map((entry, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Danh sách tin tuyển dụng</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="py-2">Vị trí</th>
                <th className="py-2">Lượt xem</th>
                <th className="py-2">Ứng tuyển</th>
                <th className="py-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {stats.jobs.map((job) => (
                <tr key={job.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 font-medium">{job.title}</td>
                  <td className="py-2">{job.views}</td>
                  <td className="py-2">{job.applications}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusBadge(job.status)}`}>
                      {job.status === 'active' ? 'Đang tuyển' : 'Đã đóng'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard