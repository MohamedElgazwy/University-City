import { Send, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function RoomBooking() {
  const formData = {
    fullName: 'محمد نادي رمضان',
    nationalId: '2XXXXXXXXXXXXX',
    phone: '01xxxxxxxxx',
    email: 'student@minia.edu.eg',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">تقديم طلب حجز غرفة</h1>
        <p className="text-slate-500 mt-1">العام الأكاديمي 2025/2026 - جامعة المنيا</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">الاسم الكامل</label>
                <Input 
                  value={formData.fullName}
                  readOnly
                  className="text-right bg-slate-50"
                />
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">الرقم القومي</label>
                <Input 
                  value={formData.nationalId}
                  readOnly
                  className="text-right bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">البريد الإلكتروني الجامعي</label>
                <Input 
                  value={formData.email}
                  readOnly
                  className="text-right bg-slate-50"
                />
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">رقم الهاتف</label>
                <Input 
                  value={formData.phone}
                  readOnly
                  className="text-right bg-slate-50"
                />
              </div>
            </div>

            {/* Academic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">النوع</label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">الكلية</label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر الكلية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">كلية الهندسة</SelectItem>
                    <SelectItem value="medicine">كلية الطب</SelectItem>
                    <SelectItem value="computers">كلية الحاسبات</SelectItem>
                    <SelectItem value="education">كلية التربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">المحافظة</label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر المحافظة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minia">المنيا</SelectItem>
                    <SelectItem value="assiut">أسيوط</SelectItem>
                    <SelectItem value="sohag">سوهاج</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">السنة الدراسية</label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر السنة الدراسية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">الفرقة الأولى</SelectItem>
                    <SelectItem value="2">الفرقة الثانية</SelectItem>
                    <SelectItem value="3">الفرقة الثالثة</SelectItem>
                    <SelectItem value="4">الفرقة الرابعة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">نوع الغرفة</label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر نوع الغرفة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">فردية</SelectItem>
                    <SelectItem value="double">ثنائية (مشتركة)</SelectItem>
                    <SelectItem value="triple">ثلاثية (مشتركة)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">المركز</label>
                <Input placeholder="أدخل اسم المركز" className="text-right" />
              </div>
            </div>

            {/* Info Alert */}
            <div className="bg-sky-50 border-r-4 border-sky-500 rounded-lg p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-sky-700">
                يتم تسجيل الطلب إلكترونياً عبر النظام، وتقوم إدارة المدينة الجامعية بمراجعة الطلب وتحديث حالته لاحقاً.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button className="bg-sky-500 hover:bg-sky-600 gap-2 px-8">
                <Send className="w-4 h-4" />
                تقديم الطلب
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
