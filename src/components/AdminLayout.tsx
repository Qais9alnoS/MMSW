import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Users, FileText, Calendar, Image, MessageSquare, 
  DollarSign, Settings, LogOut, Menu, X, Bell, Activity,
  Sun, Moon, Laptop
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, pageTitle }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = () => {
      if (theme === 'auto') {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      }
    };
    
    if (theme === 'auto') {
      mediaQuery.addEventListener('change', handleThemeChange);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [theme]);

  const toggleTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (newTheme === 'auto') {
      document.documentElement.classList.toggle('dark', mediaQuery.matches);
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const navigation = [
    { name: 'لوحة التحكم', href: '/admin/dashboard', icon: Home, badge: 0 },
    { name: 'طلبات التسجيل', href: '/admin/enrollments', icon: Users, badge: 5 },
    { name: 'الأخبار', href: '/admin/news', icon: FileText, badge: 0 },
    { name: 'الفعاليات', href: '/admin/events', icon: Calendar, badge: 2 },
    { name: 'معرض الصور', href: '/admin/gallery', icon: Image, badge: 0 },
    { name: 'الرسائل', href: '/admin/messages', icon: MessageSquare, badge: 8 },
    { name: 'الأسعار', href: '/admin/pricing', icon: DollarSign, badge: 0 },
    { name: 'الإعدادات', href: '/admin/settings', icon: Settings, badge: 0 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast({
      title: 'تم تسجيل الخروج بنجاح',
      description: 'سيتم إعادة توجيهك إلى صفحة تسجيل الدخول',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rtl">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 right-0 z-50 w-72 bg-white/95 backdrop-blur-sm border-r border-slate-200 dark:bg-slate-900/95 dark:border-slate-700 transform transition-transform duration-300 ease-in-out shadow-xl ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  لوحة التحكم
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  نظام إدارة المدرسة
                </p>
              </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5" />
                    <span className="ml-3">{item.name}</span>
                  </div>
                  {item.badge > 0 && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  AD
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">مسؤول</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">مدير النظام</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`lg:ml-72 ${language === 'ar' ? 'lg:mr-72 lg:ml-0' : ''}`}>
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 dark:bg-slate-900/95 dark:border-slate-700 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {pageTitle}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  إدارة {pageTitle.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 ${theme === 'light' ? 'bg-white dark:bg-gray-700' : ''}`}
                  onClick={() => toggleTheme('light')}
                  title="وضع فاتح"
                >
                  <Sun className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 ${theme === 'dark' ? 'bg-white dark:bg-gray-700' : ''}`}
                  onClick={() => toggleTheme('dark')}
                  title="وضع داكن"
                >
                  <Moon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 ${theme === 'auto' ? 'bg-white dark:bg-gray-700' : ''}`}
                  onClick={() => toggleTheme('auto')}
                  title="تلقائي"
                >
                  <Laptop className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs p-0">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;