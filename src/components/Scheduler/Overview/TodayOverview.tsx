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
    <Card className="border-0 shadow-sm bg-white/80">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50">
        <CardTitle className="text-xl font-medium text-gray-700 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          סקירת פגישות להיום
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-green-600" />
              <span className="font-medium">מאושרות</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {confirmedCount}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="font-medium">ממתינות</span>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
              {pendingCount}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2">
              <XOctagon className="h-5 w-5 text-red-600" />
              <span className="font-medium">בוטלו</span>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              {canceledCount}
            </Badge>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {confirmedAppointments.length > 0 && (
            <AccordionItem value="confirmed">
              <AccordionTrigger className="text-green-700">פגישות מאושרות</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {confirmedAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {pendingAppointments.length > 0 && (
            <AccordionItem value="pending">
              <AccordionTrigger className="text-yellow-700">פגישות ממתינות</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {pendingAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {canceledAppointments.length > 0 && (
            <AccordionItem value="canceled">
              <AccordionTrigger className="text-red-700">פגישות שבוטלו</AccordionTrigger>
              <AccordionContent>
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