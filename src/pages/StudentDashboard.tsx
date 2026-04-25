import { Bell, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function StudentDashboard() {
  const notifications = [
    {
      id: 1,
      message: 'بداية التسكين للعام الدراسي الجديد ستكون في سبتمبر 2025.',
      date: '2025/10/15',
      type: 'info',
    },
  ];

  const feeInfo = {
    status: 'في انتظار سداد الرسوم المقررة للفصل الدراسي الأول 2025.',
    housingStatus: 'تم قبول طلب حجز الغرفة بنجاح للعام 2025 / 2026.',
    currentStatus: 'في انتظار',
  };

  const currentFee = {
    academicYear: '2025 / 2026',
    building: 'مبنى أ',
    lastUpdate: '2025/10/15',
    status: 'نشط',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">لوحة تحكم الطالب</h1>
        <p className="text-slate-500 mt-1">جامعة المنيا - الإدارة العامة للمدن الجامعية للعام الأكاديمي 2025 / 2026</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-right text-lg flex items-center justify-end gap-2">
              <Bell className="w-5 h-5 text-slate-400" />
              الإشعارات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">{notification.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Housing & Fee Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-right text-lg flex items-center justify-end gap-2">
              <Info className="w-5 h-5 text-sky-500" />
              حالة الطلب والرسوم
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">حالة السكن:</p>
              <p className="text-slate-700">{feeInfo.housingStatus}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">الوضع المالي:</p>
              <p className="text-amber-600">{feeInfo.status}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Fee Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-right text-lg">بيانات القيد الحالية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-right">
              <label className="text-sm text-slate-500 block">العام الأكاديمي</label>
              <p className="font-medium text-slate-800">{currentFee.academicYear}</p>
            </div>
            <div className="text-right">
              <label className="text-sm text-slate-500 block">المبنى</label>
              <p className="font-medium text-slate-800">{currentFee.building}</p>
            </div>
            <div className="text-right">
              <label className="text-sm text-slate-500 block">تاريخ التحديث</label>
              <p className="font-medium text-slate-800">{currentFee.lastUpdate}</p>
            </div>
            <div className="text-right">
              <label className="text-sm text-slate-500 block">حالة القيد</label>
              <Badge className="bg-emerald-100 text-emerald-700">
                <span className="w-2 h-2 bg-emerald-500 rounded-full ml-2"></span>
                {currentFee.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
