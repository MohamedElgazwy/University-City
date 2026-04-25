import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  Home, 
  FileText, 
  ArrowLeftRight, 
  Building2, 
  Wallet, 
  Wrench, 
  Users, 
  UserCircle, 
  LogOut,
  Grid3X3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import type { UserRole } from '@/App';

interface LayoutProps {
  userRole: UserRole;
  currentUser: {
    name: string;
    role: string;
    avatar: string;
  };
  onLogout: () => void;
}

export function Layout({ userRole, currentUser, onLogout }: LayoutProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const adminNavItems = [
    { path: '/dashboard', label: 'الرئيسية', icon: Home },
    { path: '/housing-requests', label: 'طلبات التسكين', icon: FileText },
    { path: '/room-distribution', label: 'توزيع وتحويل الغرف', icon: ArrowLeftRight },
    { path: '/building-rooms', label: 'المباني والغرف', icon: Building2 },
    { path: '/payments', label: 'المدفوعات', icon: Wallet },
    { path: '/maintenance-requests', label: 'الصيانة', icon: Wrench },
    { path: '/users', label: 'إدارة المستخدمين', icon: Users },
  ];

  const studentNavItems = [
    { path: '/student-dashboard', label: 'الرئيسية', icon: Home },
    { path: '/services', label: 'الخدمات', icon: Grid3X3 },
    { path: '/profile', label: 'الملف الشخصي', icon: UserCircle },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : studentNavItems;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-slate-200 fixed h-full right-0 top-0 z-40 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-sm">نظام المدن الجامعية</h1>
              <p className="text-xs text-slate-500">جامعة المنيا</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-sky-50 text-sky-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 mr-64">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button
              variant="default"
              size="sm"
              className="bg-sky-500 hover:bg-sky-600 gap-2"
              onClick={() => setProfileOpen(true)}
            >
              <UserCircle className="w-4 h-4" />
              الملف الشخصي
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-slate-800 text-sm">{currentUser.name}</p>
              <p className="text-xs text-slate-500">{currentUser.role}</p>
            </div>
            <Avatar className="w-10 h-10 border-2 border-sky-100">
              <AvatarFallback className="bg-sky-100 text-sky-600">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">الملف الشخصي</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-sky-100 text-sky-600 text-2xl">
                  {currentUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-500 block mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  value={currentUser.name}
                  readOnly
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-right"
                />
              </div>
              <div>
                <label className="text-sm text-slate-500 block mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value="hamada@minia.edu.eg"
                  readOnly
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-right"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-slate-500 block mb-1">الدور الوظيفي</label>
                  <span className="inline-flex items-center px-3 py-2 rounded-lg bg-sky-50 text-sky-700 text-sm">
                    إداري
                  </span>
                </div>
                <div>
                  <label className="text-sm text-slate-500 block mb-1">حالة الحساب</label>
                  <span className="inline-flex items-center px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full ml-2"></span>
                    نشط
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-500 block mb-1">الجهة</label>
                <input
                  type="text"
                  value="إدارة المدن الجامعية - جامعة المنيا"
                  readOnly
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-right"
                />
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
              <div className="text-amber-500 mt-0.5">ⓘ</div>
              <p className="text-sm text-amber-700">
                هذه البيانات للعرض فقط ولا يمكن تعديلها من خلال هذه الواجهة
              </p>
            </div>
            <Button 
              className="w-full bg-sky-500 hover:bg-sky-600"
              onClick={() => setProfileOpen(false)}
            >
              إغلاق
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
