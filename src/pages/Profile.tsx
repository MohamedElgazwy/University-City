import { UserCircle, GraduationCap, CheckCircle, Info } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function Profile() {
  const studentInfo = {
    name: 'محمد نادي رمضان',
    universityId: '3010124*****',
    email: 'm.nadi@minia.edu.eg',
    phone: '01012345678',
    gender: 'ذكر',
    housingStatus: 'نشط - مسكن حالياً',
    college: 'كلية الحاسبات والمعلومات',
    academicYear: 'الفرقة الرابعة',
    governorate: 'المنيا',
    center: 'ديرمواس',
    academicYearLabel: '2025/2026',
    room: 'مبنى أ',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">الملف الشخصي</h1>
        <p className="text-slate-500 mt-1">عرض وإدارة بياناتك المسجلة في النظام</p>
      </div>

      {/* Profile Header Card */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-sky-400 to-sky-500 rounded-t-2xl"></div>
        <div className="bg-white rounded-b-2xl shadow-sm p-6 pt-16 relative">
          <div className="absolute -top-12 right-8">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-sky-100 text-sky-600 text-3xl">
                {studentInfo.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-sky-500" />
                البيانات الشخصية
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-800">{studentInfo.name}</span>
                  <span className="text-slate-500 text-sm">الاسم الكامل</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-800">{studentInfo.universityId}</span>
                  <span className="text-slate-500 text-sm">الرقم القومي</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-sky-600">{studentInfo.email}</span>
                  <span className="text-slate-500 text-sm">البريد الجامعي</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-800">{studentInfo.phone}</span>
                  <span className="text-slate-500 text-sm">رقم الهاتف</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">{studentInfo.gender}</span>
                  <span className="text-slate-500 text-sm">النوع</span>
                </div>
              </div>
            </div>

            {/* Academic Info */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sky-500" />
                البيانات الأكاديمية والسكن
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-800">{studentInfo.college}</span>
                  <span className="text-slate-500 text-sm">الكلية</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-800">{studentInfo.academicYear}</span>
                  <span className="text-slate-500 text-sm">السنة الدراسية</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-800">{studentInfo.governorate}</span>
                  <span className="text-slate-500 text-sm">المحافظة</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-800">{studentInfo.center}</span>
                  <span className="text-slate-500 text-sm">المركز</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {studentInfo.housingStatus}
                  </Badge>
                  <span className="text-slate-500 text-sm">حالة السكن</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          هذه البيانات مسجلة وفقاً لسجلات الجامعة، وفي حالة وجود خطأ يرجى التواصل مع شئون الطلبة.
        </p>
      </div>
    </div>
  );
}
