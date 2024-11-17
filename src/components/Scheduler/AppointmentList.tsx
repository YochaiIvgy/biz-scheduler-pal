import React from 'react';
import { Appointment } from '@/lib/types';
import AppointmentCard from './AppointmentCard';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const [searchQuery, setSearchQuery] = React.useState('');
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

  const filterAppointments = (appointments: Appointment[]) => {
    return appointments.filter(apt => 
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.services.some(service => 
        service.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const groupAppointmentsByTime = (appointments: Appointment[]) => {
    const morning = appointments.filter(apt => {
      const hour = parseInt(apt.time.split(':')[0]);
      return hour >= 6 && hour < 12;
    });
    
    const afternoon = appointments.filter(apt => {
      const hour = parseInt(apt.time.split(':')[0]);
      return hour >= 12 && hour < 17;
    });
    
    const evening = appointments.filter(apt => {
      const hour = parseInt(apt.time.split(':')[0]);
      return hour >= 17 || hour < 6;
    });

    return { morning, afternoon, evening };
  };

  const filteredAppointments = filterAppointments(localAppointments);
  const groupedAppointments = groupAppointmentsByTime(filteredAppointments);

  return (
    <div className="bg-scheduler-gray p-2 sm:p-4 rounded-lg min-h-[calc(100vh-8rem)] animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-2">
          <h2 className="text-lg sm:text-xl font-semibold text-scheduler-text">{formattedDate}</h2>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button 
                variant="outline"
                className="w-full sm:w-auto flex items-center gap-2 bg-white hover:bg-scheduler-blue hover:text-white transition-all duration-200 text-sm font-medium px-3 py-2 h-9"
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
        
        <div className="relative w-full">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="חיפוש לפי שם לקוח או שירות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-scheduler-blue focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-6 pr-2">
        {Object.entries(groupedAppointments).map(([timeSlot, appointments]) => {
          if (appointments.length === 0) return null;
          
          return (
            <div key={timeSlot} className="space-y-3">
              <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center gap-2">
                {timeSlot === 'morning' && 'בוקר'}
                {timeSlot === 'afternoon' && 'צהריים'}
                {timeSlot === 'evening' && 'ערב'}
                <span className="text-sm text-gray-500">({appointments.length})</span>
              </h3>
              <div className="space-y-3 transition-all duration-300">
                {appointments.map((appointment) => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          );
        })}
        
        {filteredAppointments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">לא נמצאו פגישות</p>
            {searchQuery && (
              <p className="text-sm text-gray-400 mt-2">
                נסה לחפש עם מילות מפתח אחרות
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;