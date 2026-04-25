import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
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

interface RoomAssignment {
  id: string;
  studentName: string;
  universityId: string;
  college: string;
  building: string;
  roomNumber: string;
  roomType: string;
  status: 'occupied' | 'pending' | 'available';
  statusLabel: string;
}

export function RoomDistribution() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [transferOpen, setTransferOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<RoomAssignment | null>(null);

  const stats = [
    { label: 'إجمالي الغرف', value: '1,200', color: 'text-slate-700' },
    { label: 'الغرف المشغولة', value: '850', color: 'text-emerald-600' },
    { label: 'الغرف الشاغرة', value: '350', color: 'text-sky-600' },
    { label: 'طلبات التحويل القائمة', value: '42', color: 'text-amber-600' },
  ];

  const assignments: RoomAssignment[] = [
    { id: '1', studentName: 'أحمد محمد علي', universityId: '20230145', college: 'الهندسة', building: 'مبنى أ', roomNumber: '302', roomType: 'مزدوجة', status: 'occupied', statusLabel: 'مقيم' },
    { id: '2', studentName: 'ياسين إبراهيم حسن', universityId: '20220589', college: 'الطب', building: 'مبنى ج', roomNumber: '105', roomType: 'فردية', status: 'pending', statusLabel: 'بانتظار تحويل' },
    { id: '3', studentName: 'محمود حسن كمال', universityId: '20210023', college: 'الحاسبات', building: 'مبنى ب', roomNumber: '412', roomType: 'مزدوجة', status: 'occupied', statusLabel: 'محوّل' },
    { id: '4', studentName: 'سليم عبدالله رجب', universityId: '20231122', college: 'التربية', building: 'مبنى أ', roomNumber: '208', roomType: 'ثلاثية', status: 'occupied', statusLabel: 'مقيم' },
  ];

  const getStatusBadge = (status: string, label: string) => {
    const statusClasses: Record<string, string> = {
      occupied: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      available: 'bg-sky-100 text-sky-700',
    };
    return <Badge className={statusClasses[status] || 'bg-slate-100'}>{label}</Badge>;
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.studentName.includes(searchTerm) || assignment.universityId.includes(searchTerm)
  );

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);

  const handleTransfer = (assignment: RoomAssignment) => {
    setSelectedAssignment(assignment);
    setTransferOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">توزيع وتحويل الغرف</h1>
        <p className="text-slate-500 mt-1">العام الأكاديمي 2025/2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-4 text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="بحث باسم الطالب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 text-right"
          />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">جدول توزيع الطلبة</h2>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>الرقم الجامعي</th>
                <th>الكلية</th>
                <th>المبنى</th>
                <th>رقم الغرفة</th>
                <th>نوع الغرفة</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.studentName}</td>
                  <td>{assignment.universityId}</td>
                  <td>{assignment.college}</td>
                  <td>{assignment.building}</td>
                  <td>{assignment.roomNumber}</td>
                  <td>{assignment.roomType}</td>
                  <td>{getStatusBadge(assignment.status, assignment.statusLabel)}</td>
                  <td>
                    <Button 
                      size="sm"
                      className="bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleTransfer(assignment)}
                    >
                      تحويل غرفة
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
         <p className="text-sm text-slate-500">عرض 4 من أصل 850 طالب</p>
         <div className="flex items-center gap-2">
           <Button
             variant="outline"
             size="icon"
             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
             disabled={currentPage === 1}
           >
             <ChevronLeft className="w-4 h-4" />
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
             <ChevronRight className="w-4 h-4" />
           </Button>
         </div>
       </div>

      {/* Transfer Dialog */}
      <Dialog open={transferOpen} onOpenChange={setTransferOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">تحويل غرفة الطالب</DialogTitle>
          </DialogHeader>
          {selectedAssignment && (
            <div className="space-y-4">
              {/* Current Info */}
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-right">
                    <label className="text-xs text-slate-500 block">اسم الطالب</label>
                    <p className="font-medium">{selectedAssignment.studentName}</p>
                  </div>
                  <div className="text-right">
                    <label className="text-xs text-slate-500 block">الرقم الجامعي</label>
                    <p className="font-medium">{selectedAssignment.universityId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-right">
                    <label className="text-xs text-slate-500 block">المبنى الحالي</label>
                    <p className="font-medium">{selectedAssignment.building}</p>
                  </div>
                  <div className="text-right">
                    <label className="text-xs text-slate-500 block">رقم الغرفة الحالية</label>
                    <p className="font-medium">{selectedAssignment.roomNumber}</p>
                  </div>
                </div>
              </div>

              {/* New Selection */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-700 block mb-2">اختيار المبنى الجديد</label>
                  <Select>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر المبنى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">مبنى أ</SelectItem>
                      <SelectItem value="B">مبنى ب</SelectItem>
                      <SelectItem value="C">مبنى ج</SelectItem>
                      <SelectItem value="D">مبنى د</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-slate-700 block mb-2">اختيار الغرفة الجديدة</label>
                  <Select>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الغرفة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="101">101</SelectItem>
                      <SelectItem value="102">102</SelectItem>
                      <SelectItem value="103">103</SelectItem>
                      <SelectItem value="104">104</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setTransferOpen(false)}
                >
                  إلغاء
                </Button>
                <Button 
                  className="flex-1 bg-sky-500 hover:bg-sky-600"
                  onClick={() => setTransferOpen(false)}
                >
                  تأكيد التحويل
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
