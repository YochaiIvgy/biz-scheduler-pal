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
    <Card className="border border-scheduler-lightBlue/20 bg-white shadow-md">
      <CardHeader className="border-b border-scheduler-lightBlue/10 bg-blue-50/30">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-scheduler-text">ממתינים לאישור</span>
            <Badge 
              variant="secondary" 
              className="bg-scheduler-blue text-white border-0 px-4 py-1.5 text-sm"
            >
              {pendingAppointments.length}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 divide-y divide-gray-100">
          {pendingAppointments.map((appointment, index) => (
            <div 
              key={appointment.id} 
              className={`bg-white rounded-lg ${index > 0 ? 'pt-6' : ''} pb-1`}
            >
              <div className="p-5 border border-gray-100 rounded-lg hover:border-scheduler-lightBlue/30 hover:shadow-lg transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-scheduler-text mb-1">
                      {appointment.clientName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.service}
                    </p>
                  </div>
                  <Button 
                    variant="default"
                    size="sm"
                    className="bg-scheduler-blue hover:bg-scheduler-blue/90 text-white font-medium px-6 py-2.5 h-auto"
                  >
                    אשר פגישה
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-scheduler-blue/70 flex-shrink-0" />
                    <span className="inline-flex items-center">
                      {appointment.time}
                      <span className="text-gray-400 mx-2">•</span>
                      {appointment.duration} דקות
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-4 w-4 text-scheduler-blue/70 flex-shrink-0" />
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