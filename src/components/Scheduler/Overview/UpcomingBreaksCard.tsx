import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Break {
  id: string;
  title: string;
  time: string;
}

const UpcomingBreaksCard = () => {
  const { toast } = useToast();
  const [breaks, setBreaks] = useState<Break[]>([
    { id: '1', title: 'הפסקת צהריים', time: '13:00 - 14:00' },
    { id: '2', title: 'הפסקת קפה', time: '16:00 - 16:15' }
  ]);
  const [newBreak, setNewBreak] = useState({ title: '', startTime: '', endTime: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddBreak = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBreak.title || !newBreak.startTime || !newBreak.endTime) {
      toast({
        title: "שגיאה",
        description: "נא למלא את כל השדות",
        variant: "destructive",
      });
      return;
    }

    const timeString = `${newBreak.startTime} - ${newBreak.endTime}`;
    
    setBreaks([...breaks, {
      id: Date.now().toString(),
      title: newBreak.title,
      time: timeString
    }]);

    setNewBreak({ title: '', startTime: '', endTime: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "הפסקה נוספה בהצלחה",
      description: `${newBreak.title} נוספה ללוח הזמנים`,
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50">
        <CardTitle className="text-lg font-medium text-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            הפסקות מתוכננות
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:text-blue-600"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" dir="rtl">
              <DialogHeader>
                <DialogTitle>הוספת הפסקה חדשה</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddBreak} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">כותרת</Label>
                  <Input
                    id="title"
                    value={newBreak.title}
                    onChange={(e) => setNewBreak({ ...newBreak, title: e.target.value })}
                    placeholder="לדוגמה: הפסקת צהריים"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">שעת התחלה</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newBreak.startTime}
                      onChange={(e) => setNewBreak({ ...newBreak, startTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">שעת סיום</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newBreak.endTime}
                      onChange={(e) => setNewBreak({ ...newBreak, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">הוסף הפסקה</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {breaks.map((breakItem) => (
            <div key={breakItem.id} className="p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">{breakItem.title}</span>
                <span className="text-sm text-gray-600">{breakItem.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingBreaksCard;