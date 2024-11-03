import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Appointment } from '@/lib/types';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EditAppointmentFormProps {
  appointment: Appointment;
  onClose: () => void;
  onSave: (updatedAppointment: Appointment) => void;
}

const EditAppointmentForm = ({ appointment, onClose, onSave }: EditAppointmentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState(appointment);
  const [newService, setNewService] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "פגישה עודכנה",
      description: "הפגישה עודכנה בהצלחה",
    });
    onClose();
  };

  const addService = () => {
    if (newService.trim()) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const removeService = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addService();
    }
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
        <Label htmlFor="services">שירותים</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.services.map((service, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              {service}
              <button
                type="button"
                onClick={() => removeService(index)}
                className="hover:text-red-500 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input 
            id="services" 
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="הוסף שירות חדש"
            dir="rtl" 
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={addService}
          >
            הוסף
          </Button>
        </div>
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