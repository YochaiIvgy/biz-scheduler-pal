import React from 'react';
import { Appointment } from '@/lib/types';
import AppointmentCard from './AppointmentCard';

interface AppointmentListProps {
  appointments: Appointment[];
  date: Date;
}

const AppointmentList = ({ appointments, date }: AppointmentListProps) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-scheduler-gray p-4 rounded-lg min-h-[calc(100vh-2rem)] animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-scheduler-text">{formattedDate}</h2>
      <div className="space-y-2">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No appointments scheduled</p>
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