import React, { useState } from 'react';
import AppointmentList from '@/components/Scheduler/AppointmentList';
import DaysList from '@/components/Scheduler/DaysList';
import CalendarOverview from '@/components/Scheduler/CalendarOverview';
import { Button } from '@/components/ui/button';
import { DaySchedule } from '@/lib/types';

// Sample data - in a real app, this would come from an API
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

  const selectedDaySchedule = sampleDays.find(
    (day) => day.date.toDateString() === selectedDate.toDateString()
  ) || { date: selectedDate, appointments: [] };

  return (
    <div className="min-h-screen bg-white p-4" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-scheduler-text">לוח פגישות</h1>
        <div className="space-x-2 space-x-reverse">
          <Button
            variant={viewMode === 'daily' ? 'default' : 'outline'}
            onClick={() => setViewMode('daily')}
          >
            תצוגה יומית
          </Button>
          <Button
            variant={viewMode === 'overview' ? 'default' : 'outline'}
            onClick={() => setViewMode('overview')}
          >
            תצוגה כללית
          </Button>
        </div>
      </div>
      
      {viewMode === 'daily' ? (
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-4">
          <DaysList
            days={sampleDays}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <AppointmentList
            appointments={selectedDaySchedule.appointments}
            date={selectedDate}
          />
        </div>
      ) : (
        <CalendarOverview days={sampleDays} />
      )}
    </div>
  );
};

export default Index;