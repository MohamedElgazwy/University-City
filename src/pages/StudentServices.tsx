import { Link } from 'react-router-dom';
import { BedDouble, Megaphone, Wrench, CreditCard, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function StudentServices() {
  const services = [
    {
      icon: BedDouble,
      title: 'حجز غرفة',
      description: 'تقديم طلب حجز غرفة بالمدينة الجامعية أو متابعة حالة الطلب الحالي للموسم الدراسي 2025/2026.',
      link: '/room-booking',
      color: 'bg-sky-100 text-sky-600',
    },
    {
      icon: Wrench,
      title: 'طلب صيانة',
      description: 'الإبلاغ عن أعطال فنية، كهربائية، أو مشكلات مرافق داخل غرفتك أو المبنى السكني.',
      link: '/maintenance-request',
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: Megaphone,
      title: 'تقديم شكوى',
      description: 'تقديم شكوى رسمية متعلقة بالإقامة أو جودة الخدمات المقدمة بالمدينة الجامعية لمراجعتها من الإدارة.',
      link: '/complaint',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: CreditCard,
      title: 'سداد رسوم السكن',
      description: 'سداد رسوم الإقامة بالمدينة الجامعية للعام الأكاديمي الحالي.',
      link: '/fee-payment',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">خدمات الطالب</h1>
        <p className="text-slate-500 mt-1">بوابة خدمات الطالب</p>
        <p className="text-slate-400 text-sm">العام الأكاديمي 2025/2026</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card key={index} className="card-hover overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 ${service.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">{service.description}</p>
                  <Link to={service.link} className="w-full">
                    <Button className="w-full bg-sky-500 hover:bg-sky-600 gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      الدخول إلى الخدمة
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
