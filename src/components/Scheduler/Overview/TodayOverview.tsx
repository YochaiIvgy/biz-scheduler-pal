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
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50">
        <CardTitle className="text-xl font-medium text-gray-700 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          סקירת פגישות להיום
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusCard status="approved" count={confirmedCount} />
          <StatusCard status="pending" count={pendingCount} />
          <StatusCard status="rejected" count={canceledCount} />
        </div>

        <AppointmentTimeline appointments={todaySchedule.appointments} />
      </CardContent>
    </Card>
  );
};

export default TodayOverview;