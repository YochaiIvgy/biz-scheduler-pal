import React, { useState } from 'react';
import AppointmentList from '@/components/Scheduler/AppointmentList';
import DaysList from '@/components/Scheduler/DaysList';
import { DaySchedule } from '@/lib/types';

// Sample data - in a real app, this would come from an API
const sampleDays: DaySchedule[] = [
  {
    date: new Date(),
    appointments: [
      {
        id: '1',
        clientName: 'John Smith',
        time: '09:00 AM',
        duration: 60,
        service: 'Consultation',
      },
      {
        id: '2',
        clientName: 'Sarah Johnson',
        time: '11:30 AM',
        duration: 30,
        service: 'Follow-up',
      },
    ],
  },
  {
    date: new Date(Date.now() + 86400000), // Tomorrow
    appointments: [
      {
        id: '3',
        clientName: 'Mike Wilson',
        time: '10:00 AM',
        duration: 45,
        service: 'Initial Meeting',
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

  const selectedDaySchedule = sampleDays.find(
    (day) => day.date.toDateString() === selectedDate.toDateString()
  ) || { date: selectedDate, appointments: [] };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold text-scheduler-text mb-6">Appointment Schedule</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-4">
        <AppointmentList
          appointments={selectedDaySchedule.appointments}
          date={selectedDate}
        />
        <DaysList
          days={sampleDays}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default Index;