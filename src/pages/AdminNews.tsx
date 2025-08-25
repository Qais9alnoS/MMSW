import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Calendar, Image as ImageIcon, TrendingUp, Newspaper, Clock, CheckCircle } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  category: string;
  date: string;
  status: 'published' | 'draft';
}

const AdminNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'أخبار',
    status: 'draft' as 'published' | 'draft'
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    try {
      const stored = localStorage.getItem('news');
      const data: NewsItem[] = stored ? JSON.parse(stored) : [];
      setNews(data);
    } catch (error) {
      setNews([]);
    }
  };

  const saveNews = (newNews: NewsItem[]) => {
    localStorage.setItem('news', JSON.stringify(newNews));
    setNews(newNews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const updatedNews = news.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, date: item.date }
          : item
      );
      saveNews(updatedNews);
    } else {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      saveNews([newItem, ...news]);
    }
    setFormData({ title: '', content: '', category: 'أخبار', status: 'draft' });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      status: item.status
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const updatedNews = news.filter(item => item.id !== id);
    saveNews(updatedNews);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const categoryStats = news.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryStats).map(([category, count]) => ({
    category,
    count
  }));

  const statusStats = news.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(statusStats).map(([status, count]) => ({
    status: status === 'published' ? 'منشور' : 'مسودة',
    count
  }));

  const dailyStats = news.reduce((acc, item) => {
    const day = new Date(item.date).toLocaleDateString('ar-EG', { weekday: 'short' });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dailyChartData = Object.entries(dailyStats).map(([day, count]) => ({
    day,
    count
  }));

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

  return (
    <AdminLayout pageTitle="الأخبار">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              الأخبار
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              إدارة أخبار المدرسة
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة خبر
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-600" />
                إجمالي الأخبار
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{news.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">جميع المقالات</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                منشور
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {news.filter(n => n.status === 'published').length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">مقالات منشورة</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                المسودات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {news.filter(n => n.status === 'draft').length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">مقالات مسودة</p>
            </CardContent>
          </Card>
        </div>

        {news.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">الأخبار حسب الفئة</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ category, count }) => `${category}: ${count}`}
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">الأخبار اليومية</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dailyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {showForm && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">{editingItem ? 'تعديل الخبر' : 'إضافة خبر'}</CardTitle>
              <CardDescription>
                {editingItem ? 'تعديل محتوى الخبر' : 'إضافة خبر جديد للمدرسة'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">العنوان</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                    placeholder="أدخل عنوان الخبر"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">المحتوى</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={4}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                    placeholder="أدخل محتوى الخبر"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">الفئة</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="أخبار">أخبار</SelectItem>
                      <SelectItem value="فعاليات">فعاليات</SelectItem>
                      <SelectItem value="إعلانات">إعلانات</SelectItem>
                    </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">الحالة</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value as 'published' | 'draft' })}
                    >
                      <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">منشور</SelectItem>
                        <SelectItem value="draft">مسودة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    حفظ
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                      setFormData({ title: '', content: '', category: 'أخبار', status: 'draft' });
                    }}
                    className="border-gray-300 dark:border-gray-600"
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {news.length === 0 ? (
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">لا توجد أخبار</h3>
                <p className="text-gray-500 dark:text-gray-400">لم تتم إضافة أي أخبار بعد</p>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  أضف أول خبر
                </Button>
              </CardContent>
            </Card>
          ) : (
            news.map((item) => (
              <Card key={item.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status === 'published' ? 'منشور' : 'مسودة'}
                          </Badge>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNews;