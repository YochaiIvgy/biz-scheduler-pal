import React, { useState } from 'react';
import AppointmentList from '@/components/Scheduler/AppointmentList';
import DaysList from '@/components/Scheduler/DaysList';
import CalendarOverview from '@/components/Scheduler/CalendarOverview';
import { Button } from '@/components/ui/button';
import { DaySchedule } from '@/lib/types';
import { Calendar } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

const sampleDays: DaySchedule[] = [
  {
    date: new Date(),
    appointments: [
      {
        id: '1',
        clientName: 'יוסי כהן',
        time: '09:00',
        duration: 60,
        service: 'פגישת ייעוץ',
      },
      {
        id: '2',
        clientName: 'שרה לוי',
        time: '11:30',
        duration: 30,
        service: 'פגישת מעקב',
      },
    ],
  },
  {
    date: new Date(Date.now() + 86400000), // Tomorrow
    appointments: [
      {
        id: '3',
        clientName: 'מיכאל ישראלי',
        time: '10:00',
        duration: 45,
        service: 'פגישה ראשונה',
      },
    ],
  },
  {
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    appointments: [],
  },
];

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'daily' | 'overview'>('daily');
  const [isOpen, setIsOpen] = useState(false);

  const selectedDaySchedule = sampleDays.find(
    (day) => day.date.toDateString() === selectedDate.toDateString()
  ) || { date: selectedDate, appointments: [] };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-scheduler-text">לוח פגישות</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            className="flex-1 sm:flex-none"
            variant={viewMode === 'daily' ? 'default' : 'outline'}
            onClick={() => setViewMode('daily')}
          >
            תצוגה יומית
          </Button>
          <Button
            className="flex-1 sm:flex-none"
            variant={viewMode === 'overview' ? 'default' : 'outline'}
            onClick={() => setViewMode('overview')}
          >
            תצוגה כללית
          </Button>
        </div>
      </div>
      
      {viewMode === 'daily' ? (
        <>
          {/* Mobile View */}
          <div className="lg:hidden mb-4">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  {selectedDate.toLocaleDateString('he-IL', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="max-h-[50vh] overflow-y-auto px-4 pt-4">
                  <DaysList
                    days={sampleDays}
                    selectedDate={selectedDate}
                    onSelectDate={handleDateSelect}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Desktop View */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-4">
            <div className="hidden lg:block">
              <DaysList
                days={sampleDays}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>
            <AppointmentList
              appointments={selectedDaySchedule.appointments}
              date={selectedDate}
            />
          </div>
        </>
      ) : (
        <CalendarOverview days={sampleDays} />
      )}
    </div>
  );
};

export default Index;