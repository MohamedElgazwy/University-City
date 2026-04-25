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

interface MaintenanceRequest {
  id: string;
  studentName: string;
  building: string;
  roomNumber: string;
  issueType: string;
  requestDate: string;
  status: 'new' | 'pending' | 'inProgress' | 'completed';
  statusLabel: string;
  description?: string;
}

export function MaintenanceRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const requests: MaintenanceRequest[] = [
    { id: '#101', studentName: 'أحمد محمد علي', building: 'مبنى أ', roomNumber: '204', issueType: 'سباكة', requestDate: '2025/10/01', status: 'new', statusLabel: 'جديد', description: 'وجود تسريب مياه في صنبور الحمام الرئيسي للغرفة مما يسبب تراكم المياه على الأرضية بشكل مستمر.' },
    { id: '#102', studentName: 'سارة محمود حسن', building: 'مبنى ب', roomNumber: '115', issueType: 'كهرباء', requestDate: '2025/10/02', status: 'pending', statusLabel: 'قيد التنفيذ', description: 'انقطاع الكهرباء في الغرفة بشكل متكرر.' },
    { id: '#103', studentName: 'خالد إبراهيم', building: 'مبنى ج', roomNumber: '302', issueType: 'نجارة', requestDate: '2025/10/03', status: 'completed', statusLabel: 'تم التنفيذ', description: 'كسر في باب الخزانة.' },
    { id: '#104', studentName: 'منى يوسف', building: 'مبنى أ', roomNumber: '408', issueType: 'تكييف', requestDate: '2025/10/04', status: 'pending', statusLabel: 'قيد التنفيذ', description: 'التكييف لا يعمل بشكل جيد.' },
  ];

  const getStatusBadge = (status: string, label: string) => {
    const statusClasses: Record<string, string> = {
      new: 'status-new',
      pending: 'status-pending',
      inProgress: 'status-under-review',
      completed: 'status-approved',
    };
    return <Badge className={statusClasses[status] || 'bg-slate-100'}>{label}</Badge>;
  };

  const filteredRequests = requests.filter(req =>
    req.studentName.includes(searchTerm) || req.id.includes(searchTerm)
  );

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const handleViewDetails = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">طلبات الصيانة</h1>
        <p className="text-slate-500 mt-1">متابعة طلبات الصيانة للعام الأكاديمي 2025/2026</p>
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
                <th>نوع العطل</th>
                <th>تاريخ الطلب</th>
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
                  <td>{request.issueType}</td>
                  <td>{request.requestDate}</td>
                  <td>{getStatusBadge(request.status, request.statusLabel)}</td>
                  <td>
                    <Button 
                      variant="link" 
                      className="text-sky-600 p-0"
                      onClick={() => handleViewDetails(request)}
                    >
                      تنفيذ الطلب
                    </Button>
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

      {/* Request Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">تفاصيل طلب الصيانة</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">رقم الطلب:</span>
                  <span className="font-medium">{selectedRequest.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">اسم الطالب:</span>
                  <span className="font-medium">{selectedRequest.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">المبنى:</span>
                  <span className="font-medium">{selectedRequest.building}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">رقم الغرفة:</span>
                  <span className="font-medium">{selectedRequest.roomNumber}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-500 block mb-2">تفاصيل العطل:</label>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-slate-700 text-sm">{selectedRequest.description}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-500 block mb-2">تحديث حالة الطلب:</label>
                <div className="flex gap-2">
                  <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-right">
                    <option>قيد التنفيذ</option>
                    <option>تم التنفيذ</option>
                    <option>جديد</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setDetailOpen(false)}
                >
                  إغلاق
                </Button>
                <Button 
                  className="flex-1 bg-sky-500 hover:bg-sky-600"
                  onClick={() => setDetailOpen(false)}
                >
                  تحديث الحالة
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
