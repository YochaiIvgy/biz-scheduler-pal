import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, BellRing } from "lucide-react";
import { DaySchedule } from '@/lib/types';

interface NotificationsCardProps {
  days: DaySchedule[];
}

const NotificationsCard = ({ days }: NotificationsCardProps) => {
  const today = new Date();
  const notifications = days
    .flatMap(day => day.appointments
      .filter(apt => {
        const isToday = day.date.toDateString() === today.toDateString();
        return isToday && apt.status === 'pending';
      })
      .map(apt => ({
        type: 'new-booking',
        message: `פגישה חדשה עם ${apt.clientName} ב-${apt.time}`,
        time: new Date(),
      }))
    )
    .slice(0, 5);

  return (
    <Card className="border-0 shadow-sm bg-white/80">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50">
        <CardTitle className="text-xl font-medium text-gray-700 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          התראות
          {notifications.length > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 mr-2">
              {notifications.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">אין התראות חדשות</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
              >
                <BellRing className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm">{notification.message}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;