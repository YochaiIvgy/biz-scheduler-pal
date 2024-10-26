import React from 'react';
import { DaySchedule } from '@/lib/types';

interface DaysListProps {
  days: DaySchedule[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const DaysList = ({ days, selectedDate, onSelectDate }: DaysListProps) => {
  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="space-y-2 p-4 bg-white rounded-lg shadow-sm animate-fade-in">
      {days.map((day) => {
        const formattedDate = day.date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });

        return (
          <button
            key={day.date.toISOString()}
            onClick={() => onSelectDate(day.date)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              isSelected(day.date)
                ? 'bg-scheduler-blue text-white'
                : 'hover:bg-scheduler-gray'
            }`}
          >
            <div className="font-medium">{formattedDate}</div>
            <div className="text-sm mt-1 opacity-80">
              {day.appointments.length} appointments
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DaysList;