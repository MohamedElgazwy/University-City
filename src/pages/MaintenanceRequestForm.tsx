import { Send, Camera, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function MaintenanceRequestForm() {
  const formData = {
    roomNumber: '302',
    building: 'مبنى 4 (أ)',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">طلب صيانة</h1>
        <p className="text-slate-500 mt-1">
          يرجى ملء البيانات التالية لتقديم طلب صيانة للغرفة. سيتم معالجة طلبك من قبل فريق الصيانة المختص.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-6">
            {/* Room Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">رقم المبنى</label>
                <Input 
                  value={formData.building}
                  readOnly
                  className="text-right bg-slate-50"
                />
              </div>
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">رقم الغرفة</label>
                <Input 
                  value={formData.roomNumber}
                  readOnly
                  className="text-right bg-slate-50"
                />
              </div>
            </div>

            {/* Issue Type */}
            <div className="text-right">
              <label className="text-sm text-slate-700 block mb-2">نوع العطل</label>
              <Select>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر نوع العطل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">سباكة</SelectItem>
                  <SelectItem value="electrical">كهرباء</SelectItem>
                  <SelectItem value="carpentry">نجارة</SelectItem>
                  <SelectItem value="painting">دهانات</SelectItem>
                  <SelectItem value="ac">تكييف</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="text-right">
              <label className="text-sm text-slate-700 block mb-2">وصف المشكلة</label>
              <Textarea 
                placeholder="يرجى كتابة تفاصيل العطل بدقة..."
                className="text-right min-h-[120px]"
              />
            </div>

            {/* Image Upload */}
            <div className="text-right">
              <label className="text-sm text-slate-700 block mb-2">إرفاق صورة (اختياري)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-slate-500 text-sm">انقر لتحميل صورة العطل</p>
              </div>
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

      {/* Info Alert */}
      <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-sky-700">
          يمكنك متابعة حالة الطلب من خلال الصفحة الرئيسية.
        </p>
      </div>
    </div>
  );
}
