import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Image as ImageIcon, Upload, Trash2, ExternalLink, Search, Filter } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  date: string;
  tags: string[];
}

const AdminGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'school',
    tags: '',
    url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load sample images
    const sampleImages: GalleryImage[] = [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        title: 'الاحتفال باليوم الوطني',
        description: 'طلابنا يحتفلون باليوم الوطني للمملكة',
        category: 'school',
        date: '2024-09-23',
        tags: ['احتفال', 'يوم وطني', 'طلاب']
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
        title: 'رياضة المدرسة',
        description: 'فرقنا الرياضية في البطولة المحلية',
        category: 'sports',
        date: '2024-10-15',
        tags: ['رياضة', 'بطولة', 'طلاب']
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop',
        title: 'معرض العلوم',
        description: 'طلابنا يعرضون مشاريعهم العلمية المبتكرة',
        category: 'science',
        date: '2024-11-20',
        tags: ['علوم', 'معرض', 'ابتكار']
      }
    ];
    setImages(sampleImages);
  }, []);

  const categories = [
    { value: 'all', label: 'الكل' },
    { value: 'school', label: 'المدرسة' },
    { value: 'sports', label: 'الرياضة' },
    { value: 'science', label: 'العلوم' },
    { value: 'arts', label: 'الفنون' },
    { value: 'events', label: 'الفعاليات' }
  ];

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: formData.url || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop',
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      setImages([newImage, ...images]);
      setFormData({ title: '', description: '', category: 'school', tags: '', url: '' });
      setShowForm(false);
    } catch (err) {
      setError('حدث خطأ أثناء إضافة الصورة');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setImages(images.filter(image => image.id !== id));
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              معرض الصور
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              إدارة صور المدرسة والفعاليات
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  إجمالي الصور
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {images.length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">
                  الفئات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {[...new Set(images.map(img => img.category))].length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  الصور هذا الشهر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {images.filter(img => {
                    const imgDate = new Date(img.date);
                    const today = new Date();
                    return imgDate.getMonth() === today.getMonth() && imgDate.getFullYear() === today.getFullYear();
                  }).length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  الكلمات الدلالية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {[...new Set(images.flatMap(img => img.tags))].length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="ابحث عن صور..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64 bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-md bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Upload className="w-4 h-4 ml-2" />
                إضافة صورة
              </Button>
            </div>
          </div>

          {/* Add Image Form */}
          {showForm && (
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle>إضافة صورة جديدة</CardTitle>
                <CardDescription>قم بإضافة صورة جديدة إلى معرض المدرسة</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>عنوان الصورة</Label>
                      <Input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                        placeholder="أدخل عنوان الصورة"
                      />
                    </div>
                    <div>
                      <Label>رابط الصورة (اختياري)</Label>
                      <Input
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>الوصف</Label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-3 py-2 rounded-md bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                      placeholder="أدخل وصف الصورة"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>الفئة</Label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-md bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.filter(cat => cat.value !== 'all').map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>الكلمات الدلالية</Label>
                      <Input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="bg-white/50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-blue-500"
                        placeholder="رياضة، فعالية، طلاب"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {loading ? 'جاري الحفظ...' : 'حفظ الصورة'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({ title: '', description: '', category: 'school', tags: '', url: '' });
                        setError('');
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

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() => window.open(image.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-red-500/20"
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    {image.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {image.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {new Date(image.date).toLocaleDateString('ar-SA')}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs">
                      {categories.find(cat => cat.value === image.category)?.label}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {image.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  لم يتم العثور على صور
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  لا توجد صور تطابق معايير البحث الخاصة بك.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  مسح الفلاتر
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;