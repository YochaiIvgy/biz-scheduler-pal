import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DaySchedule } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";

interface PendingAppointmentsProps {
  days: DaySchedule[];
}

const PendingAppointments = ({ days }: PendingAppointmentsProps) => {
  const pendingAppointments = days.flatMap(day => 
    day.appointments
      .filter(apt => apt.status === 'pending')
      .map(apt => ({
        ...apt,
        date: day.date
      }))
  );

  if (pendingAppointments.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm bg-white/80">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-medium text-gray-700">ממתינים לאישור</span>
            <Badge 
              variant="secondary" 
              className="bg-gray-100 text-gray-600 border-0 px-3 py-1 text-sm font-normal"
            >
              {pendingAppointments.length}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid gap-8 divide-y divide-gray-100/70">
          {pendingAppointments.map((appointment, index) => (
            <div 
              key={appointment.id} 
              className={`${index > 0 ? 'pt-8' : ''}`}
            >
              <div className="rounded-lg transition-all duration-200">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">
                      {appointment.clientName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {appointment.service}
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-blue-500 border-blue-500 hover:bg-blue-50 font-normal px-6 py-1.5 h-8 rounded-full"
                  >
                    אשר פגישה
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="inline-flex items-center">
                      {appointment.time}
                      <span className="text-gray-300 mx-2">•</span>
                      {appointment.duration} דקות
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span>
                      {appointment.date.toLocaleDateString('he-IL', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingAppointments;