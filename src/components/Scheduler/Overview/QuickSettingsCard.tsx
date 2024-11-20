import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/components/ui/use-toast";
import {
  Settings2,
  Bell,
  Clock,
  Calendar,
  Power,
  XOctagon,
  BellOff,
  CheckSquare,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickSettingsCard = () => {
  const { toast } = useToast();
  const [sections, setSections] = useState({
    operatingHours: false,
    notifications: false,
    appointments: false,
    services: false,
    cancellation: false
  });

  const handleSettingChange = (setting: string) => {
    toast({
      title: "הגדרה עודכנה",
      description: `ההגדרה ${setting} עודכנה בהצלחה`,
    });
  };

  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
        {/* Operating Hours Section */}
        <Collapsible open={sections.operatingHours} onOpenChange={() => toggleSection('operatingHours')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-2 hover:bg-gray-100 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>שעות פעילות</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label>הפעל שעות פעילות אוטומטיות</Label>
              <Switch onCheckedChange={() => handleSettingChange('שעות פעילות אוטומטיות')} />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Notifications Section */}
        <Collapsible open={sections.notifications} onOpenChange={() => toggleSection('notifications')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-2 hover:bg-gray-100 rounded-lg">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-gray-500" />
                <span>העדפות התראות</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label>התראות אימייל</Label>
              <Switch onCheckedChange={() => handleSettingChange('התראות אימייל')} />
            </div>
            <div className="flex items-center justify-between">
              <Label>התראות SMS</Label>
              <Switch onCheckedChange={() => handleSettingChange('התראות SMS')} />
            </div>
            <div className="flex items-center justify-between">
              <Label>התראות באפליקציה</Label>
              <Switch onCheckedChange={() => handleSettingChange('התראות באפליקציה')} />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Auto-Approval Section */}
        <Collapsible open={sections.appointments} onOpenChange={() => toggleSection('appointments')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-2 hover:bg-gray-100 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-gray-500" />
                <span>אישור אוטומטי</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-2">
            <div className="flex items-center justify-between">
              <Label>הפעל אישור אוטומטי</Label>
              <Switch onCheckedChange={() => handleSettingChange('אישור אוטומטי')} />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Services Section */}
        <Collapsible open={sections.services} onOpenChange={() => toggleSection('services')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-2 hover:bg-gray-100 rounded-lg">
              <div className="flex items-center gap-2">
                <Power className="h-4 w-4 text-gray-500" />
                <span>הפעלת/כיבוי שירותים</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label>שירות תספורת</Label>
              <Switch onCheckedChange={() => handleSettingChange('שירות תספורת')} />
            </div>
            <div className="flex items-center justify-between">
              <Label>שירות צביעה</Label>
              <Switch onCheckedChange={() => handleSettingChange('שירות צביעה')} />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Cancellation Rules Section */}
        <Collapsible open={sections.cancellation} onOpenChange={() => toggleSection('cancellation')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-2 hover:bg-gray-100 rounded-lg">
              <div className="flex items-center gap-2">
                <XOctagon className="h-4 w-4 text-gray-500" />
                <span>מדיניות ביטולים</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label>אפשר ביטולים עד 24 שעות לפני</Label>
              <Switch onCheckedChange={() => handleSettingChange('מדיניות ביטולים 24 שעות')} />
            </div>
            <div className="flex items-center justify-between">
              <Label>חיוב דמי ביטול</Label>
              <Switch onCheckedChange={() => handleSettingChange('חיוב דמי ביטול')} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default QuickSettingsCard;