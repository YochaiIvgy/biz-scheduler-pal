import React from 'react';
import { DaySchedule } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import NewAppointmentForm from './NewAppointmentForm';
import PendingAppointments from './PendingAppointments';
import TodayOverview from './Overview/TodayOverview';
import NotificationsCard from './Overview/NotificationsCard';
import AnalyticsSection from './Overview/AnalyticsSection';
import AppointmentCards from './Overview/AppointmentCards';

interface CalendarOverviewProps {
  days: DaySchedule[];
}

const CalendarOverview = ({ days }: CalendarOverviewProps) => {
  const [open, setOpen] = React.useState(false);
  const today = new Date();
  const todaySchedule = days.find(day => 
    day.date.toDateString() === today.toDateString()
  ) || { date: today, appointments: [] };

  return (
    <div className="space-y-6 p-6 bg-scheduler-gray rounded-lg animate-fade-in" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <TodayOverview todaySchedule={todaySchedule} />
        <NotificationsCard days={days} />
      </div>

      <PendingAppointments days={days} />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-scheduler-text">סקירת לוח זמנים</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 flex items-center gap-1 px-3 py-1">
            <span>{days.length} ימים</span>
          </Badge>
          <Badge variant="outline" className="bg-green-50 flex items-center gap-1 px-3 py-1">
            <span>{days.reduce((total, day) => total + day.appointments.length, 0)} פגישות</span>
          </Badge>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-blue-500 border-blue-500 hover:bg-blue-50 font-normal px-6 py-1.5 h-8 rounded-full"
              >
                <Plus className="h-4 w-4" />
                <span>הוסף פגישה</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-right">פגישה חדשה</DrawerTitle>
              </DrawerHeader>
              <NewAppointmentForm date={new Date()} onClose={() => setOpen(false)} />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      
      <AppointmentCards days={days} />
      <AnalyticsSection days={days} />
    </div>
  );
};

export default CalendarOverview;