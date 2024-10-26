import React from 'react';
import { Appointment } from '@/lib/types';
import AppointmentCard from './AppointmentCard';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="flex items-center justify-between mb-4 sm:mb-6 pr-2">
        <h2 className="text-lg sm:text-xl font-semibold text-scheduler-text">{formattedDate}</h2>
        <Button 
          variant="outline"
          className="flex items-center gap-2 bg-white hover:bg-scheduler-blue hover:text-white transition-all duration-200 text-sm font-medium px-3 py-2 h-9"
          onClick={() => {}}
        >
          <Plus className="h-4 w-4" />
          <span>הוסף פגישה</span>
        </Button>
      </div>
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