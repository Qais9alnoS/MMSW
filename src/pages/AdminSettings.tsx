import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Save, Shield, Mail, Phone, MapPin, Globe, Palette, Bell, Eye, Upload } from 'lucide-react';

interface SchoolSettings {
  schoolName: string;
  schoolDescription: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  enableOnlineEnrollment: boolean;
  enableNotifications: boolean;
  enableNewsletter: boolean;
  enableSMS: boolean;
  enableEmailAlerts: boolean;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SchoolSettings>({
    schoolName: 'مدرسة المختار الخاصة',
    schoolDescription: 'مدرسة رائدة في التعليم الحديث تقدم مناهج متطورة وبيئة تعليمية متميزة',
    email: 'info@mukhtarschool.com',
    phone: '+966501234567',
    address: 'حي النرجس، الرياض، المملكة العربية السعودية',
    website: 'https://mukhtarschool.com',
    logoUrl: 'https://i.postimg.cc/bJJWZVVC/logoM.png',
    primaryColor: '#2563eb',
    secondaryColor: '#f59e0b',
    accentColor: '#8b5cf6',
    enableOnlineEnrollment: true,
    enableNotifications: true,
    enableNewsletter: false,
    enableSMS: true,
    enableEmailAlerts: true,
    facebookUrl: 'https://facebook.com/mukhtarschool',
    instagramUrl: 'https://instagram.com/mukhtarschool',
    twitterUrl: 'https://twitter.com/mukhtarschool',
    linkedinUrl: 'https://linkedin.com/company/mukhtarschool',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    try {
      const stored = localStorage.getItem('schoolSettings');
      if (stored) {
        const data = JSON.parse(stored);
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('schoolSettings', JSON.stringify(settings));
      toast({
        title: 'تم الحفظ',
        description: 'تم تحديث الإعدادات بنجاح',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في حفظ الإعدادات',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof SchoolSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout pageTitle="الإعدادات">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">إعدادات النظام</h2>
            <p className="text-slate-500 dark:text-slate-400">قم بتكوين نظامك حسب احتياجاتك</p>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
            <TabsTrigger value="features">الميزات</TabsTrigger>
            <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  معلومات المدرسة
                </CardTitle>
                <CardDescription>تفاصيل المدرسة الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">اسم المدرسة</Label>
                    <Input
                      id="schoolName"
                      value={settings.schoolName}
                      onChange={(e) => handleChange('schoolName', e.target.value)}
                      className="border-slate-300 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="pl-10 border-slate-300 dark:border-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolDescription">الوصف</Label>
                  <Textarea
                    id="schoolDescription"
                    value={settings.schoolDescription}
                    onChange={(e) => handleChange('schoolDescription', e.target.value)}
                    rows={4}
                    className="border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">الهاتف</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="pl-10 border-slate-300 dark:border-slate-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">الموقع الإلكتروني</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="website"
                        type="url"
                        value={settings.website}
                        onChange={(e) => handleChange('website', e.target.value)}
                        className="pl-10 border-slate-300 dark:border-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Textarea
                      id="address"
                      value={settings.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      rows={3}
                      className="pl-10 border-slate-300 dark:border-slate-600"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  العلامة التجارية
                </CardTitle>
                <CardDescription>خصص علامتك التجارية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>الشعار</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center">
                        {settings.logoUrl ? (
                          <img src={settings.logoUrl} alt="Logo" className="w-16 h-16 object-contain" />
                        ) : (
                          <Upload className="w-8 h-8 text-slate-400" />
                        )}
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('logo-upload')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        تحميل الشعار
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">رابط الشعار</Label>
                    <Input
                      id="logoUrl"
                      value={settings.logoUrl}
                      onChange={(e) => handleChange('logoUrl', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="border-slate-300 dark:border-slate-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">اللون الأساسي</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => handleChange('primaryColor', e.target.value)}
                        className="w-12 h-12 p-1 border-slate-300 dark:border-slate-600"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => handleChange('primaryColor', e.target.value)}
                        className="border-slate-300 dark:border-slate-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => handleChange('secondaryColor', e.target.value)}
                        className="w-12 h-12 p-1 border-slate-300 dark:border-slate-600"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => handleChange('secondaryColor', e.target.value)}
                        className="border-slate-300 dark:border-slate-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">لون التمييز</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => handleChange('accentColor', e.target.value)}
                        className="w-12 h-12 p-1 border-slate-300 dark:border-slate-600"
                      />
                      <Input
                        value={settings.accentColor}
                        onChange={(e) => handleChange('accentColor', e.target.value)}
                        className="border-slate-300 dark:border-slate-600"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  الميزات
                </CardTitle>
                <CardDescription>تفعيل أو تعطيل الميزات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">التسجيل الإلكتروني</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">السماح بالتقديم الإلكتروني</p>
                    </div>
                    <Switch
                      checked={settings.enableOnlineEnrollment}
                      onCheckedChange={(checked) => handleChange('enableOnlineEnrollment', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">الإشعارات</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">إشعارات النظام</p>
                    </div>
                    <Switch
                      checked={settings.enableNotifications}
                      onCheckedChange={(checked) => handleChange('enableNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">النشرة الإخبارية</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">النشرة الإخبارية عبر البريد</p>
                    </div>
                    <Switch
                      checked={settings.enableNewsletter}
                      onCheckedChange={(checked) => handleChange('enableNewsletter', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">تنبيهات الرسائل</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">الإشعارات عبر الرسائل النصية</p>
                    </div>
                    <Switch
                      checked={settings.enableSMS}
                      onCheckedChange={(checked) => handleChange('enableSMS', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  وسائل التواصل الاجتماعي
                </CardTitle>
                <CardDescription>روابط وسائل التواصل الاجتماعي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebookUrl">Facebook</Label>
                    <Input
                      id="facebookUrl"
                      type="url"
                      value={settings.facebookUrl}
                      onChange={(e) => handleChange('facebookUrl', e.target.value)}
                      placeholder="https://facebook.com/yourschool"
                      className="border-slate-300 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagramUrl">Instagram</Label>
                    <Input
                      id="instagramUrl"
                      type="url"
                      value={settings.instagramUrl}
                      onChange={(e) => handleChange('instagramUrl', e.target.value)}
                      placeholder="https://instagram.com/yourschool"
                      className="border-slate-300 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterUrl">Twitter</Label>
                    <Input
                      id="twitterUrl"
                      type="url"
                      value={settings.twitterUrl}
                      onChange={(e) => handleChange('twitterUrl', e.target.value)}
                      placeholder="https://twitter.com/yourschool"
                      className="border-slate-300 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      value={settings.linkedinUrl}
                      onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                      placeholder="https://linkedin.com/company/yourschool"
                      className="border-slate-300 dark:border-slate-600"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;