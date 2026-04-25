import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Room {
  number: string;
  type: string;
  capacity: number;
  occupied: number;
  available: number;
}

export function BuildingRooms() {
  const [buildingOpen, setBuildingOpen] = useState(false);

  const rooms: Room[] = [
    { number: '101', type: 'فردي', capacity: 1, occupied: 1, available: 0 },
    { number: '102', type: 'مشترك', capacity: 4, occupied: 2, available: 2 },
    { number: '103', type: 'مشترك', capacity: 4, occupied: 4, available: 0 },
    { number: '104', type: 'فردي', capacity: 1, occupied: 0, available: 1 },
    { number: '105', type: 'مشترك', capacity: 2, occupied: 1, available: 1 },
  ];

  const getRoomTypeBadge = (type: string) => {
    const typeClasses: Record<string, string> = {
      'فردي': 'bg-sky-100 text-sky-700',
      'مشترك': 'bg-purple-100 text-purple-700',
    };
    return <span className={`px-2 py-1 rounded text-xs ${typeClasses[type] || 'bg-slate-100'}`}>{type}</span>;
  };

  const getAvailabilityBadge = (available: number) => {
    if (available === 0) {
      return <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 text-slate-500 rounded-lg font-medium">0</span>;
    }
    return <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg font-medium">{available}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-slate-800">المباني والغرف</h1>
        <p className="text-slate-500 mt-1">عرض حالة الإشغال والتسكين للعام الأكاديمي 2025/2026</p>
      </div>

      {/* Buildings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['مبنى أ', 'مبنى ب', 'مبنى ج', 'مبنى د'].map((building, index) => (
          <Card 
            key={index} 
            className={`card-hover cursor-pointer ${index === 0 ? 'border-sky-500 border-2' : ''}`}
            onClick={() => setBuildingOpen(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <h3 className="font-semibold text-slate-800">{building}</h3>
                  <p className="text-sm text-slate-500">50 غرفة</p>
                </div>
                <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-sky-500" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className="text-emerald-600">مشغول: 35</span>
                <span className="text-sky-600">شاغر: 15</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Building Rooms Dialog */}
      <Dialog open={buildingOpen} onOpenChange={setBuildingOpen}>
        <DialogContent className="sm:max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">غرف مبنى (أ)</DialogTitle>
            <p className="text-sm text-slate-500 text-right">
              عرض حالة الإشغال والتسكين للعام الأكاديمي 2025/2026
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <table className="data-table">
              <thead>
                <tr>
                  <th>رقم الغرفة</th>
                  <th>نوع الغرفة</th>
                  <th>السعة</th>
                  <th>المشغول</th>
                  <th>المتاح (أسرة)</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.number}>
                    <td className="font-medium">{room.number}</td>
                    <td>{getRoomTypeBadge(room.type)}</td>
                    <td>{room.capacity}</td>
                    <td>{room.occupied}</td>
                    <td>{getAvailabilityBadge(room.available)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center pt-2">
              <Button 
                variant="outline"
                onClick={() => setBuildingOpen(false)}
              >
                إغلاق
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
