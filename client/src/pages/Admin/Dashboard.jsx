import React, { useEffect, useState } from 'react'
import api from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Briefcase, Users, FileText, Building2, TrendingUp
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import Loading from '@/components/Loading'

const StatCard = ({ title, value, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {value.toLocaleString('vi-VN')}
      </div>
    </CardContent>
  </Card>
)

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const res = await api.get('/admin/dashboard/stats')
        setStats(res.data)
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu thống kê:', err)
      } finally {
        setLoading(false)
      }
    }


    fetchStats()
  }, [])

  if (loading) {
    return <Loading />
  }


  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Thống kê tổng quan hệ thống</h1>
        <p className="text-sm text-muted-foreground">Dữ liệu ở mức tham khảo</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Tổng số tin tuyển dụng" value={stats?.totalJobs ?? 0} icon={Briefcase}  />
        <StatCard title="Tổng số công ty" value={stats?.totalCompanies ?? 0} icon={Building2}  />
        <StatCard title="Tổng số ứng viên" value={stats?.totalCandidates ?? 0} icon={Users}  />
        <StatCard title="Tổng số hồ sơ ứng tuyển" value={stats?.totalApplications ?? 0} icon={FileText}/>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Tin tuyển dụng theo thời gian
            </CardTitle>
          </CardHeader>
          <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={stats?.jobsOverTime || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top ngành nghề có nhiều tin nhất</CardTitle>
          </CardHeader>
          <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats?.topCategories || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontSize={12} />
                  <YAxis dataKey="title" type="category" width={130} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="jobCount" fill="#16a34a" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Công ty chờ duyệt gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          { 
            stats?.pendingCompanies?.length ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b">
                    <th className="py-2">Tên công ty</th>
                    <th className="py-2">Trạng thái</th>
                    <th className="py-2">Ngày đăng ký</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.pendingCompanies.map((c) => (
                    <tr key={c.id} className="border-b last:border-0">
                      <td className="py-2">{c.companyName}</td>
                      <td className="py-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          {c.status}
                        </span>
                      </td>
                      <td className="py-2">{new Date(c.createdAt).toLocaleDateString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-muted-foreground">Không có công ty nào chờ duyệt</p>
            )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard