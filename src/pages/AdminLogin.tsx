import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Sun, Moon, Laptop } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = () => {
      if (theme === 'auto') {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      } else {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    };
    
    handleThemeChange();
    
    if (theme === 'auto') {
      mediaQuery.addEventListener('change', handleThemeChange);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [theme]);

  const toggleTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('بيانات تسجيل الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        <button
          onClick={() => toggleTheme('light')}
          className={`p-2 rounded-md transition-colors ${
            theme === 'light' 
              ? 'bg-white/20 text-white' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          title="وضع فاتح"
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleTheme('dark')}
          className={`p-2 rounded-md transition-colors ${
            theme === 'dark' 
              ? 'bg-white/20 text-white' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          title="وضع داكن"
        >
          <Moon className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleTheme('auto')}
          className={`p-2 rounded-md transition-colors ${
            theme === 'auto' 
              ? 'bg-white/20 text-white' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          title="تلقائي"
        >
          <Laptop className="w-4 h-4" />
        </button>
      </div>
      
      <Card className="w-full max-w-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">تسجيل دخول المسؤول</CardTitle>
          <CardDescription className="text-center">
            أدخل بياناتك للوصول إلى لوحة التحكم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>بيانات تجريبية:</strong><br />
              البريد: admin@mukhtar.edu.sy<br />
              كلمة المرور: admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;