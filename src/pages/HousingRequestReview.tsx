import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  User, 
  Home, 
  Building2,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function HousingRequestReview() {
  const { id } = useParams();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const requestData = {
    id: id || '10243-2026',
    status: 'pending',
    statusLabel: 'قيد المراجعة',
    academicYear: '2026',
    student: {
      fullName: 'أحمد محمود عبد الرحمن',
      universityId: '21045620',
      college: 'كلية الهندسة',
      academicYear: 'الفرقة الثالثة',
      governorate: 'المنيا',
      center: 'مغاغة',
      email: 'ahmed.m@minia.edu.eg',
      phone: '+20 101 234 5678',
    },
    housingRequest: {
      roomType: 'غرفة مشتركة (ثنائي)',
      notes: 'أرجو أن تكون الغرفة في مبنى قريب من كلية الهندسة نظراً للمحاضرات المبكرة، وإذا أمكن التواجد مع زميلي كود طالب 21045650.',
    },
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/dashboard" className="hover:text-sky-600">الرئيسية</Link>
        <ChevronLeft className="w-4 h-4" />
        <Link to="/housing-requests" className="hover:text-sky-600">طلبات التسكين</Link>
        <ChevronLeft className="w-4 h-4" />
        <span>تفاصيل الطلب</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <Badge className="status-pending text-sm px-3 py-1">
          <span className="w-2 h-2 bg-current rounded-full ml-2"></span>
          {requestData.statusLabel}
        </Badge>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-slate-800">تفاصيل طلب التسكين</h1>
          <p className="text-slate-500 mt-1">
            طلب رقم #{requestData.id} | العام الأكاديمي {requestData.academicYear}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-right text-lg flex items-center justify-end gap-2">
              <User className="w-5 h-5 text-sky-500" />
              بيانات الطالب الشخصية والأكاديمية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-right">
                <label className="text-sm text-slate-500 block">الاسم الكامل</label>
                <p className="font-medium text-slate-800">{requestData.student.fullName}</p>
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-500 block">الرقم الجامعي</label>
                <p className="font-medium text-slate-800">{requestData.student.universityId}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-right">
                <label className="text-sm text-slate-500 block">الكلية</label>
                <p className="font-medium text-slate-800">{requestData.student.college}</p>
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-500 block">السنة الدراسية</label>
                <p className="font-medium text-slate-800">{requestData.student.academicYear}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-right">
                <label className="text-sm text-slate-500 block">المحافظة</label>
                <p className="font-medium text-slate-800">{requestData.student.governorate}</p>
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-500 block">المركز</label>
                <p className="font-medium text-slate-800">{requestData.student.center}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-right">
                <label className="text-sm text-slate-500 block">البريد الإلكتروني</label>
                <p className="font-medium text-slate-800">{requestData.student.email}</p>
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-500 block">رقم الهاتف</label>
                <p className="font-medium text-slate-800">{requestData.student.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Housing Request Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-right text-lg flex items-center justify-end gap-2">
              <Home className="w-5 h-5 text-sky-500" />
              بيانات طلب التسكين
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-right">
              <label className="text-sm text-slate-500 block">نوع الغرفة المطلوب</label>
              <p className="font-medium text-slate-800">{requestData.housingRequest.roomType}</p>
            </div>
            <div className="text-right">
              <label className="text-sm text-slate-500 block">ملاحظات إضافية من الطالب</label>
              <div className="bg-slate-50 p-3 rounded-lg mt-1">
                <p className="text-slate-700 text-sm">{requestData.housingRequest.notes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Administrative Decision */}
      <Card className="border-sky-200">
        <CardHeader>
          <CardTitle className="text-right text-lg flex items-center justify-end gap-2">
            <Building2 className="w-5 h-5 text-sky-500" />
            اتخاذ القرار الإداري
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-sky-700">
              عند قبول الطلب، سيتم تحويلك تلقائياً إلى شاشة "توزيع الغرف" لاختيار المبنى والغرفة المناسبة للطالب بناءً على تفضيلاته وتوافر الأماكن.
            </p>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50 gap-2"
              onClick={() => setShowRejectDialog(true)}
            >
              <XCircle className="w-4 h-4" />
              رفض طلب التسكين
            </Button>
            <Button 
              className="flex-1 bg-sky-500 hover:bg-sky-600 gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              قبول الطلب والتسكين
            </Button>
          </div>

          <div className="text-center">
            <Button variant="link" className="text-red-600 text-sm">
              سبب الرفض (إلزامي في حال الرفض)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">سبب رفض الطلب</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-500 text-right">
              يرجى كتابة سبب الرفض ليتم إرساله في إشعار للطالب...
            </p>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="اكتب سبب الرفض هنا..."
              className="text-right min-h-[100px]"
            />
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowRejectDialog(false)}
              >
                إلغاء
              </Button>
              <Button 
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={() => setShowRejectDialog(false)}
              >
                تأكيد الرفض
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="text-center text-sm text-slate-400 pt-4 border-t border-slate-200">
        جميع الحقوق محفوظة © جامعة المنيا - قطاع المدن الجامعية 2026
      </div>
    </div>
  );
}
