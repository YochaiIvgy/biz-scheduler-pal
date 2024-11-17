import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import { DaySchedule } from '@/lib/types';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsSectionProps {
  days: DaySchedule[];
}

const AnalyticsSection = ({ days }: AnalyticsSectionProps) => {
  const calculateMetrics = () => {
    const totalAppointments = days.reduce((total, day) => total + day.appointments.length, 0);
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

  const chartData = days.map(day => ({
    date: day.date.toLocaleDateString('he-IL', { month: 'short', day: 'numeric' }),
    appointments: day.appointments.length
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-scheduler-text">נתונים ומגמות</h2>
      
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
  );
};

export default AnalyticsSection;