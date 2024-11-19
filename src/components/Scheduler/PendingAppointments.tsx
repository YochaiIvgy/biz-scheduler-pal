import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DaySchedule, Appointment } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, X, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface PendingAppointmentsProps {
  days: DaySchedule[];
  onUpdateAppointment?: (date: Date, updatedAppointment: Appointment) => void;
}

const PendingAppointments = ({ days, onUpdateAppointment }: PendingAppointmentsProps) => {
  const [showCancelDialog, setShowCancelDialog] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = React.useState<{ appointment: Appointment, date: Date } | null>(null);
  const { toast } = useToast();

  const pendingAppointments = days.flatMap(day => 
    day.appointments
      .filter(apt => apt.status === 'pending')
      .map(apt => ({
        ...apt,
        date: day.date
      }))
  );

  const handleCancelClick = (appointment: Appointment, date: Date) => {
    setSelectedAppointment({ appointment, date });
    setShowCancelDialog(true);
  };

  const handleCancel = () => {
    if (selectedAppointment && onUpdateAppointment) {
      const canceledAppointment = {
        ...selectedAppointment.appointment,
        status: 'rejected' as const
      };
      onUpdateAppointment(selectedAppointment.date, canceledAppointment);
      toast({
        title: "פגישה בוטלה",
        description: `הפגישה עם ${selectedAppointment.appointment.clientName} בוטלה בהצלחה`,
      });
    }
    setShowCancelDialog(false);
    setSelectedAppointment(null);
  };

  const handleApproveAll = () => {
    pendingAppointments.forEach(appointment => {
      if (onUpdateAppointment) {
        const approvedAppointment = {
          ...appointment,
          status: 'approved' as const
        };
        onUpdateAppointment(appointment.date, approvedAppointment);
      }
    });
    
    toast({
      title: "פגישות אושרו",
      description: `${pendingAppointments.length} פגישות אושרו בהצלחה`,
    });
  };

  if (pendingAppointments.length === 0) {
    return null;
  }

  return (
    <>
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
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500 border-blue-500 hover:bg-blue-50 font-medium px-4 py-1 h-8 rounded-md flex items-center gap-2"
              onClick={handleApproveAll}
            >
              <CheckCircle2 className="h-4 w-4" />
              אישור כל הממתינות
            </Button>
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
                        {appointment.services[0]}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="text-blue-500 border-blue-500 hover:bg-blue-50 font-medium px-4 py-1 h-7 rounded-md"
                      >
                        אשר פגישה
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50 font-medium h-7 rounded-md"
                        onClick={() => handleCancelClick(appointment, appointment.date)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
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

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ביטול פגישה</DialogTitle>
            <DialogDescription>
              האם אתה בטוח שברצונך לבטל את הפגישה עם {selectedAppointment?.appointment.clientName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              חזור
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              בטל פגישה
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PendingAppointments;