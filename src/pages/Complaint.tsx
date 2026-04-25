import { useState } from 'react';
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

export function Complaint() {
  const [formData, setFormData] = useState({
    fullName: 'محمد نادي رمضان',
    studentId: '20230145',
    email: 'student@minia.edu.eg',
    phone: '01xxxxxxxxx',
    complaintType: '',
    building: '',
    roomNumber: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // محاكاة تقديم النموذج
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: 'محمد نادي رمضان',
        studentId: '20230145',
        email: 'student@minia.edu.eg',
        phone: '01xxxxxxxxx',
        complaintType: '',
        building: '',
        roomNumber: '',
        description: '',
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">تقديم شكوى</h1>
        <p className="text-slate-500 mt-1">تقديم شكوى رسمية متعلقة بالإقامة أو الخدمات</p>
        <p className="text-slate-400 text-sm">العام الأكاديمي 2025/2026 - جامعة المنيا</p>
      </div>

      <Card>
        <CardContent className="p-6">
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-2">تم تقديم الشكوى بنجاح</h3>
              <p className="text-emerald-700">سيتم مراجعة شكواك من قبل الإدارة في أقرب وقت ممكن</p>
              <p className="text-sm text-emerald-600 mt-3">رقم الشكوى: #20251024-001</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">البيانات الشخصية</h3>
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
                    <label className="text-sm text-slate-700 block mb-2">الرقم الجامعي</label>
                    <Input
                      value={formData.studentId}
                      readOnly
                      className="text-right bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="text-right">
                    <label className="text-sm text-slate-700 block mb-2">البريد الإلكتروني</label>
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
              </div>

              {/* Complaint Info */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">بيانات الشكوى</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-right">
                    <label className="text-sm text-slate-700 block mb-2">نوع الشكوى</label>
                    <Select value={formData.complaintType} onValueChange={(value) => handleChange('complaintType', value)}>
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="اختر نوع الشكوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance">مشاكل الصيانة</SelectItem>
                        <SelectItem value="service">جودة الخدمات</SelectItem>
                        <SelectItem value="behavior">السلوك والعلاقات</SelectItem>
                        <SelectItem value="food">جودة الطعام والتغذية</SelectItem>
                        <SelectItem value="cleanliness">النظافة والصحة</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-right">
                    <label className="text-sm text-slate-700 block mb-2">المبنى</label>
                    <Select value={formData.building} onValueChange={(value) => handleChange('building', value)}>
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
                </div>

                <div className="text-right mt-6">
                  <label className="text-sm text-slate-700 block mb-2">رقم الغرفة (اختياري)</label>
                  <Input
                    placeholder="أدخل رقم الغرفة إن وجد"
                    value={formData.roomNumber}
                    onChange={(e) => handleChange('roomNumber', e.target.value)}
                    className="text-right"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="text-right">
                <label className="text-sm text-slate-700 block mb-2">تفاصيل الشكوى</label>
                <textarea
                  placeholder="اكتب تفاصيل الشكوى بوضوح..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-right resize-vertical"
                  rows={6}
                  required
                />
                <p className="text-xs text-slate-500 mt-1">الحد الأدنى: 10 أحرف</p>
              </div>

              {/* Info Alert */}
              <div className="bg-sky-50 border-r-4 border-sky-500 rounded-lg p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-sky-700">
                  ستتم معالجة شكواك من قبل إدارة المدينة الجامعية خلال 3 أيام عمل. سيتم الرد عليك عبر البريد الإلكتروني أو الهاتف.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="bg-sky-500 hover:bg-sky-600 gap-2 px-8" disabled={!formData.complaintType || !formData.building || !formData.description}>
                  <Send className="w-4 h-4" />
                  تقديم الشكوى
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

