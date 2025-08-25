import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, DollarSign, CheckCircle, Star, TrendingUp, Package, Award } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  grade: string;
  isActive: boolean;
}

const AdminPricing = () => {
  const [pricing, setPricing] = useState<PricingTier[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PricingTier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    features: [''],
    grade: '',
    isActive: true
  });

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = () => {
    try {
      const stored = localStorage.getItem('pricing');
      const data: PricingTier[] = stored ? JSON.parse(stored) : [
        {
          id: '1',
          name: 'الصف الأول',
          description: 'تعليم شامل للصف الأول',
          price: 150,
          features: ['متابعة يومية', 'دروس تفاعلية', 'اختبارات شهرية', 'دعم فني'],
          grade: 'الصف الأول',
          isActive: true
        },
        {
          id: '2',
          name: 'الصف الثاني',
          description: 'تعليم شامل للصف الثاني',
          price: 200,
          features: ['متابعة يومية', 'دروس تفاعلية', 'اختبارات شهرية', 'دعم فني'],
          grade: 'الصف الثاني',
          isActive: true
        }
      ];
      setPricing(data);
    } catch (error) {
      setPricing([]);
    }
  };

  const savePricing = (newPricing: PricingTier[]) => {
    localStorage.setItem('pricing', JSON.stringify(newPricing));
    setPricing(newPricing);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const updatedPricing = pricing.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      );
      savePricing(updatedPricing);
    } else {
      const newItem: PricingTier = {
        id: Date.now().toString(),
        ...formData,
        features: formData.features.filter(f => f.trim() !== '')
      };
      savePricing([...pricing, newItem]);
    }
    setFormData({ name: '', description: '', price: 0, features: [''], grade: '', isActive: true });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item: PricingTier) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      features: item.features.length > 0 ? item.features : [''],
      grade: item.grade,
      isActive: item.isActive
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const updatedPricing = pricing.filter(item => item.id !== id);
    savePricing(updatedPricing);
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const gradeStats = pricing.reduce((acc, item) => {
    acc[item.grade] = (acc[item.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const gradeChartData = Object.entries(gradeStats).map(([grade, count]) => ({
    grade,
    count
  }));

  const priceRange = pricing.reduce((acc, item) => {
    if (item.price <= 100) acc['0-100'] = (acc['0-100'] || 0) + 1;
    else if (item.price <= 200) acc['101-200'] = (acc['101-200'] || 0) + 1;
    else if (item.price <= 300) acc['201-300'] = (acc['201-300'] || 0) + 1;
    else acc['300+'] = (acc['300+'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priceChartData = Object.entries(priceRange).map(([range, count]) => ({
    range,
    count
  }));

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

  return (
    <AdminLayout pageTitle="الأسعار">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              الأسعار
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              إدارة خطط الأسعار والباقات
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة خطة
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="w-4 h-4 text-green-600" />
                إجمالي الخطط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{pricing.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">جميع خطط الأسعار</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                الخطط النشطة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {pricing.filter(p => p.isActive).length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">نشطة حالياً</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-purple-600" />
                متوسط السعر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {pricing.length > 0 ? Math.round(pricing.reduce((sum, p) => sum + p.price, 0) / pricing.length) : 0}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">متوسط السعر لكل خطة</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-600" />
                الصفوف
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {new Set(pricing.map(p => p.grade)).size}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">صفوف فريدة</p>
            </CardContent>
          </Card>
        </div>

        {pricing.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">الخطط حسب الصف</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={gradeChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ grade, count }) => `${grade}: ${count}`}
                    >
                      {gradeChartData.map((entry, index) => (
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
                <CardTitle className="text-lg">توزيع الأسعار</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={priceChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
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
              <CardTitle className="text-lg">{editingItem ? 'تعديل الخطة' : 'إضافة خطة'}</CardTitle>
              <CardDescription>
                {editingItem ? 'تعديل تفاصيل خطة الأسعار' : 'إضافة خطة أسعار جديدة'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">اسم الخطة</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                      placeholder="أدخل اسم الخطة"
                    />
                  </div>

                  <div>
                    <Label htmlFor="grade">الصف</Label>
                    <Input
                      id="grade"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      required
                      className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                      placeholder="أدخل الصف"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                    placeholder="أدخل الوصف"
                  />
                </div>

                <div>
                  <Label htmlFor="price">السعر (EGP)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    required
                    className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                    placeholder="أدخل السعر"
                  />
                </div>

                <div>
                  <Label>المميزات</Label>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                          placeholder="أدخل الميزة"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="border-red-300 dark:border-red-600 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addFeature}
                      className="border-gray-300 dark:border-gray-600"
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة ميزة
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label>نشط</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                    حفظ
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                      setFormData({ name: '', description: '', price: 0, features: [''], grade: '', isActive: true });
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

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {pricing.length === 0 ? (
            <Card className="col-span-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">لا توجد خطط أسعار</h3>
                <p className="text-gray-500 dark:text-gray-400">لم تتم إضافة أي خطط أسعار بعد</p>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة أول خطة
                </Button>
              </CardContent>
            </Card>
          ) : (
            pricing.map((item) => (
              <Card key={item.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.grade}
                          </Badge>
                          <Badge variant={item.isActive ? "default" : "secondary"}>
                            {item.isActive ? 'نشط' : 'غير نشط'}
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
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-green-600">{item.price}</span>
                    <span className="text-gray-500 dark:text-gray-400"> جنيه</span>
                  </div>
                  <ul className="space-y-2">
                    {item.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPricing;