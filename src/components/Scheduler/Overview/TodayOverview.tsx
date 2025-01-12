import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, DollarSign, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DaySchedule } from '@/lib/types';
import { toast } from "@/components/ui/use-toast";
import AppointmentTimeline from './AppointmentTimeline';
import MediaManagementCard from './MediaManagementCard';

interface TodayOverviewProps {
  todaySchedule: DaySchedule;
}

const TodayOverview = ({ todaySchedule }: TodayOverviewProps) => {
  const totalAppointments = todaySchedule.appointments.length;
  const pendingAppointments = todaySchedule.appointments.filter(apt => apt.status === 'pending').length;
  const approvedAppointments = todaySchedule.appointments.filter(apt => apt.status === 'approved').length;
  
  // Calculate estimated revenue (mock calculation - 200₪ per appointment)
  const estimatedRevenue = totalAppointments * 200;
  
  // Calculate progress percentage
  const progressPercentage = totalAppointments > 0 
    ? (approvedAppointments / totalAppointments) * 100 
    : 0;
  
  // Find next appointment
  const nextAppointment = todaySchedule.appointments
    .filter(apt => {
      const [hours, minutes] = apt.time.split(':');
      const appointmentTime = new Date();
      appointmentTime.setHours(parseInt(hours), parseInt(minutes), 0);
      return appointmentTime > new Date();
    })
    .sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    })[0];

  const handleApproveAll = () => {
    toast({
      title: "פעולה בוצעה",
      description: "כל הפגישות הממתינות אושרו",
    });
  };

  const handleFillSlots = () => {
    toast({
      title: "ממלא משבצות פנויות",
      description: "מחפש משבצות זמן פנויות...",
    });
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b border-gray-100/50 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-lg font-medium text-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              סקירת פגישות להיום
            </div>
            <span className="text-sm font-normal text-gray-500">
              {todaySchedule.date.toLocaleDateString('he-IL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 space-y-6">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">התקדמות היום</span>
              <span className="text-gray-700 font-medium">{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{approvedAppointments} מאושרות</span>
              <span>{pendingAppointments} ממתינות</span>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">סה״כ פגישות</p>
                  <p className="text-2xl font-bold text-blue-700">{totalAppointments}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">הכנסות צפויות</p>
                  <p className="text-2xl font-bold text-green-700">₪{estimatedRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Next Appointment Section */}
          {nextAppointment && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">הפגישה הבאה</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="font-semibold text-purple-900">{nextAppointment.clientName}</p>
                  <div className="flex items-center gap-2 text-sm text-purple-700">
                    <Clock className="h-4 w-4" />
                    <span>{nextAppointment.time}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {nextAppointment.services.map((service, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <Calendar className="h-12 w-12 text-purple-400" />
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {pendingAppointments > 0 && (
              <Button 
                variant="outline"
                onClick={handleApproveAll}
                className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
              >
                <CheckCircle2 className="h-4 w-4" />
                אישור כל הממתינות ({pendingAppointments})
              </Button>
            )}
            
            <Button 
              variant="outline"
              className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            >
              <Plus className="h-4 w-4" />
              הוסף פגישה
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleFillSlots}
              className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
            >
              <Calendar className="h-4 w-4" />
              מלא משבצות פנויות
            </Button>
          </div>

          {/* Appointments Timeline */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">לוח זמנים</h3>
            <div className="max-h-[300px] overflow-y-auto pr-2">
              <AppointmentTimeline appointments={todaySchedule.appointments} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Management Section */}
      <MediaManagementCard />
    </div>
  );
};

export default TodayOverview;