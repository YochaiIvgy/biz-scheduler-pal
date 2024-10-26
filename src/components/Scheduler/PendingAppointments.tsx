import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DaySchedule } from '@/lib/types';
import { AlertCircle, Clock, Calendar, User } from 'lucide-react';
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
    <Card className="border-yellow-200 bg-yellow-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <span>מחכים לאישור</span>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            {pendingAppointments.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingAppointments.map(appointment => (
          <div 
            key={appointment.id} 
            className="bg-white rounded-lg p-4 border border-yellow-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <h3 className="font-medium text-scheduler-text">
                    {appointment.clientName}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 pr-6">
                  {appointment.service}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  {appointment.date.toLocaleDateString('he-IL', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{appointment.duration} דקות</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingAppointments;