import React from 'react';
import { DaySchedule } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CalendarOverviewProps {
  days: DaySchedule[];
}

const CalendarOverview = ({ days }: CalendarOverviewProps) => {
  const getStatusColor = (appointments: number) => {
    if (appointments === 0) return 'bg-gray-100 hover:bg-gray-200';
    if (appointments < 3) return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
    return 'bg-blue-100 hover:bg-blue-200 border-blue-300';
  };

  const getTotalDuration = (day: DaySchedule) => {
    return day.appointments.reduce((total, apt) => total + apt.duration, 0);
  };

  return (
    <div className="p-6 bg-scheduler-gray rounded-lg animate-fade-in" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-scheduler-text">סקירת לוח זמנים</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-50">
            <Calendar className="w-4 h-4 ml-1" />
            {days.length} ימים
          </Badge>
          <Badge variant="outline" className="bg-green-50">
            <User className="w-4 h-4 ml-1" />
            {days.reduce((total, day) => total + day.appointments.length, 0)} פגישות
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {days.map((day) => (
          <Card 
            key={day.date.toISOString()} 
            className={`overflow-hidden transition-all duration-200 ${getStatusColor(day.appointments.length)}`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg text-scheduler-text">
                  {day.date.toLocaleDateString('he-IL', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {day.appointments.length} פגישות
                </Badge>
              </div>
              
              {day.appointments.length > 0 && (
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>סה״כ: {getTotalDuration(day)} דקות</span>
                </div>
              )}

              <div className="space-y-2">
                {day.appointments.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">אין פגישות מתוכננות</p>
                ) : (
                  day.appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-3 bg-white rounded-md border border-gray-100 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div className="font-medium text-scheduler-text">{appointment.clientName}</div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-4 h-4" />
                          <span>{appointment.service}</span>
                        </div>
                      </div>
                      <Badge className="mt-2" variant="outline">
                        {appointment.duration} דקות
                      </Badge>
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