import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Appointment } from '@/lib/types';

interface AppointmentCardProps {
  appointment: Appointment;
  index: number;
}

const AppointmentCard = ({ appointment, index }: AppointmentCardProps) => {
  const getAppointmentColor = (index: number) => {
    if (index === 0) return 'bg-scheduler-blue/10 hover:bg-scheduler-blue/20 border-scheduler-blue/30';
    if (index === 1) return 'bg-scheduler-blue/20 hover:bg-scheduler-blue/30 border-scheduler-blue/40';
    return 'bg-scheduler-blue/30 hover:bg-scheduler-blue/40 border-scheduler-blue/50';
  };

  return (
    <div className={`rounded-lg p-4 border transition-all duration-200 ${getAppointmentColor(index)}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-scheduler-text">{appointment.clientName}</h3>
          <p className="text-sm text-gray-600">{appointment.service}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center text-scheduler-blue">
          <Clock className="w-4 h-4 ml-1" />
          <span className="text-sm">{appointment.time}</span>
        </div>
        <div className="flex items-center text-scheduler-blue">
          <Calendar className="w-4 h-4 ml-1" />
          <span className="text-sm">{appointment.duration} דקות</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;