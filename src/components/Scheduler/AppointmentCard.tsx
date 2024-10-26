import React from 'react';
import { Clock, Calendar, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Appointment } from '@/lib/types';
import EditAppointmentDialog from './EditAppointmentDialog';

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit?: (updatedAppointment: Appointment) => void;
}

const AppointmentCard = ({ appointment, onEdit }: AppointmentCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-3 border border-gray-100 hover:shadow-md transition-shadow animate-fade-in">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-scheduler-text text-sm sm:text-base">{appointment.clientName}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{appointment.service}</p>
          </div>
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
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
      {onEdit && (
        <EditAppointmentDialog
          appointment={appointment}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={onEdit}
        />
      )}
    </>
  );
};

export default AppointmentCard;