import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckSquare, AlertCircle, XOctagon } from "lucide-react";
import { DaySchedule } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AppointmentCard from '../AppointmentCard';

interface TodayOverviewProps {
  todaySchedule: DaySchedule;
}

const TodayOverview = ({ todaySchedule }: TodayOverviewProps) => {
  const confirmedCount = todaySchedule.appointments.filter(apt => apt.status === 'approved').length;
  const pendingCount = todaySchedule.appointments.filter(apt => apt.status === 'pending').length;
  const canceledCount = todaySchedule.appointments.filter(apt => apt.status === 'rejected').length;

  const confirmedAppointments = todaySchedule.appointments.filter(apt => apt.status === 'approved');
  const pendingAppointments = todaySchedule.appointments.filter(apt => apt.status === 'pending');
  const canceledAppointments = todaySchedule.appointments.filter(apt => apt.status === 'rejected');

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <CardHeader className="border-b border-gray-100/50 bg-gradient-to-r from-gray-50/80 to-white/80 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-scheduler-blue" />
          סקירת היום
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-100 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckSquare className="h-5 w-5 text-green-600" />
              </div>
              <span className="font-medium text-gray-700">מאושרות</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700 px-3 py-1">
              {confirmedCount}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl border border-yellow-100 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="font-medium text-gray-700">ממתינות</span>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 px-3 py-1">
              {pendingCount}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-100 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <XOctagon className="h-5 w-5 text-red-600" />
              </div>
              <span className="font-medium text-gray-700">בוטלו</span>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-700 px-3 py-1">
              {canceledCount}
            </Badge>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {confirmedAppointments.length > 0 && (
            <AccordionItem value="confirmed" className="border border-green-100 rounded-lg px-4 shadow-sm">
              <AccordionTrigger className="text-green-700 hover:text-green-800 hover:no-underline py-4">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  פגישות מאושרות
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="space-y-3">
                  {confirmedAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {pendingAppointments.length > 0 && (
            <AccordionItem value="pending" className="border border-yellow-100 rounded-lg px-4 shadow-sm">
              <AccordionTrigger className="text-yellow-700 hover:text-yellow-800 hover:no-underline py-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  פגישות ממתינות
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="space-y-3">
                  {pendingAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {canceledAppointments.length > 0 && (
            <AccordionItem value="canceled" className="border border-red-100 rounded-lg px-4 shadow-sm">
              <AccordionTrigger className="text-red-700 hover:text-red-800 hover:no-underline py-4">
                <div className="flex items-center gap-2">
                  <XOctagon className="h-4 w-4" />
                  פגישות שבוטלו
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="space-y-3">
                  {canceledAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default TodayOverview;