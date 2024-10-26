import React from 'react';
import { DaySchedule } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface CalendarOverviewProps {
  days: DaySchedule[];
}

const CalendarOverview = ({ days }: CalendarOverviewProps) => {
  return (
    <div className="p-6 bg-white rounded-lg" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-scheduler-text">סקירת לוח זמנים</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {days.map((day) => (
          <Card key={day.date.toISOString()} className="overflow-hidden">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3">
                {day.date.toLocaleDateString('he-IL', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <div className="space-y-2">
                {day.appointments.length === 0 ? (
                  <p className="text-gray-500 text-sm">אין פגישות מתוכננות</p>
                ) : (
                  day.appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-2 bg-gray-50 rounded-md border border-gray-100"
                    >
                      <div className="font-medium">{appointment.clientName}</div>
                      <div className="text-sm text-gray-600 flex justify-between">
                        <span>{appointment.time}</span>
                        <span>{appointment.duration} דקות</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalendarOverview;