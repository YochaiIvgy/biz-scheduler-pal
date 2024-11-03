import { useState } from 'react';
import { DaySchedule } from '@/lib/types';
import CalendarOverview from '@/components/Scheduler/CalendarOverview';
import DailyView from '@/components/Scheduler/DailyView';
import SchedulerHeader from '@/components/Scheduler/SchedulerHeader';

const sampleDays: DaySchedule[] = [
  {
    date: new Date(),
    appointments: [
      {
        id: '1',
        clientName: 'יוסי כהן',
        time: '09:00',
        duration: 60,
        services: ['פגישת ייעוץ'],
        status: 'approved'
      },
      {
        id: '2',
        clientName: 'שרה לוי',
        time: '11:30',
        duration: 30,
        services: ['פגישת מעקב'],
        status: 'pending'
      },
      {
        id: '3',
        clientName: 'דן ישראלי',
        time: '14:00',
        duration: 45,
        services: ['פגישה ראשונה'],
        status: 'pending'
      },
    ],
  },
  {
    date: new Date(Date.now() + 86400000), // Tomorrow
    appointments: [
      {
        id: '4',
        clientName: 'מיכאל ישראלי',
        time: '10:00',
        duration: 45,
        services: ['פגישה ראשונה'],
        status: 'approved'
      },
      {
        id: '5',
        clientName: 'רחל כהן',
        time: '13:00',
        duration: 30,
        services: ['פגישת מעקב'],
        status: 'pending'
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
  const [showCalendar, setShowCalendar] = useState(false);

  const selectedDaySchedule = sampleDays.find(
    (day) => day.date.toDateString() === selectedDate.toDateString()
  ) || { date: selectedDate, appointments: [] };

  const getAppointmentsCount = (date: Date) => {
    const daySchedule = sampleDays.find(
      (day) => day.date.toDateString() === date.toDateString()
    );
    return daySchedule?.appointments.length || 0;
  };

  return (
    <div className="min-h-screen bg-scheduler-gray p-2 sm:p-4" dir="rtl">
      <SchedulerHeader view={viewMode} onViewChange={setViewMode} />
      
      <div className="mt-4">
        {viewMode === 'daily' ? (
          <DailyView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            selectedDaySchedule={selectedDaySchedule}
            sampleDays={sampleDays}
            getAppointmentsCount={getAppointmentsCount}
          />
        ) : (
          <CalendarOverview days={sampleDays} />
        )}
      </div>
    </div>
  );
};

export default Index;