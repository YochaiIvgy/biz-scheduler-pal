import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Appointment } from '@/lib/types';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-100 hover:shadow-md transition-shadow animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-scheduler-text">{appointment.clientName}</h3>
          <p className="text-sm text-gray-600">{appointment.service}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{appointment.time}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm">{appointment.duration} דקות</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;