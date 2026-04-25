import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface HousingRequest {
  id: string;
  studentName: string;
  building: string;
  roomNumber: string;
  requestDate: string;
  status: 'new' | 'pending' | 'approved' | 'rejected';
  statusLabel: string;
}

export function HousingRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const requests: HousingRequest[] = [
    { id: '#8742', studentName: 'أحمد محمد علي', building: 'مبنى أ', roomNumber: '102', requestDate: '12 أكتوبر 2025', status: 'new', statusLabel: 'جديد' },
    { id: '#8741', studentName: 'سارة محمود حسن', building: 'مبنى ج', roomNumber: '305', requestDate: '11 أكتوبر 2025', status: 'pending', statusLabel: 'قيد التنفيذ' },
    { id: '#8740', studentName: 'خالد إبراهيم', building: 'مبنى ب', roomNumber: '210', requestDate: '10 أكتوبر 2025', status: 'approved', statusLabel: 'تم التنفيذ' },
    { id: '#8739', studentName: 'منى يوسف', building: 'مبنى د', roomNumber: '404', requestDate: '09 أكتوبر 2025', status: 'pending', statusLabel: 'قيد التنفيذ' },
    { id: '#8738', studentName: 'عمر ياسين', building: 'مبنى أ', roomNumber: '115', requestDate: '08 أكتوبر 2025', status: 'new', statusLabel: 'جديد' },
  ];

  const getStatusBadge = (status: string, label: string) => {
    const statusClasses: Record<string, string> = {
      new: 'status-new',
      pending: 'status-pending',
      approved: 'status-approved',
      rejected: 'status-rejected',
    };
    return <Badge className={statusClasses[status] || 'bg-slate-100'}>{label}</Badge>;
  };

  const filteredRequests = requests.filter(req =>
    req.studentName.includes(searchTerm) || req.id.includes(searchTerm)
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">طلبات التسكين</h1>
        <p className="text-slate-500 mt-1">العام الأكاديمي 2025/2026</p>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="بحث باسم الطالب أو رقم الطلب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 text-right"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <table className="data-table">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>اسم الطالب</th>
                <th>المبنى</th>
                <th>رقم الغرفة</th>
                <th>تاريخ التقديم</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="font-medium">{request.id}</td>
                  <td>{request.studentName}</td>
                  <td>{request.building}</td>
                  <td>{request.roomNumber}</td>
                  <td>{request.requestDate}</td>
                  <td>{getStatusBadge(request.status, request.statusLabel)}</td>
                  <td>
                    <Link to={`/housing-requests/${request.id.replace('#', '')}`}>
                      <Button variant="link" className="text-sky-600 p-0">
                        عرض التفاصيل
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

       {/* Pagination */}
       <div className="flex items-center justify-center gap-2">
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
  );
}
