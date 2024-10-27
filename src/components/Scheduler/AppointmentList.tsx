import React from 'react';
import { Appointment } from '@/lib/types';
import AppointmentCard from './AppointmentCard';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import NewAppointmentForm from './NewAppointmentForm';

interface AppointmentListProps {
  appointments: Appointment[];
  date: Date;
}

const AppointmentList = ({ appointments, date }: AppointmentListProps) => {
  const [open, setOpen] = React.useState(false);
  const [localAppointments, setLocalAppointments] = React.useState(appointments);

  React.useEffect(() => {
    setLocalAppointments(appointments);
  }, [appointments]);

  const formattedDate = date.toLocaleDateString('he-IL', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleEdit = (updatedAppointment: Appointment) => {
    setLocalAppointments(prev => 
      prev.map(apt => 
        apt.id === updatedAppointment.id ? updatedAppointment : apt
      )
    );
  };

  const pendingAppointments = localAppointments.filter(apt => apt.status === 'pending');
  const approvedAppointments = localAppointments.filter(apt => apt.status !== 'pending');

  return (
    <div className="bg-scheduler-gray p-2 sm:p-4 rounded-lg min-h-[calc(100vh-8rem)] animate-fade-in">
      <div className="flex items-center justify-between mb-4 sm:mb-6 pr-2">
        <h2 className="text-lg sm:text-xl font-semibold text-scheduler-text">{formattedDate}</h2>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button 
              variant="outline"
              className="flex items-center gap-2 bg-white hover:bg-scheduler-blue hover:text-white transition-all duration-200 text-sm font-medium px-3 py-2 h-9"
            >
              <Plus className="h-4 w-4" />
              <span>הוסף פגישה</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-right">פגישה חדשה ל{formattedDate}</DrawerTitle>
            </DrawerHeader>
            <NewAppointmentForm date={date} onClose={() => setOpen(false)} />
          </DrawerContent>
        </Drawer>
      </div>

      <div className="space-y-6 pr-2">
        {localAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">אין פגישות מתוכננות</p>
        ) : (
          <>
            {pendingAppointments.length > 0 && (
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">מחכים לאישור</h3>
                <div className="space-y-3">
                  {pendingAppointments.map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id} 
                      appointment={appointment}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">פגישות מאושרות</h3>
              <div className="space-y-3">
                {approvedAppointments.length === 0 ? (
                  <p className="text-gray-500 text-sm">אין פגישות מאושרות</p>
                ) : (
                  approvedAppointments.map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id} 
                      appointment={appointment}
                      onEdit={handleEdit}
                    />
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;