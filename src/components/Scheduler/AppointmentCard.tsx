import React from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { Appointment } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-3 border border-gray-100 hover:shadow-md transition-shadow animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-scheduler-text text-sm sm:text-base">{appointment.clientName}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{appointment.service}</p>
        </div>
        {appointment.status === 'pending' && (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            <AlertCircle className="w-3 h-3 ml-1" />
            מחכה לאישור
          </Badge>
        )}
      </div>
      <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center text-gray-500">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          <span className="text-xs sm:text-sm">{appointment.time}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          <span className="text-xs sm:text-sm">{appointment.duration} דקות</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;