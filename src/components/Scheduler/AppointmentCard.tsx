import React from 'react';
import { Clock, Calendar, AlertCircle, Edit2, User } from 'lucide-react';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-300';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-300';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-300';
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-3 border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in group">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-scheduler-text text-sm sm:text-base">
                {appointment.clientName}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {appointment.services.map((service, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100"
                  >
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`${getStatusColor(appointment.status)} opacity-90 group-hover:opacity-100 transition-opacity`}
            >
              {appointment.status === 'pending' && (
                <>
                  <AlertCircle className="w-3 h-3 ml-1" />
                  מחכה לאישור
                </>
              )}
              {appointment.status === 'approved' && 'מאושר'}
              {appointment.status === 'rejected' && 'בוטל'}
            </Badge>
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setShowEditDialog(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-500">
          <div className="flex items-center">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            <span className="text-xs sm:text-sm">{appointment.time}</span>
          </div>
          <div className="flex items-center">
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