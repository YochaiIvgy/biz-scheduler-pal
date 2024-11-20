import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings2, Bell, Clock, Calendar, Shield, CheckCircle2, Ban } from "lucide-react";
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
            <Clock className="h-4 w-4 text-gray-500" />
            <Label htmlFor="operating-hours">שעות פעילות אוטומטיות</Label>
          </div>
          <Switch
            id="operating-hours"
            onCheckedChange={() => handleSettingChange('שעות פעילות אוטומטיות')}
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-gray-500" />
            <Label htmlFor="notifications">העדפות התראות</Label>
          </div>
          <Switch
            id="notifications"
            onCheckedChange={() => handleSettingChange('העדפות התראות')}
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-gray-500" />
            <Label htmlFor="auto-approval">אישור אוטומטי</Label>
          </div>
          <Switch
            id="auto-approval"
            onCheckedChange={() => handleSettingChange('אישור אוטומטי')}
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Label htmlFor="service-toggle">הפעלת/השבתת שירותים</Label>
          </div>
          <Switch
            id="service-toggle"
            onCheckedChange={() => handleSettingChange('הפעלת/השבתת שירותים')}
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-gray-500" />
            <Label htmlFor="cancellation">מדיניות ביטולים</Label>
          </div>
          <Switch
            id="cancellation"
            onCheckedChange={() => handleSettingChange('מדיניות ביטולים')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickSettingsCard;