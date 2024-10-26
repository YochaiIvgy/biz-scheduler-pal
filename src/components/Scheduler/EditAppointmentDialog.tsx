import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Appointment } from '@/lib/types';

interface EditAppointmentDialogProps {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedAppointment: Appointment) => void;
}

const EditAppointmentDialog = ({ appointment, open, onOpenChange, onSave }: EditAppointmentDialogProps) => {
  const [editedAppointment, setEditedAppointment] = React.useState<Appointment>(appointment);

  React.useEffect(() => {
    setEditedAppointment(appointment);
  }, [appointment]);

  const handleSave = () => {
    onSave(editedAppointment);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>עריכת פגישה</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="clientName">שם הלקוח</Label>
            <Input
              id="clientName"
              value={editedAppointment.clientName}
              onChange={(e) => setEditedAppointment(prev => ({ ...prev, clientName: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">שעה</Label>
            <Input
              id="time"
              value={editedAppointment.time}
              onChange={(e) => setEditedAppointment(prev => ({ ...prev, time: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">משך (בדקות)</Label>
            <Input
              id="duration"
              type="number"
              value={editedAppointment.duration}
              onChange={(e) => setEditedAppointment(prev => ({ ...prev, duration: Number(e.target.value) }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="service">שירות</Label>
            <Input
              id="service"
              value={editedAppointment.service}
              onChange={(e) => setEditedAppointment(prev => ({ ...prev, service: e.target.value }))}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleSave}>שמור שינויים</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentDialog;