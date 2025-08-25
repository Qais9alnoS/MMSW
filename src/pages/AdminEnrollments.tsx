import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';


import { useToast } from '@/components/ui/use-toast';
import { Eye, Download, Search, Filter, TrendingUp, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

interface Enrollment {
  id: string;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  grade: string;
  parentName: string;
  email: string;
  phone: string;
  address: string;
  previousSchool?: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const AdminEnrollments = () => {
  const { toast } = useToast();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = () => {
    try {
      const stored = localStorage.getItem('enrollments');
      const data: Enrollment[] = stored ? JSON.parse(stored) : [];
      setEnrollments(data);
    } catch (error) {
      setEnrollments([]);
    }
  };

  const filteredEnrollments = useMemo(() => {
    let filtered = enrollments;

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(enrollment => enrollment.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(enrollment =>
        enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.phone.includes(searchTerm)
      );
    }

    return filtered;
  }, [enrollments, selectedStatus, searchTerm]);

  const updateEnrollmentStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      setEnrollments(prev => 
        prev.map(enrollment => 
          enrollment.id === id ? { ...enrollment, status } : enrollment
        )
      );
      
      toast({
        title: 'تم التحديث',
        description: 'تم تحديث حالة التسجيل بنجاح',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة التسجيل',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">قيد الانتظار</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">تمت الموافقة</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">تم الرفض</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const exportEnrollments = () => {
    const csvContent = [
      ['اسم الطالب', 'تاريخ الميلاد', 'الصف', 'اسم ولي الأمر', 'البريد الإلكتروني', 'رقم الهاتف', 'الحالة', 'تاريخ التقديم'],
      ...filteredEnrollments.map(enrollment => [
        enrollment.studentName,
        enrollment.dateOfBirth,
        enrollment.grade,
        enrollment.parentName,
        enrollment.email,
        enrollment.phone,
        enrollment.status,
        new Date(enrollment.submittedAt).toLocaleDateString(),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `enrollments-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = useMemo(() => {
    const total = enrollments.length;
    const pending = enrollments.filter(e => e.status === 'pending').length;
    const approved = enrollments.filter(e => e.status === 'approved').length;
    const rejected = enrollments.filter(e => e.status === 'rejected').length;
    
    return { total, pending, approved, rejected };
  }, [enrollments]);

  const chartData = [
    { name: 'قيد الانتظار', value: stats.pending, color: '#f59e0b' },
    { name: 'تمت الموافقة', value: stats.approved, color: '#10b981' },
    { name: 'تم الرفض', value: stats.rejected, color: '#ef4444' },
  ];

  const gradeDistribution = useMemo(() => {
    const distribution: { [key: string]: number } = {};
    enrollments.forEach(enrollment => {
      distribution[enrollment.grade] = (distribution[enrollment.grade] || 0) + 1;
    });
    return Object.entries(distribution).map(([grade, count]) => ({
      grade,
      count,
    }));
  }, [enrollments]);

  return (
    <AdminLayout pageTitle="طلبات التسجيل">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              إجمالي طلبات التسجيل
            </CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              جميع الطلبات المقدمة
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              قيد الانتظار
            </CardTitle>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.pending}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              في انتظار المراجعة
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              تمت الموافقة
            </CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.approved}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              تم قبولهم بنجاح
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              تم الرفض
            </CardTitle>
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.rejected}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              لم يتم قبولهم
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              التسجيل حسب الصف
            </CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              التوزيع عبر الصفوف الدراسية
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="grade" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              توزيع الحالات
            </CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              نظرة عامة على الحالات الحالية
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              الفلاتر والبحث
            </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">الحالة</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="approved">تمت الموافقة</SelectItem>
                  <SelectItem value="rejected">تم الرفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">البحث</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ابحث عن طالب أو ولي أمر أو بريد أو هاتف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollments Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              طلبات التسجيل
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredEnrollments.length})
              </span>
            </CardTitle>
            <Button onClick={exportEnrollments} variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">الطالب</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">الصف</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">ولي الأمر</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">التواصل</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">الحالة</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">التاريخ</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{enrollment.studentName}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{enrollment.dateOfBirth}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {enrollment.grade}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-slate-900 dark:text-white">{enrollment.parentName}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-slate-900 dark:text-white">{enrollment.email}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{enrollment.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(enrollment.status)}</td>
                    <td className="py-4 px-4 text-sm text-slate-500 dark:text-slate-400">
                      {new Date(enrollment.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEnrollment(enrollment)}
                          className="hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select
                          value={enrollment.status}
                          onValueChange={(value) => 
                            updateEnrollmentStatus(enrollment.id, value as 'pending' | 'approved' | 'rejected')
                          }
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">قيد الانتظار</SelectItem>
                            <SelectItem value="approved">تمت الموافقة</SelectItem>
                            <SelectItem value="rejected">تم الرفض</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredEnrollments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-500 dark:text-slate-400">لم يتم العثور على طلبات تسجيل</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enrollment details modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                تفاصيل الطلب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">معلومات الطالب</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">الاسم:</span> {selectedEnrollment.studentName}</p>
                      <p><span className="font-medium">تاريخ الميلاد:</span> {selectedEnrollment.dateOfBirth}</p>
                      <p><span className="font-medium">الجنس:</span> {selectedEnrollment.gender}</p>
                      <p><span className="font-medium">الصف:</span> {selectedEnrollment.grade}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">معلومات ولي الأمر</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">الاسم:</span> {selectedEnrollment.parentName}</p>
                      <p><span className="font-medium">البريد الإلكتروني:</span> {selectedEnrollment.email}</p>
                      <p><span className="font-medium">الهاتف:</span> {selectedEnrollment.phone}</p>
                      <p><span className="font-medium">العنوان:</span> {selectedEnrollment.address}</p>
                    </div>
                  </div>
                </div>

                {selectedEnrollment.previousSchool && (
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">المدرسة السابقة</h3>
                    <p className="text-slate-700 dark:text-slate-300">{selectedEnrollment.previousSchool}</p>
                  </div>
                )}

                {selectedEnrollment.message && (
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">رسالة إضافية</h3>
                    <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      {selectedEnrollment.message}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button variant="outline" onClick={() => setSelectedEnrollment(null)}>
                    إغلاق
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={() => {
                      updateEnrollmentStatus(selectedEnrollment.id, 'approved');
                      setSelectedEnrollment(null);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    قبول
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminEnrollments;