import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const UpcomingBreaksCard = () => {
  const { toast } = useToast();

  const handleAddBreak = () => {
    toast({
      title: "הוספת הפסקה",
      description: "תכונה זו תהיה זמינה בקרוב",
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
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddBreak}
            className="text-blue-500 hover:text-blue-600"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">הפסקת צהריים</span>
              <span className="text-sm text-gray-600">13:00 - 14:00</span>
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">הפסקת קפה</span>
              <span className="text-sm text-gray-600">16:00 - 16:15</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingBreaksCard;