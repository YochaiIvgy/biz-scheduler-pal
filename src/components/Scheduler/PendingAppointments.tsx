import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DaySchedule } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PendingAppointmentsProps {
  days: DaySchedule[];
}

const PendingAppointments = ({ days }: PendingAppointmentsProps) => {
  const pendingAppointments = days.flatMap(day => 
    day.appointments
      .filter(apt => apt.status === 'pending')
      .map(apt => ({
        ...apt,
        date: day.date
      }))
  );

  if (pendingAppointments.length === 0) {
    return null;
  }

  return (
    <Card className="border border-scheduler-lightBlue/20 bg-white shadow-sm">
      <CardHeader className="border-b border-scheduler-lightBlue/10 bg-blue-50/30">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-scheduler-text">ממתינים לאישור</span>
            <Badge 
              variant="secondary" 
              className="bg-scheduler-lightBlue/10 text-scheduler-blue border-0"
            >
              {pendingAppointments.length}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4">
          {pendingAppointments.map(appointment => (
            <div 
              key={appointment.id} 
              className="bg-white rounded-lg p-4 border border-gray-100 hover:border-scheduler-lightBlue/30 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-scheduler-text mb-1">
                    {appointment.clientName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {appointment.service}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs border-scheduler-lightBlue text-scheduler-blue hover:bg-scheduler-lightBlue/10"
                >
                  אשר פגישה
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>{appointment.time}</span>
                  <span className="text-gray-400">•</span>
                  <span>{appointment.duration} דקות</span>
                </div>
                <div className="text-gray-500">
                  {appointment.date.toLocaleDateString('he-IL', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingAppointments;