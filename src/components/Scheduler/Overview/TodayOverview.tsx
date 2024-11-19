import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { DaySchedule } from '@/lib/types';
import StatusCard from './StatusCard';
import AppointmentTimeline from './AppointmentTimeline';

interface TodayOverviewProps {
  todaySchedule: DaySchedule;
}

const TodayOverview = ({ todaySchedule }: TodayOverviewProps) => {
  const confirmedCount = todaySchedule.appointments.filter(apt => apt.status === 'approved').length;
  const pendingCount = todaySchedule.appointments.filter(apt => apt.status === 'pending').length;
  const canceledCount = todaySchedule.appointments.filter(apt => apt.status === 'rejected').length;

  return (
    <Card className="border-0 shadow-sm bg-white/80">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50 p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl font-medium text-gray-700 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          סקירת פגישות להיום
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-4 sm:space-y-6">
        {/* Status Cards Grid - Responsive Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          <div className="col-span-1">
            <StatusCard status="approved" count={confirmedCount} />
          </div>
          <div className="col-span-1">
            <StatusCard status="pending" count={pendingCount} />
          </div>
          <div className="col-span-2 sm:col-span-1 mt-2 sm:mt-0">
            <StatusCard status="rejected" count={canceledCount} />
          </div>
        </div>

        {/* Timeline Section - Improved Mobile View */}
        <div className="bg-gray-50/50 rounded-lg p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-medium text-gray-700 mb-3">
            לוח זמנים
          </h3>
          <div className="max-h-[calc(100vh-24rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <AppointmentTimeline appointments={todaySchedule.appointments} />
          </div>
        </div>

        {/* Summary Section for Mobile */}
        <div className="block sm:hidden bg-blue-50/50 rounded-lg p-3">
          <h3 className="text-sm font-medium text-blue-700 mb-2">
            סיכום יומי
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>סה״כ פגישות: {todaySchedule.appointments.length}</p>
            <p>זמן פנוי: {8 - todaySchedule.appointments.length} שעות</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayOverview;