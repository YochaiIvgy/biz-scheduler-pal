import React from 'react';
import { Appointment } from '@/lib/types';
import AppointmentCard from './AppointmentCard';

interface AppointmentListProps {
  appointments: Appointment[];
  date: Date;
}

const AppointmentList = ({ appointments, date }: AppointmentListProps) => {
  const formattedDate = date.toLocaleDateString('he-IL', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-scheduler-gray p-2 sm:p-4 rounded-lg min-h-[calc(100vh-8rem)] animate-fade-in">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-scheduler-text pr-2">{formattedDate}</h2>
      <div className="space-y-3 pr-2">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">אין פגישות מתוכננות</p>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentList;