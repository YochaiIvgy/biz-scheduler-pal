import React from 'react';
import { DaySchedule } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CalendarOverviewProps {
  days: DaySchedule[];
}

const CalendarOverview = ({ days }: CalendarOverviewProps) => {
  const getAppointmentColor = (index: number) => {
    if (index === 0) return 'bg-scheduler-blue/10 hover:bg-scheduler-blue/20 border-scheduler-blue/30';
    if (index === 1) return 'bg-scheduler-blue/20 hover:bg-scheduler-blue/30 border-scheduler-blue/40';
    return 'bg-scheduler-blue/30 hover:bg-scheduler-blue/40 border-scheduler-blue/50';
  };

  const getTotalDuration = (day: DaySchedule) => {
    return day.appointments.reduce((total, apt) => total + apt.duration, 0);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-scheduler-text">סקירת לוח זמנים</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-scheduler-blue/10 text-scheduler-blue border-scheduler-blue/30">
            <Calendar className="w-4 h-4 ml-1" />
            {days.length} ימים
          </Badge>
          <Badge variant="outline" className="bg-scheduler-blue/10 text-scheduler-blue border-scheduler-blue/30">
            <User className="w-4 h-4 ml-1" />
            {days.reduce((total, day) => total + day.appointments.length, 0)} פגישות
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {days.map((day) => (
          <Card 
            key={day.date.toISOString()} 
            className="overflow-hidden transition-all duration-200 hover:shadow-md"
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
                <Badge variant="outline" className="text-xs bg-scheduler-blue/10 text-scheduler-blue border-scheduler-blue/30">
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
                  day.appointments.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className={`p-3 rounded-md border transition-colors ${getAppointmentColor(index)}`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-scheduler-blue" />
                        <div className="font-medium text-scheduler-text">{appointment.clientName}</div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-scheduler-blue" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-4 h-4 text-scheduler-blue" />
                          <span>{appointment.service}</span>
                        </div>
                      </div>
                      <Badge className="mt-2 bg-scheduler-blue/10 text-scheduler-blue border-scheduler-blue/30" variant="outline">
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