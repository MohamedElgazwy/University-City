import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login validation
    setTimeout(() => {
      if (!username || !password) {
        setError('يرجى إدخال اسم المستخدم وكلمة المرور');
        setIsLoading(false);
        return;
      }

      // استدعِ onLogin لتحديث دور المستخدم
      onLogin(username);
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-sky-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">نظام المدن الجامعية</h1>
          <p className="text-slate-500 mt-1">جامعة المنيا</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-6">تسجيل الدخول</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-center">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-sm text-slate-700 block mb-2 text-right">اسم المستخدم / الرقم الجامعي</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="أدخل اسم المستخدم أو الرقم الجامعي"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-700 block mb-2 text-right">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 pl-10 text-right"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-left">
              <button type="button" className="text-sm text-sky-600 hover:text-sky-700">
                هل نسيت كلمة المرور؟
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 py-3"
              disabled={isLoading}
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">أو</span>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-2">
            <p className="text-xs text-slate-500 text-center mb-3">حسابات تجريبية للعرض</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPassword('123456');
                  setTimeout(() => {
                    onLogin('admin');
                    navigate('/dashboard');
                  }, 100);
                }}
                className="p-2 bg-slate-50 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors text-center"
              >
                <span className="block font-medium">مدير النظام</span>
                <span className="text-xs text-slate-500">admin / 123456</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsername('student');
                  setPassword('123456');
                  setTimeout(() => {
                    onLogin('student');
                    navigate('/dashboard');
                  }, 100);
                }}
                className="p-2 bg-slate-50 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors text-center"
              >
                <span className="block font-medium">طالب</span>
                <span className="text-xs text-slate-500">student / 123456</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6">
          جميع الحقوق محفوظة © جامعة المنيا 2026
        </p>
      </div>
    </div>
  );
}
