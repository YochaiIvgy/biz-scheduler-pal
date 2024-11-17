import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings2, Bell, Clock, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const QuickSettingsCard = () => {
  const { toast } = useToast();

  const handleSettingChange = (setting: string) => {
    toast({
      title: "הגדרה עודכנה",
      description: `ההגדרה ${setting} עודכנה בהצלחה`,
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50">
        <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          הגדרות מהירות
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-gray-500" />
            <Label htmlFor="notifications">התראות אוטומטיות</Label>
          </div>
          <Switch
            id="notifications"
            onCheckedChange={() => handleSettingChange('התראות אוטומטיות')}
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <Label htmlFor="breaks">הפסקות אוטומטיות</Label>
          </div>
          <Switch
            id="breaks"
            onCheckedChange={() => handleSettingChange('הפסקות אוטומטיות')}
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Label htmlFor="calendar-sync">סנכרון יומן</Label>
          </div>
          <Switch
            id="calendar-sync"
            onCheckedChange={() => handleSettingChange('סנכרון יומן')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickSettingsCard;