import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useToast } from '@/components/ui/use-toast';
import { initializeAdminData } from '@/utils/initializeData';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import AdminLayout from '@/components/AdminLayout';
import { Users, Clock, Eye, MessageSquare } from 'lucide-react';

interface DashboardStats {
  totalEnrollments: number;
  pendingEnrollments: number;
  approvedEnrollments: number;
  rejectedEnrollments: number;
  totalNews: number;
  totalEvents: number;
  websiteVisits: number;
  totalMessages: number;
  todayVisits: number;
  yesterdayVisits: number;
}

interface EnrollmentTrend {
  month: string;
  enrollments: number;
  approved: number;
  pending: number;
  rejected: number;
}

interface ActivityItem {
  id: string;
  type: 'enrollment' | 'news' | 'event' | 'message';
  title: string;
  timestamp: string;
  status?: string;
}

const AdminDashboard = () => {

  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalEnrollments: 0,
    pendingEnrollments: 0,
    approvedEnrollments: 0,
    rejectedEnrollments: 0,
    totalNews: 0,
    totalEvents: 0,
    websiteVisits: 0,
    totalMessages: 0,
    todayVisits: 0,
    yesterdayVisits: 0,
  });
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    initializeAdminData();
    loadDashboardStats();
    loadRecentActivities();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const news = JSON.parse(localStorage.getItem('news') || '[]');
      const events = JSON.parse(localStorage.getItem('events') || '[]');
      const messages = JSON.parse(localStorage.getItem('messages') || '[]');
      const visits = parseInt(localStorage.getItem('websiteVisits') || '0');
      
      // Generate mock daily visits data
      const todayVisits = Math.floor(Math.random() * 100) + 50;
      const yesterdayVisits = Math.floor(Math.random() * 80) + 40;

      setStats({
        totalEnrollments: enrollments.length,
        pendingEnrollments: enrollments.filter((e: any) => e.status === 'pending').length,
        approvedEnrollments: enrollments.filter((e: any) => e.status === 'approved').length,
        rejectedEnrollments: enrollments.filter((e: any) => e.status === 'rejected').length,
        totalNews: news.length,
        totalEvents: events.length,
        websiteVisits: visits,
        totalMessages: messages.length,
        todayVisits,
        yesterdayVisits,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadRecentActivities = () => {
    const activities: ActivityItem[] = [
      {
        id: '1',
        type: 'enrollment',
        title: 'طلبات تسجيل جديدة',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: 'pending'
      },
      {
        id: '2',
        type: 'news',
        title: 'أخبار جديدة للعام الدراسي',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: '3',
        type: 'event',
        title: 'حدث يوم المعلم',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    ];
    setRecentActivities(activities);
  };

  const enrollmentTrendData: EnrollmentTrend[] = useMemo(() => [
    { month: 'يناير', enrollments: 45, approved: 35, pending: 7, rejected: 3 },
    { month: 'فبراير', enrollments: 52, approved: 42, pending: 8, rejected: 2 },
    { month: 'مارس', enrollments: 38, approved: 30, pending: 6, rejected: 2 },
    { month: 'أبريل', enrollments: 65, approved: 55, pending: 8, rejected: 2 },
    { month: 'مايو', enrollments: 48, approved: 40, pending: 6, rejected: 2 },
    { month: 'يونيو', enrollments: 72, approved: 60, pending: 10, rejected: 2 },
  ], []);

  const pieChartData = [
    { name: 'موافق عليه', value: stats.approvedEnrollments, color: '#10b981' },
    { name: 'قيد الانتظار', value: stats.pendingEnrollments, color: '#f59e0b' },
    { name: 'مرفوض', value: stats.rejectedEnrollments, color: '#ef4444' },
  ];

  const StatCard = ({ title, value, icon: Icon, trend, trendLabel }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground">
            {trendLabel}: {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout pageTitle="لوحة التحكم">
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="إجمالي التسجيلات"
            value={stats.totalEnrollments}
            icon={Users}
            trend={stats.totalEnrollments}
            trendLabel="منذ البداية"
          />
          <StatCard
            title="قيد المراجعة"
            value={stats.pendingEnrollments}
            icon={Clock}
            trend={stats.pendingEnrollments}
            trendLabel="يتطلب التحقق"
          />
          <StatCard
            title="زيارات الموقع"
            value={stats.websiteVisits}
            icon={Eye}
            trend={`${Math.round(((stats.todayVisits - stats.yesterdayVisits) / stats.yesterdayVisits) * 100)}%`}
            trendLabel="منذ الأمس"
          />
          <StatCard
            title="إجمالي الرسائل"
            value={stats.totalMessages}
            icon={MessageSquare}
            trend={stats.totalMessages}
            trendLabel="رسائل غير مقروءة"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>اتجاه التسجيل</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="enrollments" stroke="#8884d8" name="إجمالي التسجيلات" />
                  <Line type="monotone" dataKey="approved" stroke="#82ca9d" name="موافق عليه" />
                  <Line type="monotone" dataKey="pending" stroke="#ffc658" name="قيد الانتظار" />
                  <Line type="monotone" dataKey="rejected" stroke="#ff7300" name="مرفوض" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>حالة التسجيل</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Stats */}
        <Card>
          <CardHeader>
            <CardTitle>إحصائيات التسجيل الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="enrollments" fill="#8884d8" name="إجمالي التسجيلات" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>النشاط الأخير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {activity.type === 'enrollment' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    {activity.type === 'news' && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                    {activity.type === 'event' && <div className="w-2 h-2 bg-purple-500 rounded-full" />}
                    {activity.type === 'message' && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;