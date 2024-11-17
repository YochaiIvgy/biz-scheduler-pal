import React from 'react';
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Appointment } from "@/lib/types";

interface AppointmentTimelineProps {
  appointments: Appointment[];
}

const AppointmentTimeline = ({ appointments }: AppointmentTimelineProps) => {
  const sortedAppointments = [...appointments].sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
  });

  return (
    <Card className="p-4 bg-white/80 shadow-sm border-none">
      <h3 className="font-semibold mb-4 text-gray-700">לוח זמנים</h3>
      <div className="space-y-4">
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`relative flex items-start gap-4 p-3 rounded-lg transition-colors ${
                appointment.status === 'approved'
                  ? 'bg-green-50'
                  : appointment.status === 'pending'
                  ? 'bg-yellow-50'
                  : 'bg-red-50'
              }`}
            >
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">{appointment.clientName}</h4>
                  <span className="text-sm text-gray-500">{appointment.time}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {appointment.services.join(', ')}
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  {appointment.duration} דקות
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            אין פגישות להיום
          </div>
        )}
      </div>
    </Card>
  );
};

export default AppointmentTimeline;