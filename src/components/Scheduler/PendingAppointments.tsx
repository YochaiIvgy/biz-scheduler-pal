import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DaySchedule } from '@/lib/types';
import AppointmentCard from './AppointmentCard';

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="text-yellow-600">⚠️</span>
          מחכים לאישור ({pendingAppointments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingAppointments.map(appointment => (
          <div key={appointment.id} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{appointment.clientName}</h3>
                <p className="text-sm text-gray-600">{appointment.service}</p>
              </div>
              <div className="text-sm text-gray-600 text-left">
                {appointment.date.toLocaleDateString('he-IL', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>⏰ {appointment.time}</span>
              <span>⌛ {appointment.duration} דקות</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingAppointments;