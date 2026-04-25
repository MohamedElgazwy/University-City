import { 
  Wrench, 
  AlertCircle, 
  FileText, 
  Wallet, 
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Dashboard() {
  const stats = [
    { label: 'إجمالي الطلبة', value: '1,250', icon: Users, color: 'text-sky-600', bgColor: 'bg-sky-50' },
    { label: 'الإيرادات', value: '450,000', subValue: 'ج.م', icon: Wallet, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { label: 'طلبات مراجعة', value: '85', icon: FileText, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: 'الشكاوى', value: '12', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50' },
    { label: 'طلبات صيانة', value: '24', icon: Wrench, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];

  const recentActivities = [
    { 
      icon: UserPlus, 
      iconBg: 'bg-sky-100', 
      iconColor: 'text-sky-600',
      title: 'تم إضافة طالب جديد', 
      subtitle: 'أحمد محمود - أ - غرفة 302',
      time: 'منذ 10 دقائق'
    },
    { 
      icon: Wallet, 
      iconBg: 'bg-emerald-100', 
      iconColor: 'text-emerald-600',
      title: 'تحصيل رسوم سكن', 
      subtitle: 'تم دفع رسوم شهر مارس للطالب علي عمر',
      time: 'منذ ساعة'
    },
    { 
      icon: CheckCircle, 
      iconBg: 'bg-amber-100', 
      iconColor: 'text-amber-600',
      title: 'اكتمال عملية صيانة', 
      subtitle: 'إصلاح أعطال الكهرباء في المبنى ج',
      time: 'منذ ساعتين'
    },
    { 
      icon: Settings, 
      iconBg: 'bg-slate-100', 
      iconColor: 'text-slate-600',
      title: 'تحديث إعدادات التسكين', 
      subtitle: 'قام د. حمادة بتغيير مواعيد التقديم',
      time: 'صباح اليوم'
    },
  ];

  const housingRequests = [
    { percentage: '81%', count: 850, status: 'مقبولة', statusClass: 'status-approved' },
    { percentage: '11%', count: 120, status: 'مرفوضة', statusClass: 'status-rejected' },
    { percentage: '8%', count: 85, status: 'قيد المراجعة', statusClass: 'status-pending' },
  ];

  const alerts = [
    { 
      type: 'error', 
      title: 'عرض التفاصيل', 
      message: 'هناك 15 طلب صيانة طارئة لم يتم البدء فيها بعد.',
      icon: AlertTriangle
    },
    { 
      type: 'warning', 
      title: 'معالجة', 
      message: '8 طلبات تسكين جديدة قيد الانتظار منذ أكثر من 48 ساعة.',
      icon: Clock
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">أهلاً بك، د. حمادة</h1>
        <p className="text-slate-500 mt-1">هنا ملخص عام لنظام المدن الجامعية بجامعة المنيا اليوم.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-slate-500 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">
                      {stat.value}
                      {stat.subValue && <span className="text-sm mr-1">{stat.subValue}</span>}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-right text-lg">آخر الأنشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="font-medium text-slate-800">{activity.title}</p>
                      <p className="text-sm text-slate-500">{activity.subtitle}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Housing Requests Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-right text-lg">ملخص طلبات التسكين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {housingRequests.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 w-12">{item.percentage}</span>
                    <span className="font-medium text-slate-700">{item.count}</span>
                  </div>
                  <Badge className={`border-0 ${item.statusClass}`}>
                    <span className="w-2 h-2 bg-current rounded-full ml-2"></span>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Administrative Alerts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-right text-lg">تنبيهات إدارية هامة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-4 rounded-lg border-r-4 ${
                    alert.type === 'error' 
                      ? 'bg-red-50 border-red-500' 
                      : 'bg-amber-50 border-amber-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${alert.type === 'error' ? 'text-red-500' : 'text-amber-500'}`} />
                    <p className={`text-sm ${alert.type === 'error' ? 'text-red-700' : 'text-amber-700'}`}>
                      {alert.message}
                    </p>
                  </div>
                  <Button 
                    variant="link" 
                    className={`text-sm ${alert.type === 'error' ? 'text-red-600' : 'text-amber-600'}`}
                  >
                    {alert.title}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
