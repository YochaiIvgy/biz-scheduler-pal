import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Appointment } from '@/lib/types';

interface EditAppointmentFormProps {
  appointment: Appointment;
  onClose: () => void;
  onSave: (updatedAppointment: Appointment) => void;
}

const EditAppointmentForm = ({ appointment, onClose, onSave }: EditAppointmentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState(appointment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "פגישה עודכנה",
      description: "הפגישה עודכנה בהצלחה",
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="clientName">שם הלקוח</Label>
        <Input 
          id="clientName" 
          value={formData.clientName}
          onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
          required 
          dir="rtl" 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="time">שעה</Label>
        <Input 
          id="time" 
          type="time" 
          value={formData.time}
          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="duration">משך (בדקות)</Label>
        <Input 
          id="duration" 
          type="number" 
          min="15" 
          step="15" 
          value={formData.duration}
          onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="service">סוג השירות</Label>
        <Input 
          id="service" 
          value={formData.service}
          onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
          required 
          dir="rtl" 
        />
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          ביטול
        </Button>
        <Button type="submit">
          שמור שינויים
        </Button>
      </div>
    </form>
  );
};

export default EditAppointmentForm;