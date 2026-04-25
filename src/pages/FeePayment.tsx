import { CreditCard, CheckCircle, Info, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function FeePayment() {
  const paymentCode = '123456';

  const studentInfo = {
    name: 'محمد نادي رمضان',
    universityId: '2025001',
    housingType: 'سكن عادي',
    amount: '1500',
    currency: 'جنيه مصري',
    status: 'غير مسدد',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">سداد رسوم السكن</h1>
        <p className="text-slate-500 mt-1">العام الأكاديمي 2025 / 2026</p>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="font-medium text-slate-800">{studentInfo.name}</span>
              <span className="text-slate-500 text-sm">اسم الطالب</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="font-medium text-slate-800">{studentInfo.universityId}</span>
              <span className="text-slate-500 text-sm">الرقم الجامعي</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="font-medium text-slate-800">{studentInfo.housingType}</span>
              <span className="text-slate-500 text-sm">نوع السكن</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="font-medium text-slate-800">{studentInfo.amount} {studentInfo.currency}</span>
              <span className="text-slate-500 text-sm">القيمة</span>
            </div>
            <div className="flex justify-between items-center">
              <Badge className="bg-red-100 text-red-700">{studentInfo.status}</Badge>
              <span className="text-slate-500 text-sm">حالة السداد</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right text-lg">طرق السداد المتاحة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fawry */}
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-slate-800">بطاقة خدمة فوري</h3>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-sky-600 font-bold text-xl tracking-wider">{paymentCode}</span>
                <span className="text-slate-500 text-sm">كود الدفع:</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 text-right">
              توجه لأي منفذ فوري واستخدم كود الدفع الموضح أعلاه لإتمام العملية.
            </p>
          </div>

          {/* Electronic Payment */}
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800">السداد الإلكتروني المعتمد</h3>
            </div>
            <p className="text-sm text-slate-500 text-right">
              يمكنك السداد مباشرة باستخدام بطاقات ميزة، فيزا أو ماستركارد من خلال بوابة الدفع الإلكتروني.
            </p>
          </div>

          {/* Pay Button */}
          <Button className="w-full bg-sky-500 hover:bg-sky-600 gap-2 py-6">
            <CheckCircle className="w-5 h-5" />
            سداد الرسوم
          </Button>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-sky-700">
          بعد إتمام عملية السداد، يمكنك متابعة حالة الطلب من خلال الصفحة الرئيسية.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400">
        الإدارة العامة للمدن الجامعية
      </div>
    </div>
  );
}
