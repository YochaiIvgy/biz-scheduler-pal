import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, User, Bookmark } from "lucide-react";
import { DaySchedule } from '@/lib/types';

interface AppointmentCardsProps {
  days: DaySchedule[];
}

const AppointmentCards = ({ days }: AppointmentCardsProps) => {
  const getAppointmentColor = (index: number) => {
    if (index === 0) return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
    if (index === 1) return 'bg-blue-100 hover:bg-blue-200 border-blue-300';
    return 'bg-blue-200 hover:bg-blue-300 border-blue-400';
  };

  const getTotalDuration = (day: DaySchedule) => {
    return day.appointments.reduce((total, apt) => total + apt.duration, 0);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {days.map((day) => (
        <Card 
          key={day.date.toISOString()} 
          className="overflow-hidden transition-all duration-200 bg-white hover:bg-gray-50"
        >
          <CardContent className="p-3 sm:p-4">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <h3 className="font-semibold text-base sm:text-lg text-scheduler-text">
                {day.date.toLocaleDateString('he-IL', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                {day.appointments.length} פגישות
              </Badge>
            </div>
            
            {day.appointments.length > 0 && (
              <div className="flex items-center gap-2 mb-2 sm:mb-3 text-sm text-gray-600">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>סה״כ: {getTotalDuration(day)} דקות</span>
              </div>
            )}

            <div className="space-y-2">
              {day.appointments.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-3 sm:py-4">אין פגישות מתוכננות</p>
              ) : (
                day.appointments.map((appointment, index) => (
                  <div
                    key={appointment.id}
                    className={`p-2 sm:p-3 rounded-md border transition-colors ${getAppointmentColor(index)}`}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <div className="font-medium text-sm text-scheduler-text">{appointment.clientName}</div>
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-600 flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{appointment.services[0]}</span>
                      </div>
                    </div>
                    <Badge className="mt-2 text-xs" variant="outline">
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
  );
};

export default AppointmentCards;