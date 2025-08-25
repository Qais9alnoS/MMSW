import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  status: 'upcoming' | 'past' | 'cancelled';
}

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('adminEvents');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    status: 'upcoming' as 'upcoming' | 'past' | 'cancelled'
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    try {
      const stored = localStorage.getItem('events');
      const data: Event[] = stored ? JSON.parse(stored) : [];
      setEvents(data);
    } catch (error) {
      setEvents([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData }
          : event
      ));
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData
      };
      setEvents([newEvent, ...events]);
    }
    setFormData({ title: '', description: '', date: '', time: '', location: '', status: 'upcoming' });
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      status: event.status
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const eventStats = [
    { name: 'قادم', value: events.filter(e => e.status === 'upcoming').length, color: '#3b82f6' },
    { name: 'منتهي', value: events.filter(e => e.status === 'past').length, color: '#10b981' },
    { name: 'ملغي', value: events.filter(e => e.status === 'cancelled').length, color: '#ef4444' }
  ];

  const monthlyEvents = [
    { month: 'يناير', events: events.filter(e => new Date(e.date).getMonth() === 0).length },
    { month: 'فبراير', events: events.filter(e => new Date(e.date).getMonth() === 1).length },
    { month: 'مارس', events: events.filter(e => new Date(e.date).getMonth() === 2).length },
    { month: 'أبريل', events: events.filter(e => new Date(e.date).getMonth() === 3).length },
    { month: 'مايو', events: events.filter(e => new Date(e.date).getMonth() === 4).length },
    { month: 'يونيو', events: events.filter(e => new Date(e.date).getMonth() === 5).length },
  ];

  return (
    <AdminLayout pageTitle="إدارة الفعاليات">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              إدارة الفعاليات
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              إدارة فعاليات المدرسة
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة فعالية
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
                إجمالي الفعاليات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{events.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">
                الفعاليات القادمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {events.filter(e => e.status === 'upcoming').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400">
                هذا الشهر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {events.filter(e => {
                  const eventDate = new Date(e.date);
                  const today = new Date();
                  return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
                }).length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-600 dark:text-orange-400">
                المواقع النشطة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {[...new Set(events.map(e => e.location))].length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                الفعاليات حسب الشهر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyEvents}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="events" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                الفعاليات حسب الحالة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={eventStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {eventStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {eventStats.map((stat) => (
                  <div key={stat.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                    <span className="text-sm">{stat.name}: {stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      {showForm && (
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {editingEvent ? 'تعديل الفعالية' : 'إضافة فعالية جديدة'}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              {editingEvent ? 'قم بتحديث تفاصيل الفعالية' : 'أنشئ فعالية جديدة للمدرسة'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2">عنوان الفعالية</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل عنوان الفعالية"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2">الموقع</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل موقع الفعالية"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل وصف الفعالية"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2">التاريخ</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2">الوقت</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2">الحالة</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'upcoming' | 'past' | 'cancelled' })}
                    className="w-full rounded-md px-3 py-2 bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="upcoming">قادم</option>
                    <option value="past">منتهي</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  حفظ
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
                    setFormData({ title: '', description: '', date: '', time: '', location: '', status: 'upcoming' });
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
        {events.map((event) => (
          <Card key={event.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'upcoming' ? 
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        event.status === 'past' ? 
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {event.status === 'upcoming' ? 'قادم' : event.status === 'past' ? 'منتهي' : 'ملغي'}
                      </span>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEdit(event)}
                    className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(event.id)}
                    className="hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{event.description}</p>
            </CardContent>
          </Card>
        ))}
        
        {events.length === 0 && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0">
            <CardContent className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                لا توجد فعاليات
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                لم يتم العثور على فعاليات. أنشئ أول فعالية لك.
              </p>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 ml-2" />
                إنشاء أول فعالية
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  </AdminLayout>
  );
};

export default AdminEvents;