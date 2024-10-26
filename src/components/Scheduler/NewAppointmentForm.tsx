import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface NewAppointmentFormProps {
  date: Date;
  onClose: () => void;
}

const NewAppointmentForm = ({ date, onClose }: NewAppointmentFormProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the appointment to a backend
    toast({
      title: "פגישה נקבעה",
      description: "הפגישה נקבעה בהצלחה",
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="clientName">שם הלקוח</Label>
        <Input id="clientName" required dir="rtl" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="time">שעה</Label>
        <Input id="time" type="time" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="duration">משך (בדקות)</Label>
        <Input id="duration" type="number" min="15" step="15" defaultValue="60" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="service">סוג השירות</Label>
        <Input id="service" required dir="rtl" />
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          ביטול
        </Button>
        <Button type="submit">
          קביעת פגישה
        </Button>
      </div>
    </form>
  );
};

export default NewAppointmentForm;