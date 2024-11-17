import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp } from "lucide-react";
import { DaySchedule } from '@/lib/types';

interface RevenueOverviewCardProps {
  days: DaySchedule[];
}

const RevenueOverviewCard = ({ days }: RevenueOverviewCardProps) => {
  // Mock revenue calculations
  const totalRevenue = days.reduce((total, day) => 
    total + day.appointments.length * 200, 0
  );

  const previousRevenue = totalRevenue * 0.8; // Mock previous period
  const growth = ((totalRevenue - previousRevenue) / previousRevenue) * 100;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50">
        <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          סקירת הכנסות
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">סה״כ הכנסות החודש</p>
            <h3 className="text-2xl font-bold">₪{totalRevenue.toLocaleString()}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-4 w-4 ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`text-sm ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth.toFixed(1)}% מהחודש הקודם
            </span>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ממוצע יומי</p>
                <p className="font-semibold">₪{(totalRevenue / days.length).toFixed(0)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">פגישות</p>
                <p className="font-semibold">{days.reduce((total, day) => total + day.appointments.length, 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueOverviewCard;