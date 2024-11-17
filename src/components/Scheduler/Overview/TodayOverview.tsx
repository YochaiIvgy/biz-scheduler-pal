import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckSquare, AlertCircle, XOctagon } from "lucide-react";
import { DaySchedule } from '@/lib/types';

interface TodayOverviewProps {
  todaySchedule: DaySchedule;
}

const TodayOverview = ({ todaySchedule }: TodayOverviewProps) => {
  const confirmedCount = todaySchedule.appointments.filter(apt => apt.status === 'approved').length;
  const pendingCount = todaySchedule.appointments.filter(apt => apt.status === 'pending').length;
  const canceledCount = todaySchedule.appointments.filter(apt => apt.status === 'rejected').length;

  return (
    <Card className="border-0 shadow-sm bg-white/80">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50">
        <CardTitle className="text-xl font-medium text-gray-700 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          סקירת פגישות להיום
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-green-600" />
              <span className="font-medium">מאושרות</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {confirmedCount}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="font-medium">ממתינות</span>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
              {pendingCount}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2">
              <XOctagon className="h-5 w-5 text-red-600" />
              <span className="font-medium">בוטלו</span>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              {canceledCount}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayOverview;