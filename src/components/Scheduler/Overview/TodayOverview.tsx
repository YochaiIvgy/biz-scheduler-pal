import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";
import { DaySchedule } from '@/lib/types';
import StatusCard from './StatusCard';
import AppointmentTimeline from './AppointmentTimeline';
import { Progress } from "@/components/ui/progress";

interface TodayOverviewProps {
  todaySchedule: DaySchedule;
}

const TodayOverview = ({ todaySchedule }: TodayOverviewProps) => {
  const confirmedCount = todaySchedule.appointments.filter(apt => apt.status === 'approved').length;
  const pendingCount = todaySchedule.appointments.filter(apt => apt.status === 'pending').length;
  const canceledCount = todaySchedule.appointments.filter(apt => apt.status === 'rejected').length;
  const totalAppointments = todaySchedule.appointments.length;
  const maxAppointments = 8; // Assuming 8 hours workday
  const progress = (totalAppointments / maxAppointments) * 100;

  return (
    <Card className="border-0 shadow-sm bg-white/80">
      <CardHeader className="border-b border-gray-100/50 bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg sm:text-xl font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            סקירת פגישות להיום
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('he-IL', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Progress Section */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">התקדמות יומית</h3>
            <span className="text-sm text-gray-600">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{totalAppointments} פגישות</span>
            <span>{maxAppointments - totalAppointments} שעות פנויות</span>
          </div>
        </div>

        {/* Status Cards - New Layout */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="col-span-3 sm:col-span-1">
            <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100">
              <div className="flex items-center justify-between">
                <span className="text-green-700 text-sm font-medium">מאושרות</span>
                <span className="text-2xl font-bold text-green-700">{confirmedCount}</span>
              </div>
            </div>
          </div>
          <div className="col-span-3 sm:col-span-1">
            <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-100">
              <div className="flex items-center justify-between">
                <span className="text-yellow-700 text-sm font-medium">ממתינות</span>
                <span className="text-2xl font-bold text-yellow-700">{pendingCount}</span>
              </div>
            </div>
          </div>
          <div className="col-span-3 sm:col-span-1">
            <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-100">
              <div className="flex items-center justify-between">
                <span className="text-red-700 text-sm font-medium">בוטלו</span>
                <span className="text-2xl font-bold text-red-700">{canceledCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-700 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              פגישות היום
            </h3>
            <span className="text-sm text-gray-500">
              {todaySchedule.appointments.length} פגישות
            </span>
          </div>
          <div className="max-h-[calc(100vh-32rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pr-2">
            <AppointmentTimeline appointments={todaySchedule.appointments} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayOverview;