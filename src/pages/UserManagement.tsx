import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  statusLabel: string;
}

export function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const users: User[] = [
    { id: '1', name: 'أحمد محمد', email: 'ahmed@minia.edu.eg', role: 'إداري', status: 'active', statusLabel: 'نشط' },
    { id: '2', name: 'سارة علي', email: 'sara@minia.edu.eg', role: 'إداري', status: 'active', statusLabel: 'نشط' },
    { id: '3', name: 'محمود حسن', email: 'mahmoud@minia.edu.eg', role: 'صيانة', status: 'active', statusLabel: 'نشط' },
    { id: '4', name: 'ليلى يوسف', email: 'layla@minia.edu.eg', role: 'صيانة', status: 'inactive', statusLabel: 'موقوف' },
  ];

  const getStatusBadge = (status: string, label: string) => {
    const statusClasses: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700',
      inactive: 'bg-red-100 text-red-700',
    };
    return <Badge className={statusClasses[status] || 'bg-slate-100'}>{label}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const roleClasses: Record<string, string> = {
      'إداري': 'bg-sky-100 text-sky-700',
      'صيانة': 'bg-purple-100 text-purple-700',
    };
    return <span className={`px-2 py-1 rounded text-xs ${roleClasses[role] || 'bg-slate-100'}`}>{role}</span>;
  };

  const filteredUsers = users.filter(user =>
    user.name.includes(searchTerm) || user.email.includes(searchTerm)
  );

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          className="bg-sky-500 hover:bg-sky-600 gap-2"
          onClick={() => setAddUserOpen(true)}
        >
          <Plus className="w-4 h-4" />
          إضافة مستخدم جديد
        </Button>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-slate-800">إدارة المستخدمين</h1>
          <p className="text-slate-500 mt-1">العام الأكاديمي 2025/2026</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative w-72">
          <Input
            placeholder="بحث بالاسم أو البريد الإلكتروني..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-right"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <table className="data-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الدور الوظيفي</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>{getStatusBadge(user.status, user.statusLabel)}</td>
                  <td>
                    <Button 
                      variant="link" 
                      className="text-sky-600 p-0"
                    >
                      إدارة
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

       {/* Pagination */}
       <div className="flex items-center justify-between">
         <p className="text-sm text-slate-500">عرض 4 من إجمالي 4 مستخدمين</p>
         <div className="flex items-center gap-2">
           <Button
             variant="outline"
             size="icon"
             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
             disabled={currentPage === 1}
           >
             <ChevronRight className="w-4 h-4" />
           </Button>
           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
             <Button
               key={page}
               variant={currentPage === page ? 'default' : 'outline'}
               size="sm"
               onClick={() => setCurrentPage(page)}
               className={currentPage === page ? 'bg-sky-500 hover:bg-sky-600' : ''}
             >
               {page}
             </Button>
           ))}
           <Button
             variant="outline"
             size="icon"
             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
             disabled={currentPage === totalPages}
           >
             <ChevronLeft className="w-4 h-4" />
           </Button>
         </div>
       </div>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة مستخدم جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-700 block mb-2">الاسم الكامل</label>
              <Input placeholder="أدخل الاسم الكامل" className="text-right" />
            </div>
            <div>
              <label className="text-sm text-slate-700 block mb-2">البريد الإلكتروني</label>
              <Input placeholder="example@minia.edu.eg" className="text-right" type="email" />
            </div>
            <div>
              <label className="text-sm text-slate-700 block mb-2">الدور الوظيفي</label>
              <Select>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر الدور الوظيفي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">إداري</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                  <SelectItem value="finance">مالي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-700 block mb-2">كلمة المرور</label>
              <Input placeholder="********" type="password" className="text-right" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setAddUserOpen(false)}
              >
                إلغاء
              </Button>
              <Button 
                className="flex-1 bg-sky-500 hover:bg-sky-600"
                onClick={() => setAddUserOpen(false)}
              >
                إضافة المستخدم
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
