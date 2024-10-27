import React from 'react';
import { Clock, Calendar, AlertCircle, Edit2 } from 'lucide-react';
import { Appointment } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditAppointmentForm from './EditAppointmentForm';

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit?: (updatedAppointment: Appointment) => void;
}

const AppointmentCard = ({ appointment, onEdit }: AppointmentCardProps) => {
  const [showEditDialog, setShowEditDialog] = React.useState(false);

  const handleEdit = (updatedAppointment: Appointment) => {
    if (onEdit) {
      onEdit(updatedAppointment);
    }
    setShowEditDialog(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-3 border border-gray-100 hover:shadow-md transition-shadow animate-fade-in">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-scheduler-text text-sm sm:text-base">{appointment.clientName}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{appointment.service}</p>
          </div>
          <div className="flex items-center gap-2">
            {appointment.status === 'pending' && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                <AlertCircle className="w-3 h-3 ml-1" />
                מחכה לאישור
              </Badge>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowEditDialog(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
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

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>עריכת פגישה</DialogTitle>
          </DialogHeader>
          <EditAppointmentForm
            appointment={appointment}
            onClose={() => setShowEditDialog(false)}
            onSave={handleEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentCard;