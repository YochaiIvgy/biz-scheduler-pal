import React from 'react';
import { DaySchedule } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Plus, User, Bookmark, TrendingUp, DollarSign } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import NewAppointmentForm from './NewAppointmentForm';
import PendingAppointments from './PendingAppointments';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CalendarOverviewProps {
  days: DaySchedule[];
}

const CalendarOverview = ({ days }: CalendarOverviewProps) => {
  const [open, setOpen] = React.useState(false);
  const [timeRange, setTimeRange] = React.useState<'day' | 'week' | 'month'>('week');

  const getAppointmentColor = (index: number) => {
    if (index === 0) return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
    if (index === 1) return 'bg-blue-100 hover:bg-blue-200 border-blue-300';
    return 'bg-blue-200 hover:bg-blue-300 border-blue-400';
  };

  const getTotalDuration = (day: DaySchedule) => {
    return day.appointments.reduce((total, apt) => total + apt.duration, 0);
  };

  // Analytics calculations
  const calculateMetrics = () => {
    const totalAppointments = days.reduce((total, day) => total + day.appointments.length, 0);
    // Assuming each appointment has a base price of 200 NIS
    const totalRevenue = days.reduce((total, day) => 
      total + day.appointments.length * 200, 0
    );
    
    return {
      totalAppointments,
      totalRevenue,
      averagePerDay: totalAppointments / days.length || 0
    };
  };

  const metrics = calculateMetrics();

  // Prepare data for the chart
  const chartData = days.map(day => ({
    date: day.date.toLocaleDateString('he-IL', { month: 'short', day: 'numeric' }),
    appointments: day.appointments.length
  }));

  return (
    <div className="space-y-6 p-6 bg-scheduler-gray rounded-lg animate-fade-in" dir="rtl">
      <PendingAppointments days={days} />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-scheduler-text">סקירת לוח זמנים</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 flex items-center gap-1 px-3 py-1">
            <Calendar className="w-4 h-4" />
            <span>{days.length} ימים</span>
          </Badge>
          <Badge variant="outline" className="bg-green-50 flex items-center gap-1 px-3 py-1">
            <User className="w-4 h-4" />
            <span>{days.reduce((total, day) => total + day.appointments.length, 0)} פגישות</span>
          </Badge>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-blue-500 border-blue-500 hover:bg-blue-50 font-normal px-6 py-1.5 h-8 rounded-full"
              >
                <Plus className="h-4 w-4" />
                <span>הוסף פגישה</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-right">פגישה חדשה</DrawerTitle>
              </DrawerHeader>
              <NewAppointmentForm date={new Date()} onClose={() => setOpen(false)} />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {days.map((day) => (
          <Card 
            key={day.date.toISOString()} 
            className="overflow-hidden transition-all duration-200 bg-white hover:bg-gray-50"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg text-scheduler-text">
                  {day.date.toLocaleDateString('he-IL', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                  {day.appointments.length} פגישות
                </Badge>
              </div>
              
              {day.appointments.length > 0 && (
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>סה״כ: {getTotalDuration(day)} דקות</span>
                </div>
              )}

              <div className="space-y-2">
                {day.appointments.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">אין פגישות מתוכננות</p>
                ) : (
                  day.appointments.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className={`p-3 rounded-md border transition-colors ${getAppointmentColor(index)}`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <div className="font-medium text-scheduler-text">{appointment.clientName}</div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-4 h-4" />
                          <span>{appointment.services[0]}</span>
                        </div>
                      </div>
                      <Badge className="mt-2" variant="outline">
                        {appointment.duration} דקות
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-bold text-scheduler-text">נתונים ומגמות</h2>
        
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">סה״כ פגישות</p>
                  <h3 className="text-2xl font-bold">{metrics.totalAppointments}</h3>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">הכנסות</p>
                  <h3 className="text-2xl font-bold">₪{metrics.totalRevenue}</h3>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ממוצע יומי</p>
                  <h3 className="text-2xl font-bold">{metrics.averagePerDay.toFixed(1)}</h3>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Trends Chart */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>מגמות הזמנות</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week" className="w-full">
              <TabsList>
                <TabsTrigger value="day">יום</TabsTrigger>
                <TabsTrigger value="week">שבוע</TabsTrigger>
                <TabsTrigger value="month">חודש</TabsTrigger>
              </TabsList>
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#3b82f6" name="פגישות" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarOverview;
