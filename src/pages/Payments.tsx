import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, CreditCard, CheckCircle, XCircle } from 'lucide-react';
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

interface Payment {
  id: string;
  studentName: string;
  universityId: string;
  feeType: string;
  amount: string;
  paymentMethod: string;
  paymentDate: string;
  status: 'paid' | 'pending' | 'delayed';
  statusLabel: string;
  transactionId?: string;
}

export function Payments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const payments: Payment[] = [
    { id: '2025001', studentName: 'أحمد محمد علي', universityId: '2025001', feeType: 'رسوم إقامة', amount: '1,500', paymentMethod: 'فوري', paymentDate: '2025-10-01', status: 'paid', statusLabel: 'مدفوع', transactionId: 'TRANS-987654' },
    { id: '2025002', studentName: 'سارة محمود حسن', universityId: '2025002', feeType: 'رسوم تغذية', amount: '500', paymentMethod: 'بطاقة بنكية', paymentDate: '2025-10-02', status: 'pending', statusLabel: 'قيد المراجعة' },
    { id: '2025003', studentName: 'ياسين إبراهيم', universityId: '2025003', feeType: 'رسوم إقامة', amount: '1,500', paymentMethod: 'فوري', paymentDate: '2025-09-28', status: 'delayed', statusLabel: 'متأخر' },
    { id: '2025004', studentName: 'ليلى يوسف', universityId: '2025004', feeType: 'رسوم تأمين', amount: '200', paymentMethod: 'بطاقة بنكية', paymentDate: '2025-10-05', status: 'paid', statusLabel: 'مدفوع', transactionId: 'TRANS-987655' },
    { id: '2025005', studentName: 'عمر خالد', universityId: '2025005', feeType: 'رسوم إقامة', amount: '1,500', paymentMethod: 'فوري', paymentDate: '2025-10-03', status: 'pending', statusLabel: 'قيد المراجعة' },
  ];

  const getStatusBadge = (status: string, label: string) => {
    const statusClasses: Record<string, string> = {
      paid: 'status-paid',
      pending: 'status-pending',
      delayed: 'status-delayed',
    };
    return <Badge className={statusClasses[status] || 'bg-slate-100'}>{label}</Badge>;
  };

  const getFeeTypeBadge = (type: string) => {
    const typeClasses: Record<string, string> = {
      'رسوم إقامة': 'bg-blue-100 text-blue-700',
      'رسوم تغذية': 'bg-amber-100 text-amber-700',
      'رسوم تأمين': 'bg-purple-100 text-purple-700',
    };
    return <span className={`px-2 py-1 rounded text-xs ${typeClasses[type] || 'bg-slate-100'}`}>{type}</span>;
  };

  const filteredPayments = payments.filter(payment =>
    payment.studentName.includes(searchTerm) || payment.id.includes(searchTerm)
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">المدفوعات</h1>
        <p className="text-slate-500 mt-1">إدارة مدفوعات الطلاب للعام الأكاديمي 2025/2026</p>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="بحث باسم الطالب أو الرقم..."
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
                <th>اسم الطالب</th>
                <th>الرقم الجامعي</th>
                <th>نوع الرسوم</th>
                <th>المبلغ</th>
                <th>طريقة الدفع</th>
                <th>تاريخ الدفع</th>
                <th>حالة الدفع</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.studentName}</td>
                  <td>{payment.universityId}</td>
                  <td>{getFeeTypeBadge(payment.feeType)}</td>
                  <td className="font-medium">{payment.amount} ج.م</td>
                  <td>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs">
                      <CreditCard className="w-3 h-3" />
                      {payment.paymentMethod}
                    </span>
                  </td>
                  <td>{payment.paymentDate}</td>
                  <td>{getStatusBadge(payment.status, payment.statusLabel)}</td>
                  <td>
                    <Button 
                      variant="link" 
                      className="text-sky-600 p-0"
                      onClick={() => handleViewDetails(payment)}
                    >
                      عرض التفاصيل
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

      {/* Payment Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">تفاصيل عملية الدفع</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              {/* Student Info */}
              <div>
                <h4 className="text-sm font-medium text-sky-600 mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-sky-500 rounded"></span>
                  بيانات الطالب
                </h4>
                <div className="bg-slate-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">الاسم:</span>
                    <span className="font-medium">{selectedPayment.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">الرقم الجامعي:</span>
                    <span className="font-medium">{selectedPayment.universityId}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h4 className="text-sm font-medium text-sky-600 mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-sky-500 rounded"></span>
                  بيانات الدفع
                </h4>
                <div className="bg-slate-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">نوع الرسوم:</span>
                    <span className="font-medium">{selectedPayment.feeType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">المبلغ:</span>
                    <span className="font-medium">{selectedPayment.amount} ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">طريقة الدفع:</span>
                    <span className="font-medium">{selectedPayment.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">تاريخ الدفع:</span>
                    <span className="font-medium">{selectedPayment.paymentDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">حالة الدفع:</span>
                    {getStatusBadge(selectedPayment.status, selectedPayment.statusLabel)}
                  </div>
                </div>
              </div>

              {/* Payment Proof */}
              {selectedPayment.transactionId && (
                <div>
                  <h4 className="text-sm font-medium text-sky-600 mb-2 flex items-center gap-2">
                    <span className="w-1 h-4 bg-sky-500 rounded"></span>
                    إثبات الدفع
                  </h4>
                  <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-700">رقم العملية: {selectedPayment.transactionId}</p>
                    <Button variant="link" className="text-sky-600 text-sm">
                      عرض صورة الإيصال
                    </Button>
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedPayment.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 ml-2" />
                    رفض العملية
                  </Button>
                  <Button 
                    className="flex-1 bg-sky-500 hover:bg-sky-600"
                  >
                    <CheckCircle className="w-4 h-4 ml-2" />
                    تأكيد الدفع
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
